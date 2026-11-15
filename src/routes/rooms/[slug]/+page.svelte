<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>{data.room.name} — Villa CMS</title>
    {#if data.room.metaDescription}
        <meta name="description" content={data.room.metaDescription} />
    {/if}
</svelte:head>

<h1 class="mb-6 text-3xl font-bold">{data.room.name}</h1>

{#if data.room.description}
    <p class="text-gray-600">{data.room.description}</p>
{:else}
    <p class="text-gray-600">Deskripsi belum tersedia.</p>
{/if}
<div class="mt-4 space-y-2 text-gray-600">
    <p>
        Harga: {Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(data.room.pricePerNight)} /malam
    </p>
    {#if data.room.capacity}
        <p>Kapasitas: {data.room.capacity} orang</p>
    {/if}
</div>
<p class="text-gray-600 mt-4">
    <a href="/rooms" class="text-blue-600 hover:underline"
        >kembali ke daftar kamar</a
    >
</p>
