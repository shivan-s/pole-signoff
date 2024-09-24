<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import A from '$lib/components/A.svelte';
	import { fromNow } from '$lib/utils/time';
	import type { PageData } from './$types';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';

	export let data: PageData;
</script>

<form data-sveltekit-noscroll data-sveltekit-keepfocus id="search-params" METHOD="GET">
	<input type="hidden" value={data.cursor} name="cursor" />
</form>
<div class="flex-col" style="width: unset">
	<Label for="q">Search</Label>
	<div class="flex-row">
		<Input
			id="q"
			form="search-params"
			name="q"
			value={data.q}
			placeholder="Polers By Username"
		/><Button title="Search" form="search-params" type="submit" style="padding 0rem;"
			><SearchIcon width="1 rem" /></Button
		>
	</div>
	{#if data.q}
		<A style="align-self: center; margin: 0.5rem" title="Clear Search" href=".">Clear Search</A>
	{:else}
		<span style="margin: 0.5rem">&nbsp;</span>
	{/if}
</div>
<div class="flex-row" style="justify-content: space-between; align-items: center">
	<Button
		title="Back"
		form="search-params"
		name="cursor"
		value={data.cursor - 1}
		disabled={data.cursor < 1}>◄ Back</Button
	>
	<p style="color: var(--gray)">Recently joined:</p>
	<Button
		title="Next"
		form="search-params"
		name="cursor"
		value={data.cursor + 1}
		disabled={!data.isNextPage}>Next ►</Button
	>
</div>
{#each data.users as user}
	<a href="/poler/{user.username}">
		<A href="/poler/{user.name}">{user.username}</A> joined
		<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time></a
	>
{/each}
