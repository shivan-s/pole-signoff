<script>
	import Progress from './Progress.svelte';
	import { loading } from '$lib/stores';
	import { navigating } from '$app/stores';
</script>

{#if $loading || $navigating}
	<Progress />
{/if}
<nav>
	<a href="/">Pole Signoff</a>
</nav>

<style>
	nav {
		justify-content: start;
		display: flex;
		border-bottom: 3px solid var(--primary);
		backdrop-filter: blur(10px);
	}

	nav > * {
		display: flex;
		align-items: center;
		padding: 0 2rem 0 2rem;
		min-height: 4rem;
	}

	a {
		color: var(--text);
		text-decoration: none;
	}

	a:hover {
		background: var(--primary);
	}
</style>
