const BASE_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 10000;

interface FetchOptions extends RequestInit {
  data?: unknown;
  timeout?: number;
  url: string;
  method: string;
}

class HttpError extends Error {
  response: { data: unknown; status: number };
  constructor(message: string, response: { data: unknown; status: number }) {
    super(message);
    this.name = "HttpError";
    this.response = response;
  }
}

const httpClient = {
  /**
   * nomrl JSON 请求
   */
  async request<T>({
    url,
    method,
    data,
    timeout = DEFAULT_TIMEOUT,
  }: FetchOptions): Promise<{ data: T }> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(BASE_URL + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timer);

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new HttpError("HTTP error", {
          data: json,
          status: res.status,
        });
      }

      return { data: json };
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  },

  /**
   * stream request（for LLM）
   */
  async stream(
    url: string,
    data: Record<string, unknown>,
    onChunk: (chunk: string) => void,
    onDone?: () => void,
    onError?: (err: Error) => void
  ) {
    const processBuffer = (
      buffer: string,
      onChunk: (chunk: string) => void,
      onDone?: () => void
    ): boolean => {
      const lines = buffer.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed?.startsWith("data:")) continue;

        const content = trimmed.replace(/^data:\s*/, "");
        if (content === "[DONE]") {
          onDone?.();
          return true;
        }

        try {
          const parsed = JSON.parse(content);
          onChunk(parsed.text ?? content);
        } catch {
          onChunk(content);
        }
      }
      return false;
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(BASE_URL + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok || !res.body) {
        const msg = `SSE 连接失败: ${res.status}`;
        onError?.(new Error(msg));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        if (processBuffer(buffer, onChunk, onDone)) {
          return;
        }

        buffer = "";
      }

      onDone?.();
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error("connection error"));
    }
  },
};

export default httpClient;
