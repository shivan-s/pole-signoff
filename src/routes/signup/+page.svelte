<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import type { PageData, Snapshot } from './$types';

	let formData: { username: string | null; password: string | null; email: string | null } = {
		email: null,
		username: null,
		password: null
	};
	export let data: PageData;
	export const snapshot: Snapshot<typeof formData> = {
		capture: () => formData,
		restore: (value) => (formData = value)
	};
</script>

<Card
	><FormSet>
		<input name="formId" type="hidden" value={data.formId} />
		<Label for="username"><span>Username</span></Label>
		<Input
			name="username"
			autocomplete="off"
			required
			type="text"
			minLength="1"
			maxLength="128"
			placeholder="Username (required)"
			bind:value={formData.username}
		/>
		<Label for="email"><span>Email</span></Label>
		<Input
			name="username"
			autocomplete="off"
			required
			type="text"
			minLength="1"
			maxLength="128"
			placeholder="Email (required)"
			bind:value={formData.email}
		/>
		<Label for="name"><span>Password</span></Label>
		<Input
			name="password"
			autocomplete="off"
			required
			type="password"
			minLength="1"
			maxLength="128"
			placeholder="Password (required)"
			bind:value={formData.password}
		/>
	</FormSet></Card
>
