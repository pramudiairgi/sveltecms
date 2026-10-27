import { API_BASE_URL } from "$app/env/private";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`);
  }

  return res.json() as T;
}
