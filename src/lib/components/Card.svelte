<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<article in:fade={{ easing: cubicInOut }} {...$$restProps}>
	<header><slot name="header"><span>Missing Header</span></slot></header>
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
		justify-content: space-between;
		font-weight: 700;
		text-align: center;
		font-size: 2rem;
		color: var(--bg);
		background-color: var(--primary);
		padding: 2rem 3rem 2rem 3rem;
	}
	div {
		width: 100%;
		display: flex;
		background-color: var(--bg);
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 3rem 2rem 3rem;
	}
</style>
