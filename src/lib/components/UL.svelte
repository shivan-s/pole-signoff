<script lang="ts">
	import type { HTMLOlAttributes } from 'svelte/elements';
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { ...props }: Props = $props();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLOlAttributes {}
</script>

<ul {...props}>{@render props.children?.()}</ul>

<style>
	ul {
		list-style-position: inside;
	}
</style>
