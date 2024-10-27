<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { Directive } from './types';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLButtonAttributes {
		directive?: Directive;
		children?: Snippet;
	}

	let { directive = 'primary', children, ...rest }: Props = $props();
</script>

<button
	in:fade={{ easing: cubicInOut }}
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:warning={directive === 'warning'}
	class:secondary={directive === 'secondary'}
	class:primary={directive === 'primary'}
	{...rest}>{@render children?.()}</button
>

<style>
	button {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		justify-content: center;
		background: var(--bg);
		color: var(--primary);
		border: 2px solid var(--primary);
		padding: 0.5rem 1rem;
	}

	button:not(:disabled):hover {
		box-shadow: var(--primary) 0.5rem 0.5rem;
	}

	button.secondary {
		color: var(--bg);
		border-color: var(--primary);
	}
	button.secondary:not(:disabled):hover {
		box-shadow: var(--primary) 0.5rem 0.5rem;
	}

	button.danger {
		color: var(--danger);
		border-color: var(--danger);
	}
	button.danger:not(:disabled):hover {
		box-shadow: var(--danger) 0.5rem 0.5rem;
	}

	button.success {
		color: var(--success);
		border-color: var(--success);
	}
	button.success:not(:disabled):hover {
		box-shadow: var(--success) 0.5rem 0.5rem;
	}

	button.warning {
		color: var(--warning);
		border-color: var(--warning);
	}
	button.warning:not(:disabled):hover {
		box-shadow: var(--warning) 0.5rem 0.5rem;
	}

	button:not(:disabled):active {
		box-shadow: none;
		text-decoration: underline;
	}

	:global(form[inert] button),
	button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
