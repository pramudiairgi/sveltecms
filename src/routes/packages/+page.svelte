<script lang="ts">
    import type { PageProps } from './$types'
    let { data }: PageProps = $props()
</script>

<svelte:head>
    <title>Paket — Villa CMS</title>
</svelte:head>

<h1>Paket Kami</h1>

{#if data.packages.length === 0}
  <p>Belum ada paket tersedia.</p>
{:else}
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each data.packages as p (p.id)}
      <div class="border rounded-lg p-4 shadow-sm">
        <h2 class="text-xl font-bold mb-2">{p.title}</h2>
        <p class="text-gray-600 mb-2">
          {p.category ?? 'Tidak ada kategori'}
        </p>
        <p class="text-gray-600 mb-2">
          {p.description ?? 'Tidak ada deskripsi.'}
        </p>
        <p class="font-semibold mb-2">
          {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p.pricePerPerson)}
          /orang
        </p>
        <a href="/paket/{p.slug}" class="text-blue-600 hover:underline">
          Lihat detail →
        </a>
      </div>
    {/each}
  </div>
{/if}