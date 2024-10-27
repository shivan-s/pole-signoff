<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let { children, ...rest } = $props();
</script>

<formset {...rest}>
	{@render children?.()}
</formset>

<style>
	formset {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
	}
</style>
