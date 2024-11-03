<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	interface Props extends HTMLAttributes<HTMLHeadingElement> {}
	let { children, ...rest }: Props = $props();
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
