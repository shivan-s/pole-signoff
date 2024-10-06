<script lang="ts">
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating, page } from '$app/stores';
	import type { SelectUser } from '$lib/server/db/schema';
	import { ROCK, POLE } from '$lib/characters';
	import Modal from './Modal.svelte';

	export let user: Pick<SelectUser, 'stagehandle' | 'isAdmin'>;
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
	<span class="handle">
		{#if user}
			<button popovertarget="user" popovertargetaction="show">@{user.stagehandle}</button>
		{/if}
	</span>
</nav>
<Modal id="user">
	<span slot="header">@{user.stagehandle}</span>
	<span slot="body">
		<ul>
			<li>
				<form class="logout" method="POST" action="?/logout">
					<button>Logout</button>
				</form>
			</li>
		</ul>
	</span>
</Modal>

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

	a,
	button {
		display: flex;
		align-items: center;
		border: 0;
		background: transparent;
		font-weight: 400;
		padding: 0rem 2rem;
		color: var(--primary);
		text-decoration: none;
		text-align: center;
	}

	a:hover,
	a.current,
	button:hover {
		background: var(--primary);
		color: var(--bg);
	}

	button:active,
	a:active {
		text-decoration: underline;
	}
</style>
