<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.pkg.title} — Villa CMS</title>
    {#if data.pkg.metaDescription}
        <meta name="description" content={data.pkg.metaDescription} />
    {/if}
</svelte:head>

<h1 class="mb-6 text-3xl font-bold">{data.pkg.title}</h1>

{#if data.pkg.category}
    <p class="text-gray-600">{data.pkg.category}</p>
{/if}
<div class="mt-4 space-y-2 text-gray-600">
    <p>
        Harga: {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(data.pkg.pricePerPerson)}
    </p>
    {#if data.pkg.description}
        <p>{data.pkg.description}</p>
    {:else}
        <p>Deskripsi belum tersedia.</p>
    {/if}
</div>
<p class="text-gray-600 mt-4">
    <a href="/packages" class="text-blue-600 hover:underline"
        >kembali ke daftar paket</a
    >
</p>
