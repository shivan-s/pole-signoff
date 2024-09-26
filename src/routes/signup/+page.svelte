<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import A from '$lib/components/A.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { CHECKED } from '$lib/characters';
	import H2 from '$lib/components/H2.svelte';

	export let data: PageData;
	const { form, allErrors, capture, restore, constraints, delayed, enhance } = superForm(
		data.form,
		{
			applyAction: false
		}
	);
	export const snapshot = {
		capture,
		restore
	};
</script>

<Card style="height: fit-content;">
	<H2 style="font-size: 1.25rem;">Signup {CHECKED}</H2>
	<form method="POST" action="?/login" use:enhance>
		<div class="flex-col">
			<FormSet>
				<Label for="username"><span>Username</span></Label>
				<Input
					id="username"
					name="username"
					type="text"
					placeholder="Username (required)"
					bind:value={$form.username}
					{...$constraints.username}
				/>
				<Label for="name"><span>Password</span></Label>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="Password (required)"
					bind:value={$form.password}
					{...$constraints.password}
				/>
				<span />
				<Button type="submit"
					>{#if delayed}<Spinner />{:else}Sign up{/if}</Button
				>
				<span />
				<A href="/">Already have an account? Log in here</A>
			</FormSet>
		</div>
	</form>
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
</Card>
