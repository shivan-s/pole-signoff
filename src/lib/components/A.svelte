<!--@component
	HTML Anchor Tag
-->
<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLAnchorAttributes {
		href: HTMLAnchorAttributes['href'];
	}
	export let href: HTMLAnchorAttributes['href'];
</script>

<a {href} {...$$restProps}><slot /></a>

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
