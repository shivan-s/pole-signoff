<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	interface Props extends HTMLLabelAttributes {}
	let { children, ...rest }: Props = $props();
</script>

<label {...rest}>
	{@render children?.()}
</label>

<style>
	label {
		display: grid;
		color: var(--grey);
		align-items: center;
		grid-template-rows: 1fr;
		gap: 0.5rem;
	}
</style>
