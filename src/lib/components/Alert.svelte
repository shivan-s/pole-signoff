<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import type { Directive } from './types';
	import FailIcon from '$lib/components/icons/FailIcon.svelte';
	import SuccessIcon from '$lib/components/icons/SuccessIcon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		directive: Directive;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}

	let { directive = 'primary', header, children, footer, ...rest }: Props = $props();
</script>

<div
	class="wrapper"
	in:fade={{ easing: cubicInOut }}
	role="alert"
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:warning={directive === 'warning'}
	class:primary={directive === 'primary'}
	{...rest}
>
	{#if header}
		<header>
			{#if directive === 'danger'}<FailIcon />{/if}
			{#if directive === 'warning'}<FailIcon />{/if}
			{#if directive === 'success'}<SuccessIcon />{/if}
			{@render header?.()}
		</header>
	{/if}
	{#if children}
		<div>{@render children?.()}</div>
	{/if}
	{#if footer}
		<footer>{@render footer?.()}</footer>
	{/if}
</div>

<style>
	div.wrapper {
		border: 2px var(--primary) solid;
		width: 100%;
		max-width: var(--width-medium);
		padding: var(--padding-normal);
		box-shadow: var(--text) 0.5rem 0.5rem;
		margin: 1rem;
	}
	div > header {
		display: flex;
		align-items: center;
		gap: var(--gap-normal);
	}
	div.danger {
		color: var(--danger);
		border-color: var(--danger);
	}
	div.success {
		color: var(--success);
		border-color: var(--success);
	}
	div.warning {
		color: var(--warning);
		border-color: var(--warning);
	}
</style>
