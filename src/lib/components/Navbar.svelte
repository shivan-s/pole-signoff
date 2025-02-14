<script lang="ts">
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating, page } from '$app/stores';
	import type { SelectUser } from '$lib/server/db/schema';
	import { ACADEMY, POLE } from '$lib/characters';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import urls from '$lib/urls';

	interface Props {
		user?: Pick<SelectUser, 'stagehandle' | 'isAdmin'> | null;
	}

	let { user = null }: Props = $props();

	const handleClick = () => {
		const popover = document.getElementById('user')!;
		popover.hidePopover();
	};
</script>

{#if $loading || $navigating}
	<Progress />
{/if}
<nav>
	<span>
		<a href="/" title="Pole Academy">{POLE}{ACADEMY} Pole Academy</a>
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
	{#snippet header()}
		<span>@{user?.stagehandle}</span>
	{/snippet}
	<ul>
		<li>
			<a onclick={handleClick} href={urls.settings}>Settings</a>
		</li>
		<li>
			<a onclick={handleClick} href={urls.invite}>Invite Friends</a>
		</li>
		<li>
			<form
				method="POST"
				action="?/logout"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						handleClick();
					};
				}}
			>
				<button class="logout">Logout</button>
			</form>
		</li>
	</ul>
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
		cursor: pointer;
		width: 100%;
		display: flex;
		align-items: center;
		border: 0;
		background: transparent;
		padding: 0rem 2rem;
		color: var(--primary);
		font-size: var(--text-normal);
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

	ul {
		display: flex;
		flex-direction: column;
	}

	ul li {
		list-style-type: none;
	}

	ul li:not(:first-child) {
		border-top: 1px var(--primary) dotted;
	}

	ul li:not(:first-child):hover {
		border-top-style: solid;
	}

	ul li a,
	ul li button {
		display: flex;
		align-items: center;
		padding: 1rem 1rem;
	}
	button.logout {
		color: var(--danger);
	}

	button.logout:hover {
		color: var(--bg);
		background-color: var(--danger);
	}
</style>
