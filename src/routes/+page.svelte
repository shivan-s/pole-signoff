<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { addToast, loading } from '$lib/stores';
	import Alert from '$lib/components/Alert.svelte';
	import A from '$lib/components/A.svelte';
	import { fromNow } from '$lib/utils';
	import { PROGRESS, JOINED, CHECKED } from '$lib/characters';
	import H2 from '$lib/components/H2.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data: PageData;
	const { form, capture, restore, constraints, enhance, allErrors, delayed } = superForm(
		data.form,
		{
			onUpdate: ({ result }) => {
				if (result.type === 'success')
					addToast({ message: 'Login successful', directive: 'success' }), loading.set(false);
			},
			applyAction: false
		}
	);

	export const snapshot = {
		capture,
		restore
	};
</script>

<H2>Sign off your <strong>pole</strong> progress {PROGRESS}!</H2>
<hr />
{#if !data.user}
	<div class="grid">
		<Card style="height: fit-content;">
			<H2 style="font-size: 1.25rem;">Login {CHECKED}</H2>
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
							>{#if delayed}<Spinner />{:else}Log in{/if}</Button
						>
						<span />
						<A href="/signup">No account? Sign up here</A>
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
		<Card>
			<H2 style="font-size: 1.25rem;">Recently Joined {JOINED}</H2>
			{#each data.users as user}
				<a href="/@{user.stagehandle}">
					@<A href="/@{user.stagehandle}">{user.stagehandle}</A> joined
					<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time></a
				>
			{/each}
		</Card>
	</div>
{:else}
	Logged in
{/if}

<style>
	div.grid {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		gap: 1rem;
	}

	@media only screen and (max-width: 600px) {
		div.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
