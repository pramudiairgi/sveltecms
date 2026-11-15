import { error } from '@sveltejs/kit';
import { apiGet } from '#lib/server/api.ts';
import type { PageServerLoad } from './$types';

type Room = {
  id: number
  name: string
  slug: string
  excerpt: string | null
  description: string | null
  pricePerNight: number
  capacity: number
  isActive: boolean
  metaTitle: string | null
  metaDescription: string | null
  coverMediaId: number | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export const load: PageServerLoad = async ({ params }) => {
    try {
        const room = await apiGet<Room>(`/rooms/slug/${params.slug}`);
        return { room };
    } catch {
        error(404, 'Room not found');
    } 
}