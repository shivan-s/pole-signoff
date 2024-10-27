<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let { children, ...rest } = $props();
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
