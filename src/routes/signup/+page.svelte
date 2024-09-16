<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Link from '$lib/components/Link.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { loading } from '$lib/stores';

	export let data: PageData;
	const { form, allErrors, errors, capture, restore, constraints, delayed, enhance } = superForm(
		data.form,
		{
			onSubmit: () => loading.set(true),
			onResult: () => loading.set(false),
			onError: () => console.error('Error signing up')
		}
	);
	export const snapshot = {
		capture,
		restore
	};
</script>

{#if $allErrors.length > 0}
	<Alert directive="danger"
		><span slot="header">Error</span>
		<ul>
			{#each $allErrors as e}
				<li>
					{e.messages.join('. ')}
				</li>
			{/each}
		</ul>
	</Alert>
{/if}
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
				aria-invalid={$errors.username ? 'true' : undefined}
				{...$constraints.username}
			/>
			<Label for="name"><span>Password</span></Label>
			<Input
				name="password"
				type="password"
				placeholder="Password (required)"
				bind:value={$form.password}
				aria-invalid={$errors.username ? 'true' : undefined}
				{...$constraints.password}
			/>
			<span />
			<Button type="submit"
				>{#if $delayed}<Spinner />{/if}Sign up</Button
			>
		</FormSet>
	</form>
</Card>
<Link href="/">Already have an account? Log in here</Link>
