<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form data-sveltekit-noscroll data-sveltekit-keepfocus id="search-params" METHOD="GET"></form>
<table>
	<thead>
		<tr><th>User</th></tr>
	</thead>
	<tbody>
		{#each data.users as user}
			<tr>
				<td>
					{user.username}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
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
