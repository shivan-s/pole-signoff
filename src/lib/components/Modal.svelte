<script lang="ts">
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	interface Props {
		id: string;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { id, header, children, ...rest }: Props = $props();
</script>

<dialog transition:fade={{ easing: cubicInOut }} popover="auto" {id} {...rest}>
	<Card>
		{#snippet header()}
			<span class="header"
				>{@render header?.()}<button popovertarget={id} popovertargetaction="hide"
					><CloseIcon /></button
				></span
			>
		{/snippet}
		<span>{@render children?.()}</span>
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
