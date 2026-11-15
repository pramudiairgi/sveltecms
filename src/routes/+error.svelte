<script lang="ts">
    let { error } = $props();
</script>

<svelte:head>
    <title>Error — Villa CMS</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-8">
    <div class="text-center max-w-md">
        <h1 class="text-6xl font-bold text-gray-900">Error</h1>
        <p class="mt-4 text-xl text-gray-600">
            {error?.message ?? "Terjadi kesalahan"}
        </p>
        <a href="/" class="mt-8 inline-block text-blue-600 hover:underline">
            ← Kembali ke beranda
        </a>
    </div>
</div>
