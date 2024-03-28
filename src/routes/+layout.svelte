<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import Container from '$lib/components/Container.svelte';
	import H2 from '$lib/components/H2.svelte';

	export let data: LayoutData;
</script>

{#if $page.data['pageTitle']}
	<title>{$page.data['pageTitle']} - Pole Signoff</title>
{:else}
	<title>Pole Signoff</title>
{/if}

<div class="wrapper">
	<header><Navbar /></header>
	{#key data.routeURL}
		<Container>
			<slot />
		</Container>
	{/key}
	<footer><Footer /></footer>
</div>

<style>
	:root {
		--primary: #ff00ff;
		--bg: #ffe6ff;
		--text: #332933;
		--accent: #ff9500;
	}

	:global(*) {
		padding: 0;
		margin: 0;
		line-height: 1;
		box-sizing: border-box;
		transition: all 0.2s ease-in-out 0s;
		font-family: 'Nunito', sans-serif;
	}

	:global(p, a, h1, h2, h3, h4, h5, h6) {
		color: var(--text);
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.wrapper {
		display: grid;
		min-height: 100dvh;
		background: var(--bg);
		grid-template-areas:
			'header'
			'main'
			'footer';
		grid-template-rows: 4rem 1fr 4rem;
		grid-template-columns: 100vw;
		gap: 0;
	}

	header {
		grid-area: header;
		position: sticky;
		top: 0px;
		z-index: 1;
	}

	footer {
		grid-area: footer;
	}
</style>
