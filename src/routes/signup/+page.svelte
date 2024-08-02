<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Link from '$lib/components/Link.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;
	const { form, capture, restore, constraints } = superForm(data.form);

	export const snapshot = {
		capture,
		restore
	};
</script>

<Card>
	<span slot="header">Enter Details</span>
	<form method="POST" action="?/signup" use:enhance>
		<FormSet>
			<input name="formId" type="hidden" value={data.formId} />
			<Label for="email"><span>Username</span></Label>
			<Input
				name="username"
				placeholder="Username (required)"
				bind:value={$form.username}
				{...$constraints.username}
			/>
			<Label for="name"><span>Password</span></Label>
			<Input
				name="password"
				type="password"
				placeholder="Password (required)"
				bind:value={$form.password}
				{...$constraints.password}
			/>
			<span />
			<Button type="submit">Sign up</Button>
		</FormSet>
	</form>
</Card>
<Link href="/">Already have an account? Log in here</Link>
