import { api } from "#lib/client/api.ts"

export const load = async () => {
    const { data: packages } = await api.packages.get();
    const activePackages = packages?.filter((pkg) => pkg.isActive) ?? [];
    return { packages: activePackages };
};