<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	export let directive: 'danger' | 'success' | 'warning' | 'primary' = 'primary';
</script>

<button
	in:fade={{ easing: cubicInOut }}
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:warning={directive === 'warning'}
	class:primary={directive === 'primary'}
	{...$$restProps}><slot /></button
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
		padding: 0.5rem 1rem 0.5rem 1rem;
		text-transform: uppercase;
		font-size: 0.75rem;
		transition: all 0.2s ease-in-out;
	}

	button:not(:disabled):hover {
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

	:global(form[inert] > button),
	button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
