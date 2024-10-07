<script lang="ts">
	import type { HTMLOlAttributes } from 'svelte/elements';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLOlAttributes {}
</script>

<ul {...$$props}><slot /></ul>

<style>
	ul {
		list-style-position: inside;
	}
</style>
