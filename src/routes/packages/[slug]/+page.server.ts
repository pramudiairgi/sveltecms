import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { apiGet } from '#lib/server/api.ts';

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

export const load: PageServerLoad = async ({ params }) => {
    try {
        const pkg = await apiGet<Package>(`/packages/slug/${params.slug}`);
        return { pkg };
    } catch {
        error(404, 'Package not found');
    } 
}