<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { addToast, loading } from '$lib/stores';

	export let data: PageData;
	const { form, capture, restore, constraints, enhance, message } = superForm(data.form, {
		onSubmit: () => loading.set(true),
		onUpdate: () => loading.set(false),
		onError: ({ result }) => {
			$message = result.error.message || 'Unknown Error';
		},
		onUpdated: () => addToast({ message: 'Login successful', directive: 'success' })
	});

	export const snapshot = {
		capture,
		restore
	};
</script>

{#if data.user}Welcome {data.user.name ?? ''}{:else}
	<Card>
		<span slot="header">Login</span>
		{#if $message}
			<span style="text-align: center; color: var(--danger); padding: 1rem">{$message}</span>
		{/if}
		<form method="POST" action="?/login" use:enhance>
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
			</FormSet>
		</form>
	</Card>
	<Link href="/signup">No account? Sign up here</Link>
{/if}
