<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import FieldSet from '$lib/components/FieldSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { addToast } from '$lib/stores';
	import Alert from '$lib/components/Alert.svelte';
	import A from '$lib/components/A.svelte';
	import { fromNow } from '$lib/utils';
	import { PROGRESS, JOINED, CHECKED } from '$lib/characters';
	import H2 from '$lib/components/H2.svelte';
	import UL from '$lib/components/UL.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { goto } from '$app/navigation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { form, capture, restore, constraints, enhance, allErrors, delayed } = superForm(
		data.form,
		{
			onResult: ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				}
			},
			onUpdated: ({ form }) => {
				if (form.valid) {
					addToast({ message: 'Login successful', directive: 'success' });
				}
			}
		}
	);

	export const snapshot = {
		capture,
		restore
	};
</script>

<H2>Sign off your <strong>pole</strong> progress {PROGRESS}!</H2>
{#if !data.user}
	<div class="grid">
		<Card style="height: fit-content;">
			<H2 style="font-size: 1.25rem;">Login {CHECKED}</H2>
			<form method="POST" action="?/login" use:enhance>
				<div class="flex-col">
					<FieldSet>
						<Label for="stagehandle"><span>Stage Handle</span></Label>
						<Input
							id="stagehandle"
							name="stagehandle"
							type="text"
							placeholder="Stage Handle (required)"
							bind:value={$form.stagehandle}
							{...$constraints.stagehandle}
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
						<span></span>
						<Button type="submit"
							>{#if $delayed}<Spinner />{:else}Log in{/if}</Button
						>
						<span></span>
						<A href="/signup">No account? Sign up here</A>
					</FieldSet>
				</div>
			</form>
			{#if $allErrors.length > 0}
				<Alert directive="danger"
					>{#snippet header()}
						<span>Error</span>
					{/snippet}
					<UL>
						{#each $allErrors as e}
							<li>
								{e.messages.join('. ')}
							</li>
						{/each}
					</UL>
				</Alert>
			{/if}
		</Card>
		<Card>
			<H2 style="font-size: 1.25rem;">Recently Joined {JOINED}</H2>
			{#if data.users.length > 0}
				{#each data.users as user}
					{#if !user.isPrivate}
						<a title="@{user.stagehandle}" href="/@{user.stagehandle}">
							@<A href="/@{user.stagehandle}">{user.stagehandle}</A> joined
							<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time></a
						>
					{:else}
						<span title="@{user.stagehandle} is Private"
							>@{user.stagehandle} joined
							<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time>
						</span>
					{/if}
				{/each}
			{:else}
				<em>Please be the <A href="/signup">first?</A></em>
			{/if}
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
