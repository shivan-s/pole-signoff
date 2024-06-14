<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Button from '$lib/components/Button.svelte';

	export let formId: string | null = null;
	export let name: string | null = null;
	export let description: string | null = null;
	export let level: number | null = null;
</script>

<formset>
	<input name="formId" type="hidden" value={formId} />
	<Label for="name"><span>Name</span></Label>
	<Input
		name="name"
		autocomplete="off"
		required
		type="text"
		minLength="1"
		maxLength="128"
		placeholder="e.g. Move name (required)"
		value={name}
	/>
	<Label for="description"><span>Description</span></Label>
	<TextArea name="description" data-placeholder="(optional)" value={description} />
	<Label for="level">Level</Label>
	<Input
		name="level"
		required
		type="number"
		min="1"
		step="1"
		placeholder="e.g. 1 (required)"
		value={level}
	/>
	<span />
	<span style="display: flex; gap:0.5rem; justify-content: end">
		<form method="GET" data-sveltekit-noscroll>
			<Button title="Cancel" directive="warning">Cancel</Button>
		</form>
		<Button title="Save move" type="submit" directive="success">Save</Button>
	</span>
</formset>

<style>
	formset {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
	}
</style>
