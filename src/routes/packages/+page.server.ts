import { apiGet } from "#lib/server/api.ts"


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
}

export const load = async () => {
    const packages = await apiGet<Package[]>("/packages");
    const activePackages = packages.filter((pkg) => pkg.isActive);
    return { packages: activePackages };
};