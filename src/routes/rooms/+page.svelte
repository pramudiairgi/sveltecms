<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const rupiah = (n: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(n)
</script>

<svelte:head>
  <title>Kamar — Villa CMS</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-10">
  <h1 class="mb-6 text-3xl font-bold">Kamar</h1>

  {#if data.rooms.length === 0}
    <p class="text-gray-600">Belum ada kamar yang tersedia saat ini.</p>
  {:else}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each data.rooms as room (room.id)}
        <article class="rounded-lg border border-gray-200 p-5 shadow-sm">
          <h2 class="text-xl font-semibold">{room.name}</h2>

          <p class="mt-2 text-sm text-gray-600">
            {room.excerpt ?? room.description ?? 'Deskripsi belum tersedia.'}
          </p>

          <p class="mt-4 font-medium">{rupiah(room.pricePerNight)} / malam</p>

          <a class="mt-4 inline-block text-blue-600 hover:underline" href="/rooms/{room.slug}">
            Lihat detail
          </a>
        </article>
      {/each}
    </div>
  {/if}
</div>