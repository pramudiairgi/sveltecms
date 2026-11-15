import { error } from '@sveltejs/kit';
import { api } from '#lib/client/api.ts';
import type { PageServerLoad } from './$types';

type Package = {
  id: number
  title: string
  slug: string
  category: string | null
  pricePerPerson: number
  duration: string | null
  description: string | null
  isActive: boolean
  coverMediaId: number | null
  metaTitle: string | null
  metaDescription: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export const load: PageServerLoad = async ({ params }): Promise<{ pkg: Package }> => {
  const response = await api.packages.slug({ slug: params.slug }).get()
  const pkg = response.data as Package | null
  if (!pkg) error(404, 'Paket tidak ditemukan')
  return { pkg }

}

