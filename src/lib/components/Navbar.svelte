<script lang="ts">
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating, page } from '$app/stores';
	import type { SelectUser } from '$lib/server/db/schema';
	import { ROCK, POLE } from '$lib/characters';
	import Button from '$lib/components/Button.svelte';

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
			<form class="logout" method="POST" action="/?logout">
				<button>Logout</button>
			</form>
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

	nav > span > a,
	nav > span > form {
		display: flex;
		align-items: center;
		padding: 0 2rem 0 2rem;
	}

	a,
	button {
		font-weight: 400;
		color: var(--primary);
		text-decoration: none;
		text-align: center;
	}

	a:hover,
	.current,
	form:hover {
		background: var(--primary);
		color: var(--bg);
	}

	form.logout:hover {
		background: var(--danger);
		color: var(--bg);
	}
	form.logout > button {
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		color: inherit;
	}

	a:active {
		text-decoration: underline;
	}
</style>
