<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';
	import type { Directive } from './types';
	import FailIcon from '$lib/components/icons/FailIcon.svelte';
	import SuccessIcon from '$lib/components/icons/SuccessIcon.svelte';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		directive: Directive;
	}
	export let directive: Directive = 'primary';
</script>

<div
	class="wrapper"
	in:fade={{ easing: cubicInOut }}
	role="alert"
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:warning={directive === 'warning'}
	class:primary={directive === 'primary'}
	{...$$restProps}
>
	{#if $$slots['header']}
		<header>
			{#if directive === 'danger'}<FailIcon />{/if}
			{#if directive === 'warning'}<FailIcon />{/if}
			{#if directive === 'success'}<SuccessIcon />{/if}
			<slot name="header" />
		</header>
	{/if}
	{#if $$slots['default']}
		<div><slot /></div>
	{/if}
	{#if $$slots['footer']}
		<footer><slot name="footer" /></footer>
	{/if}
</div>

<style>
	div.wrapper {
		border: 2px var(--primary) solid;
		width: 100%;
		max-width: var(--width-medium);
		padding: var(--padding-normal);
		box-shadow: var(--text) 0.5rem 0.5rem;
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
