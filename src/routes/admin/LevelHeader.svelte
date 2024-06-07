<script lang="ts">
	import H2 from '$lib/components/H2.svelte';
	export let level: { level: number; ids: number[] };
	$: moves = level.ids.length;
</script>

<div>
	<H2>Level {level.level}</H2>
	{#if moves > 1}
		<p>{moves} moves</p>
	{:else}
		<p>{moves} move</p>
	{/if}
</div>

<style>
	div {
		display: flex;
		width: 100%;
		align-items: end;
		justify-content: space-between;
		border-bottom: 2px solid var(--primary);
	}
	p {
		color: var(--grey);
		padding-bottom: 0.5rem;
	}
</style>
