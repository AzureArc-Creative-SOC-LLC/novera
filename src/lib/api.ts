// Client for the Central Order Management microservice.
// Docs: API_DOCUMENTATION (3).md. Base URL is configurable via NEXT_PUBLIC_API_URL.

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://www.microservices.tech";

const TOKEN_KEY = "novera-token";
const USER_KEY = "novera-user";

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  date_of_birth?: string;
  nationality?: string;
  country_of_residence?: string;
  role: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token: string, user: ApiUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("novera-auth-change"));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("novera-auth-change"));
}

export function getCurrentUser(): ApiUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as ApiUser) : null;
  } catch {
    return null;
  }
}

type ApiInit = Omit<RequestInit, "body" | "headers"> & {
  json?: unknown;
  body?: BodyInit | null;
  headers?: Record<string, string>;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// Errors from this API come in several shapes; pull the first useful string.
function extractError(data: unknown, fallback: string): string {
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const k of ["error", "message"] as const) {
      const v = d[k];
      if (typeof v === "string" && v) return v;
    }
  }
  return fallback;
}

export async function api<T = unknown>(
  path: string,
  init: ApiInit = {}
): Promise<T> {
  const { json, auth, headers = {}, body, ...rest } = init;

  const finalHeaders: Record<string, string> = { ...headers };
  let finalBody: BodyInit | null | undefined = body;

  if (json !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(json);
  }

  if (auth) {
    const token = getToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url, { ...rest, headers: finalHeaders, body: finalBody });
  } catch (e) {
    throw new ApiError(
      e instanceof Error ? e.message : "Network error",
      0,
      null
    );
  }

  let data: unknown = null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await res.text();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      extractError(data, `Request failed (${res.status})`),
      res.status,
      data
    );
  }

  return data as T;
}
