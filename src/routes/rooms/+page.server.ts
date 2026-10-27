import { apiGet } from "#lib/server/api.ts";

type Room = {
    id: number
    name: string
    slug: string
    excerpt: string | null
    description: string | null
    pricePerNight: number
    isActive: boolean
  }

export const load = async () => {
  const rooms = await apiGet<Room[]>("/rooms");
  const activeRooms = rooms.filter((room) => room.isActive)
  return { rooms: activeRooms };
};