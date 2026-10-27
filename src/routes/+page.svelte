<script lang="ts">
  import type { PageProps } from './$types'
  let { data }: PageProps = $props()
</script>

<p>Jumlah kamar: {data.count}</p>