<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	export let title = '';
</script>

<article in:fade={{ easing: cubicInOut }}>
	<span class="heading">{title}</span>
	<span class="body"><slot /></span>
</article>

<style>
	article {
		min-width: 320px;
		padding: 2rem 3rem 2rem 3rem;
		border: 2px var(--primary) solid;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.heading {
		font-weight: 700;
		font-size: 2rem;
		color: var(--primary);
	}

	span {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
	}
</style>
