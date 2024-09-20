<!--@component
	HTML Anchor Tag
-->
<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	export let href: HTMLAnchorAttributes['href'];
	interface $$Props extends HTMLAnchorAttributes {
		href: HTMLAnchorAttributes['href'];
	}
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
