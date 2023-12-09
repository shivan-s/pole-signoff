<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { cubicInOut } from 'svelte/easing';
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

{#if $page.data['pageTitle']}
	<title>{$page.data['pageTitle']} - Pole Signoff</title>
{:else}
	<title>Pole Signoff</title>
{/if}
<header><Navbar /></header>
{#key data.routeURL}
	<main in:fade={{ easing: cubicInOut }}>
		<slot />
	</main>
{/key}
<footer><Footer /></footer>

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

	:global(body) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100vh;
		background: var(--bg);
	}

	main {
		display: flex;
		margin-right: auto;
		margin-left: auto;
		flex-direction: column;
		gap: 1rem;
		padding: 4rem 0rem;
		flex-grow: 1;
		z-index: 0;
	}

	/* Extra small devices (phones, 600px and down) */
	@media only screen and (max-width: 600px) {
		main {
			min-width: 320px;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (min-width: 600px) {
		main {
			min-width: 480px;
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		main {
			min-width: 600px;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		main {
			min-width: 768px;
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Extra large devices (large laptops and desktops, 1200px and up) */
	@media only screen and (min-width: 1200px) {
		main {
			min-width: 922px;
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}

	header {
		position: sticky;
		top: 0px;
		z-index: 1;
	}
</style>
