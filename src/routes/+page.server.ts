import { apiGet } from "#lib/server/api.ts";

export const load = async () => {
  const rooms = await apiGet<{ id: number }[]>("/rooms");
  return { count: rooms.length };
};
