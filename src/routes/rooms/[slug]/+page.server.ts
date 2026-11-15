import { error } from '@sveltejs/kit'
import { api } from '#lib/client/api.ts'
import type { PageServerLoad } from './$types'

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

export const load: PageServerLoad = async ({ params }): Promise<{ room: Room }> => {
  const response = await api.rooms.slug({ slug: params.slug }).get()
  const room = response.data as Room | null
  if (!room) error(404, 'Kamar tidak ditemukan')
  return { room }
}