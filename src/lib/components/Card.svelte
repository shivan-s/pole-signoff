<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<article in:fade={{ easing: cubicInOut }} {...$$restProps}>
	{#if $$slots['header']}
		<header><slot name="header"></slot></header>
	{/if}
	<div><slot /></div>
</article>

<style>
	article {
		border: 2px var(--primary) solid;
		width: 100%;
		max-width: 75ch;
		display: flex;
		flex-direction: column;
		box-shadow: var(--text) 0.5rem 0.5rem;
	}

	header {
		display: flex;
		align-items: center;
		font-weight: 700;
		text-align: center;
		font-size: 1.5rem;
		color: var(--bg);
		background-color: var(--primary);
		padding: 0.5rem 1rem;
	}
	div {
		width: 100%;
		display: flex;
		background-color: var(--bg);
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem 1.5rem;
	}
</style>
