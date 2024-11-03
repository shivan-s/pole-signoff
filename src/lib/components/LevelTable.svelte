<script lang="ts">
	import { enhance } from '$app/forms';
	import { loading } from '$lib/stores';
	import { dateStamp, fromNow } from '$lib/utils';
	import Button from '$lib/components/Button.svelte';

	interface Props {
		moves: {
			id: number;
			name: string;
			description: string | null;
			achievedAt: Date | null;
		}[];
	}

	let { moves }: Props = $props();
</script>

<div class="wrapper">
	<span class="header">Move</span>
	<span class="header" style="text-align: center">Signed</span>
	{#each moves as move}
		<span class="data" style="justify-self: start">{move.name}</span>
		<span class="data">
			{#if move.achievedAt}
				<p title={fromNow(move.achievedAt)}>{dateStamp(move.achievedAt)}</p>
			{:else}
				<form
					id="signOff"
					method="POST"
					action="?/signoff"
					use:enhance={() => {
						loading.set(true);
						return async ({ update }) => {
							await update();
							loading.set(false);
						};
					}}
				>
					<input name="id" type="hidden" value={move.id} />
				</form>
				<Button form="signOff" type="submit">Sign off</Button>
			{/if}
		</span>
	{/each}
</div>

<style>
	.wrapper {
		max-width: 1280px;
		width: 100%;
		display: grid;
		border: 2px var(--primary) solid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		box-shadow: var(--text) 0.5rem 0.5rem;
	}
	.header {
		font-size: 1.25rem;
		text-align: left;
		padding: 2rem 0.5rem 2rem 0.5rem;
		color: var(--bg);
		background-color: var(--primary);
	}
	.data {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 0.75rem 1rem 0.75rem;
	}
</style>
