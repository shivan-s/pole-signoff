<script lang="ts">
	import { toasts, dismissToast } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { cubicInOut } from 'svelte/easing';
	import { blur } from 'svelte/transition';
	import CloseIcon from '$lib/components/icons/CloseIcon.svelte';
	import SuccessIcon from './icons/SuccessIcon.svelte';
	import FailIcon from './icons/FailIcon.svelte';
</script>

<div class="wrapper">
	{#each $toasts as toast (toast.id)}
		<div
			animate:flip
			class="item"
			class:danger={toast.directive === 'danger'}
			class:success={toast.directive === 'success'}
			class:primary={toast.directive === 'primary'}
			in:blur={{ easing: cubicInOut }}
		>
			{#if toast.directive === 'success'}
				<SuccessIcon width="2rem" />
			{/if}
			{#if toast.directive === 'danger'}
				<FailIcon width="2rem" />
			{/if}
			{toast.message}
			<button on:click={() => dismissToast(toast.id ?? '')}><CloseIcon /></button>
		</div>
	{/each}
</div>

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
		top: 1rem;
		right: 1rem;
		z-index: 99;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.item {
		display: flex;
		gap: 1rem;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		border: 2px var(--primary) solid;
		color: var(--primary);
		background-color: var(--bg);
		width: 100%;
		max-width: 360px;
		box-shadow: var(--text) 0.125rem 0.125rem;
	}
	.item.primary {
		border-color: var(--primary);
		color: var(--bg);
		background-color: var(--primary);
	}
	.item.success {
		border-color: var(--success);
		color: var(--success);
		background-color: var(--bg);
	}
	.item.danger {
		border-color: var(--danger);
		color: var(--danger);
		background-color: var(--bg);
	}
</style>
