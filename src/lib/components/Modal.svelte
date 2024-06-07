<script lang="ts">
	import { page } from '$app/stores';
	import Card from '$lib/components/Card.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import CloseIcon from './icons/CloseIcon.svelte';
	export let header = '';
	export let id: string | number;
	if (typeof id === 'number') {
		id = id.toString();
	}
	$: showModal = $page.url.searchParams.get(id);
</script>

{#if showModal}
	<div transition:fade={{ easing: cubicInOut }} class="wrapper">
		<div class="container">
			<form method="GET">
				<button type="submit"><CloseIcon /></button>
			</form>
			<Card {header}><slot /></Card>
		</div>
	</div>
{/if}

<style>
	button {
		max-width: min-content;
		color: inherit;
		border: none;
		background: transparent;
	}
	button:hover {
		outline: 1px inherit;
	}
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 98;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100dvh;
		backdrop-filter: blur(10px);
	}

	.container {
		z-index: 99;
	}
</style>
