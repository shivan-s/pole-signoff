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
	import { generateFakeStagehandle } from '$lib/utils/faker';
	import UL from '$lib/components/UL.svelte';

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

<div class="flex-col" style="gap: var(--gap-xloose)">
	<p>Got any Questions? <A href="#faq">Make sure to check this out</A></p>
	<Card>
		<H2 style="font-size: 1.25rem;">Signup {CHECKED}</H2>
		<form method="POST" action="?/signup" use:enhance>
			<div class="flex-col">
				<FormSet>
					<Label for="stagehandle"><abbr title="This is like a username">Stage Handle</abbr></Label>
					<span class="wrapper">
						<span class="handle" title="Your stage handle" />
						<Input
							title="Can only be lower case letters, '.' and/or '_'; no spaces or numbers, with 16 maximum character length"
							style="padding-left: 4ch"
							id="stagehandle"
							name="stagehandle"
							type="text"
							placeholder={generateFakeStagehandle()}
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
					<span />
					<Button type="submit"
						>{#if $delayed}<Spinner />{:else}Sign up{/if}</Button
					>
					<span />
					<A href="/">Already have an account? Log in here</A>
				</FormSet>
			</div>
		</form>
		{#if $allErrors.length > 0}
			<Alert directive="danger"
				><span slot="header">Error</span>
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
	<Card id="faq">
		<span slot="header">FAQs</span>
		<span>
			<H2 id="what-is-this" style="font-size: 1.25rem">What is this?</H2>
			<p>
				To answer what <strong>pole.rocks</strong> is, we need to understand why I made this. At my studio,
				I noticed how sign off for pole dance moves are done on a manual paper sheet. Why not turn this
				into an online app?
			</p>
			<H2 style="font-size: 1.25rem">Why the domain, <strong>pole.rocks</strong>?</H2>
			<p>
				Sadly, <A href="https://pole.dance">pole.dance</A> would have been my first choice. Alas, being
				such a wicked domain name, it was taken and wasn't so cheap either. So...
				<strong>pole.rocks</strong> will do just fine :)
			</p>
			<H2 style="font-size: 1.25rem">Why did you make this?</H2>
			<p>
				To answer why <strong>pole.rocks</strong> exists, we need to understand <A
					href="#what-is-this">what this is</A
				>.
			</p>
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
