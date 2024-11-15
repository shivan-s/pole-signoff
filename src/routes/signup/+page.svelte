<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import FieldSet from '$lib/components/FieldSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import A from '$lib/components/A.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { CHECKED } from '$lib/characters';
	import H2 from '$lib/components/H2.svelte';
	import UL from '$lib/components/UL.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const {
		form: inviteForm,
		allErrors: inviteAllErrors,
		constraints: inviteConstraints,
		delayed: inviteDelayed,
		message: inviteMessage,
		enhance: inviteEnhance
	} = superForm(data.inviteForm, {
		applyAction: false
	});

	const { form, allErrors, capture, restore, constraints, delayed, enhance } = superForm(
		data.signupForm,
		{
			applyAction: false
		}
	);
	export const snapshot = {
		capture,
		restore
	};
</script>

<div class="flex-col" style="gap: var(--gap-xloose)">
	<p>Got any Questions? <A href="#faq">Make sure to check this out</A></p>
	{#if !$inviteMessage}
		<Card>
			<H2 style="font-size: 1.25rem;">Invite Code Required to Create an Account</H2>
			<form method="POST" action="?/invite" use:inviteEnhance>
				<div class="flex-col">
					<FieldSet>
						<Label for="inviteCode">Invite Code</Label>
						<span class="wrapper">
							<Input
								title="Invite code to sign up"
								id="stagehandle"
								name="stagehandle"
								type="text"
								placeholder="Four words with no spaces, e.g. {data.exampleCode}"
								bind:value={$inviteForm.inviteCode}
								{...$inviteConstraints.inviteCode}
							/>
						</span>
						<span></span>
						<Button type="submit"
							>{#if $inviteDelayed}<Spinner />{:else}Submit{/if}</Button
						>
						<span></span>
						<A href="/">Already have an account? Log in here</A>
					</FieldSet>
				</div>
			</form>
			{#if $inviteAllErrors.length > 0}
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
	{:else}
		<Card>
			<H2 style="font-size: 1.25rem;">Signup {CHECKED}</H2>
			<form method="POST" action="?/signup" use:enhance>
				<div class="flex-col">
					<FieldSet>
						<span></span>{JSON.stringify(inviteForm, null, 2)}
						<Label for="stagehandle"
							><abbr title="This is like a username">Stage Handle</abbr></Label
						>
						<span class="wrapper">
							<span class="handle" title="Your stage handle"></span>
							<Input
								title="Can only be lower case letters, '.' and/or '_'; no spaces or numbers, with 16 maximum character length"
								style="padding-left: 4ch"
								id="stagehandle"
								name="stagehandle"
								type="text"
								placeholder={data.exampleHandle}
								bind:value={$form.stagehandle}
								{...$constraints.stagehandle}
							/>
						</span>
						<Label for="name"><span>Password</span></Label>
						<Input
							title="Make this secure"
							id="password"
							name="password"
							type="password"
							placeholder="It'll be kept secret ;)"
							bind:value={$form.password}
							{...$constraints.password}
						/>
						<span></span>
						<Button type="submit"
							>{#if $delayed}<Spinner />{:else}Sign up{/if}</Button
						>
						<span></span>
						<A href="/">Already have an account? Log in here</A>
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
	{/if}
	<Card id="faq">
		{#snippet header()}
			<span>FAQs</span>
		{/snippet}
		<span>
			<H2 id="what-is-this" style="font-size: 1.25rem">What is this?</H2>
			<p>
				To answer what <strong>pole.academy</strong> is, we need to understand why I made this. At my
				studio, I noticed how sign off for pole dance moves are done on a manual paper sheet. Why not
				turn this into an online app?
			</p>
			<H2 style="font-size: 1.25rem">Why did you make this?</H2>
			<p>
				To answer why <strong>pole.academy</strong> exists, we need to understand <A
					href="#what-is-this">what this is</A
				>.
			</p>
			<H2 style="font-size: 1.25rem">Why invite codes?</H2>
			<p>This is an easy way to ensure the sign up are legitimate.</p>
		</span>
	</Card>
</div>

<style>
	span.wrapper {
		position: relative;
	}
	span.handle::before {
		position: absolute;
		content: '@';
		transform: translate(1ch, 25%);
	}
</style>
