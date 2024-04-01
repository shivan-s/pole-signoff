<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<formset>
	<Label for="name"><span>Name</span></Label>
	<Input
		name="name"
		required
		type="text"
		minLength="1"
		maxLength="128"
		placeholder="e.g. Move name (required)"
	/>
	<Label for="description"><span>Description</span></Label>
	<TextArea name="name" data-placeholder="(optional)" />
	<Label for="level">Level</Label>
	<Input name="level" required type="number" min="1" step="1" placeholder="e.g. 1 (required)" />
	<span />
	<Button type="submit">Create</Button>
</formset>

<style>
	formset {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 1rem;
	}
</style>
