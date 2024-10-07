<script lang="ts">
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	export let id: string;
</script>

<dialog transition:fade={{ easing: cubicInOut }} popover="auto" {id} {...$$restProps}>
	<Card>
		<span class="header" slot="header"
			><slot name="header" /><button popovertarget={id} popovertargetaction="hide"
				><CloseIcon /></button
			></span
		>
		<span><slot /></span>
	</Card>
</dialog>

<style>
	span.header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	dialog {
		position: fixed;
		background: transparent;
		width: 400px;
		height: fit-content;
		margin: auto;
		overflow: auto;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
	}
	button {
		display: flex;
		align-items: center;
		color: inherit;
		border: 1px var(--primary) solid;
		background: transparent;
	}
	button:hover {
		border: 1px var(--bg) solid;
		box-shadow: var(--bg) 0.5rem 0.5rem;
	}
	button:active {
		box-shadow: none;
	}
</style>
