<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	interface Props extends HTMLAttributes<HTMLHeadingElement> {}
	let { children, ...rest }: Props = $props();
</script>

<h2 {...rest}>{@render children?.()}</h2>

<style>
	h2 {
		font-weight: 500;
		font-size: 2rem;
		padding: 0.5rem 0rem 0.5rem 0rem;
		color: var(--text);
	}
</style>
