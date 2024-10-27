<!--@component
	HTML Anchor Tag
-->
<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	interface Props extends HTMLAnchorAttributes {
		href: HTMLAnchorAttributes['href'];
		children?: import('svelte').Snippet;
	}

	let { href, children, ...rest }: Props = $props();
</script>

<a {href} {...rest}>{@render children?.()}</a>

<style>
	a {
		color: var(--primary);
		text-decoration: underline;
	}

	a:hover {
		color: var(--accent);
		text-decoration: none;
	}

	a:active {
		text-decoration: underline;
	}
</style>
