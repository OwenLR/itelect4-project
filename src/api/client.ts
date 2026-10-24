import type {
  ApiItem,
  ApiClaim,
  NewClaim,
  AuthReply,
  ApiUser,
  AiReview,
} from "../types/index";
import useAuthStore from "../store/authStore";

// Vite replaces this at BUILD time, so the value in .env when
// `npm run build` ran is what gets baked into the bundle.
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, " +
      "and restart npm run dev.",
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  // getState(), not the hook -- this is not a component.
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // No token means no header at all, which the public routes want.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  return res.json();
}

// ---- items: public. request() sends no token, and none is needed.

export function fetchItems(): Promise<ApiItem[]> {
  return request<ApiItem[]>("/api/items");
}

// Item's id IS the real id, so this is the direct route -- no array to
// unwrap. A bad id answers 404 and request() throws the API's sentence.
export function fetchItemById(id: string): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${id}`);
}

// ---- claims: private. The token goes on automatically.

export function fetchClaims(): Promise<ApiClaim[]> {
  return request<ApiClaim[]>("/api/claims");
}

export function createClaim(newClaim: NewClaim): Promise<ApiClaim> {
  return request<ApiClaim>("/api/claims", {
    method: "POST",
    body: JSON.stringify(newClaim),
  });
}

// ---- auth: the two routes that make a session exist

export function registerUser(body: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ===== SESSION 11: one more private call ===============================
// ---- ai: private, like claims. The token goes on automatically, which
// matters more here than anywhere: without it, anyone could spend your
// Gemini quota.

export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}