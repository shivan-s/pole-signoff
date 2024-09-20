<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import A from '$lib/components/A.svelte';
	import type { PageData } from './$types';
	import { fromNow } from '$lib/utils/time';

	export let data: PageData;
</script>

<form data-sveltekit-noscroll data-sveltekit-keepfocus id="search-params" METHOD="GET"></form>
{#each data.users as user}
	<a href="/poler/{user.username}">
		<A href="/poler/{user.name}">{user.username}</A> joined
		<time datetime={user.createdAt.toString()}>{fromNow(user.createdAt)}</time></a
	>
{/each}
<div class="flex-row" style="justify-content: space-between">
	<Button
		title="Back"
		form="search-params"
		name="cursor"
		value={data.cursor - 1}
		disabled={data.cursor < 1}>◄ Back</Button
	>
	<Button
		title="Next"
		form="search-params"
		name="cursor"
		value={data.cursor + 1}
		disabled={!data.isNextPage}>Next ►</Button
	>
</div>
