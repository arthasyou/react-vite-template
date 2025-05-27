import httpClient from "@/utils/httpClient";
import { showGlobalError } from "@/components/GlobalErrorHandler";
import i18n from "@/i18n";
import type { UrlGroup } from "@/utils/url";

interface RequestParams<T = Record<string, unknown>> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: T;
  group?: UrlGroup;
}

interface SuccessResponse<T> {
  code: 0;
  data: T;
  message: string;
}

interface ErrorResponse {
  code: number;
  message: string;
}

/**
 * Standard JSON request
 */
export async function request<T = unknown, R = unknown>({
  method,
  url,
  body,
  group = "api",
}: RequestParams<T>): Promise<R> {
  let finalUrl = url;

  if (
    ["GET", "DELETE"].includes(method) &&
    body &&
    typeof body === "object" &&
    !Array.isArray(body)
  ) {
    const queryParams = new URLSearchParams(
      Object.entries(body).reduce((acc, [k, v]) => {
        if (v != null) acc[k] = String(v);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    finalUrl = `${url}?${queryParams}`;
  }

  try {
    const response = await httpClient.request<SuccessResponse<R>>({
      method,
      url: finalUrl,
      data: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
      group,
    });

    return response.data.data;
  } catch (err: unknown) {
    const error = (err as { response?: { data?: ErrorResponse } })?.response
      ?.data as ErrorResponse;
    const message = getTranslatedError(error);
    showGlobalError(message);
    throw new Error(message);
  }
}

/**
 * Streaming request: for LLM inference, SSE, etc.
 */
export function streamRequest<
  T extends Record<string, unknown> = Record<string, unknown>
>({
  url,
  body,
  onChunk,
  onDone,
  onError,
}: {
  url: string;
  body: T;
  onChunk: (text: string) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
}) {
  httpClient.stream(url, body, onChunk, onDone, (err) => {
    showGlobalError(err.message);
    onError?.(err);
  });
}

function getTranslatedError(error: ErrorResponse): string {
  const key = error.code.toString();
  return i18n.exists(key, { ns: "error" })
    ? i18n.t(key, { ns: "error" })
    : error.message || i18n.t("default", { ns: "error" });
}
