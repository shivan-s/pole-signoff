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
	import { PROGRESS, JOINED, CHECKED, SIGNUP } from '$lib/characters';
	import H2 from '$lib/components/H2.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data: PageData;
	const { form, capture, restore, constraints, enhance, allErrors, errors, delayed } = superForm(
		data.form,
		{
			onSubmit: () => loading.set(true),
			onUpdate: ({ result }) => {
				if (result.type === 'success')
					addToast({ message: 'Login successful', directive: 'success' }), loading.set(false);
			},
			onUpdated: () => loading.set(false),
			applyAction: false
		}
	);

	export const snapshot = {
		capture,
		restore
	};
</script>

<p>Sign off your <strong>pole</strong> progress {PROGRESS}!</p>
<hr />
{#if !data.user}
	<div class="grid">
		<Card style="order: 1">
			<H2 style="font-size: 1.25rem;">Recently Joined {JOINED}</H2>
			{#each data.users as user}
				<a href="/poler/{user.username}">
					<A href="/poler/{user.name}">{user.username}</A> joined
					<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time></a
				>
			{/each}
		</Card>
		{#if data.isSignup}
			<Card style="height: fit-content; order: -1">
				<H2 style="font-size: 1.25rem;">Signup {SIGNUP}</H2>
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
				<form method="POST" action="?/signup" use:enhance>
					<FormSet>
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
							>{#if $delayed}<Spinner />{:else}Sign up{/if}</Button
						>
						<span />
						<A href="." style="width: fit-content">Got account? Log in instead</A>
					</FormSet>
				</form>
			</Card>
		{:else}
			<Card style="height: fit-content; order: -1">
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
							<Button type="submit">Log in</Button>
							<span />
							<A href="?signup=1">No account? Sign up instead</A>
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
		{/if}
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
