<script lang="ts">
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import H2 from '$lib/components/H2.svelte';
	import { addToast, loading } from '$lib/stores';
	import Modal from '$lib/components/Modal.svelte';
	import MoveForm from './MoveForm.svelte';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import ShowLessIcon from '$lib/components/icons/ShowLessIcon.svelte';
	import ShowMoreIcon from '$lib/components/icons/ShowMoreIcon.svelte';
	import ActiveIcon from '$lib/components/icons/ActiveIcon.svelte';
	import InactiveIcon from '$lib/components/icons/InactiveIcon.svelte';

	export let level: {
		level: number;
		ids: number[];
		moves: string[];
		descriptions: (string | null)[];
		deletedAt: (Date | null)[];
	};
</script>

<input style="display: none" class="toggle" id="toggle-{level.level}" type="checkbox" checked />
<label
	class="toggle-label"
	for="toggle-{level.level}"
	style="display: flex; width: 100%; align-items: end; justify-content: space-between; border-bottom: 2px solid var(--primary)"
>
	<span style="display: flex; align-items: center">
		<H2>Level {level.level}</H2>
		<span class="less">
			<ShowLessIcon />
		</span>
		<span class="more">
			<ShowMoreIcon />
		</span>
	</span>
	<p style="color: var(--grey); padding-bottom: 0.5rem">
		{level.ids.length}
		{#if level.ids.length === 1}move{:else}moves{/if}
	</p>
</label>
<span class="show-level">
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
		</Modal>
		<div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center;">
			{#if level.deletedAt.at(n)}
				<p style="color: var(--grey)">{level.moves.at(n)}</p>
				<div style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.75rem; align-self:end">
					<form method="POST" action="?/deleteMove">
						<input name="id" type="hidden" required value={id} />
						<Button title="Delete move permanetely" directive="danger"><DeleteIcon /></Button>
					</form>
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
						<Button directive="success" title="Activate move"><InactiveIcon /></Button>
					</form>
				</div>
			{:else}
				<p>{level.moves.at(n)}</p>
				<div style="display: flex; flex-wrap: wrap; align-items: end; gap: 0.75rem; align-self:end">
					<form method="GET" data-sveltekit-noscroll>
						<input name="update-move-{id}" type="hidden" value={id} />
						<Button title="Edit move"><EditIcon /></Button>
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
						<Button directive="danger" title="Deactivate move"><ActiveIcon /></Button>
					</form>
				</div>
			{/if}
		</div>
	{/each}
</span>

<style>
	.toggle:not(:checked) ~ .show-level {
		display: none;
	}

	.toggle:checked ~ .show-level {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.toggle:not(:checked) ~ .toggle-label .less {
		display: none;
	}

	.toggle:checked ~ .toggle-label .more {
		display: none;
	}

	.toggle:checked ~ .toggle-label .less {
		display: block;
	}
</style>
