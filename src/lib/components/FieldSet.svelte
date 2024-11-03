<script lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	interface Props extends HTMLFieldsetAttributes {}
	let { children, ...rest }: Props = $props();
</script>

<fieldset {...rest}>
	{@render children?.()}
</fieldset>

<style>
	fieldset {
		border: none;
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
	}
</style>
