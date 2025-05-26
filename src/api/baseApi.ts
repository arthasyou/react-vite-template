import httpClient from "@/utils/httpClient";
import { showGlobalError } from "@/components/GlobalErrorHandler";
import i18n from "@/i18n";

interface RequestParams<T = Record<string, unknown>> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: T;
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

export async function request<T = unknown, R = unknown>({
  method,
  url,
  body,
}: RequestParams<T>): Promise<R> {
  let finalUrl = url;

  if (
    ["GET", "DELETE"].includes(method) &&
    body &&
    typeof body === "object" &&
    !Array.isArray(body)
  ) {
    const queryParams = new URLSearchParams(
      body as Record<string, string>
    ).toString();
    finalUrl = `${url}?${queryParams}`;
  }

  try {
    const response = await httpClient.request<SuccessResponse<R>>({
      method,
      url: finalUrl,
      data: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
    });

    return response.data.data; // ✅ 直接返回 data 字段
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (err: any) {
    const error = err?.response?.data as ErrorResponse;

    const message = getTranslatedError(error);

    showGlobalError(message);
    throw new Error(message);
  }
}

function getTranslatedError(error: ErrorResponse): string {
  const key = error.code.toString();
  return i18n.exists(key, { ns: "error" })
    ? i18n.t(key, { ns: "error" })
    : error.message || i18n.t("default", { ns: "error" });
}
