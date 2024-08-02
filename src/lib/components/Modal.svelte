<script lang="ts">
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	export let id: string;
</script>

<dialog transition:fade={{ easing: cubicInOut }} popover="auto" {id} {...$$restProps}>
	<Card>
		<span slot="header"
			><slot name="header" /><button popovertarget={id} popovertargetaction="hide"
				><CloseIcon /></button
			></span
		>
		<span>Body</span>
	</Card>
</dialog>

<style>
	dialog {
		background: transparent;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
	}
	button {
		color: inherit;
		border: none;
		background: transparent;
	}
</style>
