<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import H1 from '$lib/components/H1.svelte';
	import { loading } from '$lib/stores';
	import type { PageData } from './$types';
	import LevelTable from '$lib/components/LevelTable.svelte';

	export let data: PageData;
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<!-- <H1>{data.pageTitle}</H1> -->
<!-- {#if data.complete} -->
<!-- 	<Card header="Congratulations!" -->
<!-- 		><p>Pole Level {data.level} Achievement Unlocked</p> -->
<!-- 		<form -->
<!-- 			id="reset" -->
<!-- 			method="POST" -->
<!-- 			action="?/reset" -->
<!-- 			use:enhance={() => { -->
<!-- 				loading.set(true); -->
<!-- 				return async ({ update }) => { -->
<!-- 					await update(); -->
<!-- 					loading.set(false); -->
<!-- 				}; -->
<!-- 			}} -->
<!-- 		></form> -->
<!---->
<!-- 		<Button form="reset" title="This is here to reset the data for testing purposes">Reset</Button> -->
<!-- 	</Card> -->
<!-- {/if} -->
<!---->
<!-- <LevelTable moves={data.moves} /> -->
