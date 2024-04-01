<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Link from '$lib/components/Link.svelte';
	import { loading } from '$lib/stores';
	import type { PageData } from './$types';
	import LevelHeader from './LevelHeader.svelte';
	import MoveForm from './MoveForm.svelte';

	export let data: PageData;
</script>

<Card>
	{#if data.movesByLevel.length > 0}
		{#each data.movesByLevel as level}
			<LevelHeader {level} />
			{#each level.ids as id, n}
				{#if data.updateMove === id}
					<Card>
						<form method="POST" action="?/updateMove">
							<MoveForm />
						</form>
						<div
							style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.25rem; align-self:end"
						>
							<form method="GET" data-sveltekit-noscroll>
								<input name="updateMove" type="hidden" required value={null} />
								<Button directive="warning">Cancel</Button>
							</form>
							<form method="POST" action="?/deactivateMove">
								<input name="id" type="hidden" required value={id} />
								<Button directive="danger">Delete</Button>
							</form>
						</div>
					</Card>
				{:else}
					<div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center;">
						<p>{level.moves.at(n)}</p>
						<div
							style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.25rem; align-self:end"
						>
							<form method="GET" data-sveltekit-noscroll>
								<input name="updateMove" type="hidden" value={id} />
								<Button>Edit</Button>
							</form>
							{#if level.deletedAt.at(n)}
								<form method="POST" use:enhance inert={$loading} action="?/activateMove">
									<input name="id" type="hidden" value={id} />
									<Button directive="success">Activate</Button>
								</form>
							{:else}
								<form method="POST" use:enhance inert={$loading} action="?/deactivateMove">
									<input name="id" type="hidden" value={id} />
									<Button directive="danger">Deactivate</Button>
								</form>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		{/each}
	{:else}
		<span
			>No moves.
			<Link href="#createMove">Please create a move below.</Link>
		</span>
	{/if}
</Card>

<Card header="Create a Move" id="createMove">
	<form method="POST" action="?/createMove" inert={$loading} use:enhance>
		<MoveForm />
	</form>
</Card>
