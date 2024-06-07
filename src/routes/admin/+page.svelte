<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import { loading } from '$lib/stores';
	import type { PageData } from './$types';
	import LevelHeader from './LevelHeader.svelte';
	import MoveForm from './MoveForm.svelte';
	import { addToast } from '$lib/stores';
	import Modal from '$lib/components/Modal.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';

	export let data: PageData;
</script>

<form method="GET">
	<input name="create-move" value={1} type="hidden" />
	<Button directive="success"><AddIcon />Create Move</Button>
</form>
<Modal id="create-move" header="Create Move">
	<form method="POST" action="?/createMove" inert={$loading} use:enhance>
		<MoveForm formId={data.formId} />
	</form>
</Modal>
<Card>
	{#if data.movesByLevel.length > 0}
		{#each data.movesByLevel as level}
			<label for="show-level-{level.level}">
				<input id="show-level-{level.level}" type="checkbox" />
			</label>
			<LevelHeader {level} />
			{#each level.ids as id, n}
				<Modal id="update-move-{id}" header="Update Move">
					<form method="POST" action="?/updateMove">
						<input name="id" type="hidden" value={id} />
						<MoveForm
							name={level.moves.at(n)}
							description={level.descriptions.at(n)}
							level={level.level}
						/>
					</form>
					<div
						style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.25rem; align-self:end"
					>
						<form method="GET" data-sveltekit-noscroll>
							<Button directive="warning">Cancel</Button>
						</form>
						<form method="POST" action="?/deleteMove">
							<input name="id" type="hidden" required value={id} />
							<Button directive="danger">Delete</Button>
						</form>
					</div>
				</Modal>
				<div
					id="level-{level.level}"
					style="display: grid; grid-template-columns: 1fr 1fr; align-items: center;"
				>
					{#if level.deletedAt.at(n)}
						<p style="color: var(--grey)">{level.moves.at(n)}</p>
						<div
							style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.25rem; align-self:end"
						>
							<form
								method="POST"
								use:enhance={() => {
									addToast({
										message: `${level.moves.at(n)} successfully activated`,
										directive: 'success'
									});
									return async ({ update }) => await update();
								}}
								inert={$loading}
								action="?/activateMove"
							>
								<input name="id" type="hidden" value={id} />
								<Button directive="success">Activate</Button>
							</form>
						</div>
					{:else}
						<p>{level.moves.at(n)}</p>
						<div
							style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.25rem; align-self:end"
						>
							<form method="GET" data-sveltekit-noscroll>
								<input name="update-move-{id}" type="hidden" value={id} />
								<Button title="Edit"><EditIcon /></Button>
							</form>
							<form
								method="POST"
								use:enhance={() => {
									addToast({
										message: `${level.moves.at(n)} successfully deactivated`,
										directive: 'success'
									});
									return async ({ update }) => await update();
								}}
								inert={$loading}
								action="?/deactivateMove"
							>
								<input name="id" type="hidden" value={id} />
								<Button directive="danger">Deactivate</Button>
							</form>
						</div>
					{/if}
				</div>
			{/each}
		{/each}
	{:else}
		<span>No moves to display. </span>
	{/if}
</Card>
