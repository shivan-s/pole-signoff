<script lang="ts">
	import { dateStamp, fromNow } from '$lib/utils';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{JSON.stringify(data.user)}

<div class="wrapper">
	<span class="header">Username</span>
	<span class="data">{data.user.username}</span>
	<span class="header">Name</span>
	{#if data.user.name}
		<span class="data">{data.user.name}</span>
	{:else}
		<span class="data"><em style="color: var(--grey)">Not Set</em></span>
	{/if}
	<span class="header">Member Since</span>
	<span class="data"
		><time datetime={data.user.createdAt.toString()}
			>{dateStamp(data.user.createdAt)} ({fromNow(data.user.createdAt)})</time
		>
	</span>
</div>

<style>
	div.wrapper {
		max-width: 75ch;
		width: 100%;
		display: grid;
		border: 2px var(--primary) solid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		box-shadow: var(--text) 0.5rem 0.5rem;
	}
	span.header {
		font-size: 1.25rem;
		text-align: left;
		padding: 2rem 0.5rem 2rem 0.5rem;
		color: var(--bg);
		background-color: var(--primary);
	}
	span.data {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 0.75rem 1rem 0.75rem;
	}
</style>
