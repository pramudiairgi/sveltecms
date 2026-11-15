import { api } from "#lib/client/api.ts";

export const load = async () => {
  const { data: rooms } = await api.rooms.get();
  const activeRooms = rooms?.filter((room) => room.isActive) ?? [];
  return { rooms: activeRooms };
};