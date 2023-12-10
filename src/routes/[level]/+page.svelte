<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import H1 from '$lib/components/H1.svelte';
	import TD from '$lib/components/TD.svelte';
	import TH from '$lib/components/TH.svelte';
	import THead from '$lib/components/THead.svelte';
	import TR from '$lib/components/TR.svelte';
	import Table from '$lib/components/Table.svelte';
	import Tbody from '$lib/components/Tbody.svelte';
	import { loading } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<H1>{data.pageTitle}</H1>
{#if data.complete}
	<Card title="Congratulations!"
		><p>Pole Level {data.level} Achievement Unlocked</p>
		<form
			method="POST"
			action="?/reset"
			use:enhance={() => {
				loading.set(true);
				return async ({ update }) => {
					await update();
					loading.set(false);
				};
			}}
		>
			<Button title="This is here to reset the data for testing purposes">Reset</Button>
		</form></Card
	>
{/if}
<Table>
	<THead>
		<TR>
			<TH>Move</TH>
			<TH centered>Signed</TH>
		</TR>
	</THead>
	<Tbody>
		{#each data.moves.entries() as [id, { name, date }]}
			<TR>
				<TD>{name}</TD>
				<TD centered>
					{#if date}
						{date.toLocaleString()}
					{:else}
						<form
							method="POST"
							action="?/signoff"
							use:enhance={() => {
								loading.set(true);
								return async ({ update }) => {
									await update();
									loading.set(false);
								};
							}}
						>
							<input name="id" type="hidden" value={id} />
							<Button type="submit">Sign off</Button>
						</form>
					{/if}
				</TD>
			</TR>
		{/each}
	</Tbody>
	<tfoot />
</Table>
