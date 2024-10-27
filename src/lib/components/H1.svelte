<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let { children, ...rest } = $props();
</script>

<h1 {...rest}>{@render children?.()}</h1>

<style>
	h1 {
		font-weight: 700;
		font-size: 3rem;
		padding: 1rem 0rem 2rem 0rem;
		color: var(--primary);
	}
</style>
