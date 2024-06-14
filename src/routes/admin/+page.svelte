<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { loading } from '$lib/stores';
	import type { PageData } from './$types';
	import MoveForm from './MoveForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import LevelSection from './LevelSection.svelte';

	export let data: PageData;
</script>

<form method="GET">
	<input name="create-move" value={1} type="hidden" />
	<Button directive="success"><AddIcon />Create Move</Button>
</form>
<Modal id="create-move" header="Create Move">
	<form
		method="POST"
		action="?/createMove"
		inert={$loading}
		use:enhance={() => {
			loading.set(true);
			return async ({ update }) => {
				await update();
				loading.set(false);
			};
		}}
	>
		<MoveForm formId={data.formId} />
	</form>
</Modal>
<Card>
	{#if data.movesByLevel.length > 0}
		{#each data.movesByLevel as level (level)}
			<LevelSection {level} />
		{/each}
	{:else}
		<span>No moves to display. </span>
	{/if}
</Card>
