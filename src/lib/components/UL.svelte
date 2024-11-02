<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	interface Props extends HTMLAttributes<HTMLUListElement> {}

	let { children, ...rest }: Props = $props();
</script>

<ul {...rest}>{@render children?.()}</ul>

<style>
	ul {
		list-style-position: inside;
	}
</style>
