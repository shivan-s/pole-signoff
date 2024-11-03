<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import { page } from '$app/stores';
	import H2 from '$lib/components/H2.svelte';
</script>

<H1>Oops... something went wrong!</H1>
{#if $page.error}
	<H2>{$page.status}</H2>
	<p>{$page.error.message}</p>
{/if}
