<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import Container from '$lib/components/Container.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Toasts from '$lib/components/Toasts.svelte';

	export let data: LayoutData;
	$: pageTitle = $page.data['pageTitle'];
</script>

{#if pageTitle}
	<title>{pageTitle} | Pole Signoff</title>
{:else}
	<title>Pole Signoff</title>
{/if}
<body class="wrapper">
	<header><Navbar user={data.user} /></header>
	{#key data.routeURL}
		<Container>
			{#if pageTitle}
				<header><H1 style="text-align: center">{pageTitle}</H1></header>
			{/if}
			<slot />
		</Container>
	{/key}
	<footer><Footer /></footer>
</body>
<Toasts />

<style>
	:root {
		/* Font */
		--text-large: 2rem;
		--text-normal: 1rem;
		--text-small: 0.875rem;
		/* Width */
		--width-largest: 1200px;
		--width-large: 922px;
		--width-medium: 768px;
		--width-small: 600px;
		--width-smallest: 480px;
		--width-tiny: 320px;
		/* Padding */
		--padding-tight: 0.5rem;
		--padding-normal: 1rem;
		--padding-loose: 2rem;
		/* Gap */
		--gap-tight: 0.125rem;
		--gap-normal: 0.25rem;
		--gap-loose: 1rem;
		--gap-xloose: 2rem;
		/* Colors */
		--primary: hsla(300, 100%, 50%, 1);
		--secondary: hsla(300, 100%, 50%, 1);
		--grey: hsla(0, 0%, 50%, 1);
		--gray: var(--grey);
		--bg: hsla(300, 100%, 95%, 1);
		--text: hsla(300, 10%, 20%, 1);
		--accent: hsla(35, 100%, 50%, 1);
		--success: hsla(112, 90%, 60%, 1);
		--danger: hsla(0, 90%, 60%, 1);
		--warning: hsla(45, 90%, 60%, 1);
	}

	:global(.flex-row) {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--gap-normal);
		flex-wrap: nowrap;
	}

	:global(.flex-col) {
		display: flex;
		width: 100%;
		justify-content: center;
		flex-direction: column;
		gap: var(--gap-normal);
	}

	:global(*) {
		padding: 0;
		margin: 0;
		line-height: 1.5;
		box-sizing: border-box;
		transition: all 0.2s ease-in-out 0s;
		font-family: 'Nunito', sans-serif;
	}

	:global(p, a, h1, h2, h3, h4, h5, h6) {
		color: var(--text);
		text-decoration: none;
	}

	:global(strong) {
		color: var(--secondary);
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	.wrapper {
		position: relative;
		display: grid;
		min-height: 100dvh;
		background: var(--bg);
		grid-template-areas:
			'header'
			'main'
			'footer';
		grid-template-rows: 4rem 1fr 4rem;
		grid-template-columns: 100%;
		gap: 0;
	}

	body > header {
		grid-area: header;
		position: sticky;
		top: 0px;
		z-index: 1;
	}

	footer {
		grid-area: footer;
	}
</style>
