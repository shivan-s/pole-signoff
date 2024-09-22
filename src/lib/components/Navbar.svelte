<script lang="ts">
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating, page } from '$app/stores';
	import type { SelectUser } from '$lib/server/db/schema';

	const ROCK = '🪨';
	const POLE = '💈';

	export let user: Pick<SelectUser, 'username' | 'isAdmin'>;
</script>

{#if $loading || $navigating}
	<Progress />
{/if}
<nav>
	<span>
		<a href="/" title="Pole Rocks">{POLE} {ROCK}{ROCK} Pole Rocks</a>
		{#if user?.isAdmin}
			<a class:current={$page.url.pathname.startsWith('/admin')} href="/admin">Admin</a>
		{/if}
	</span>
	<span>
		{#if user}
			<a class:current={$page.url.pathname.startsWith('/settings')} href="/settings"
				>{user.username}</a
			>
		{/if}
	</span>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 3px solid var(--primary);
		backdrop-filter: blur(10px);
		overflow-x: auto;
		height: 100%;
	}

	nav > span {
		display: flex;
	}

	nav > span > a {
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
