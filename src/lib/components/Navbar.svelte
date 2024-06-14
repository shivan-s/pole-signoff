<script lang="ts">
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating, page } from '$app/stores';

	export let userLevels: { level: number }[] = $page.data['userLevels'];

	const urls: { url: string; name: string }[] = userLevels.map((u) => ({
		url: `/me/${u.level}`,
		name: `Level ${u.level}`
	}));
</script>

{#if $loading || $navigating}
	<Progress />
{/if}
<nav>
	<a href=".">Pole Signoff</a>
	<a href="/admin">Admin</a>
	{#each urls as { url, name }}
		<a class:current={url === $page.url.pathname} href={url}>{name}</a>
	{/each}
</nav>

<style>
	nav {
		justify-content: start;
		display: flex;
		border-bottom: 3px solid var(--primary);
		backdrop-filter: blur(10px);
		overflow-x: auto;
		height: 100%;
	}

	nav > * {
		display: flex;
		align-items: center;
		padding: 0 2rem 0 2rem;
	}

	a {
		font-weight: 400;
		color: var(--primary);
		text-decoration: none;
		text-align: center;
	}

	a:hover,
	.current {
		background: var(--primary);
		color: var(--bg);
	}

	a:active {
		text-decoration: underline;
	}
</style>
