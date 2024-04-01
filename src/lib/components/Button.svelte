<script lang="ts">
	export let directive: 'danger' | 'success' | 'warning' | 'primary' = 'primary';
</script>

<button
	class:danger={directive === 'danger'}
	class:success={directive === 'success'}
	class:warning={directive === 'warning'}
	class:primary={directive === 'primary'}
	{...$$restProps}><slot /></button
>

<style>
	button {
		background: var(--bg);
		color: var(--primary);
		border: 2px solid var(--primary);
		padding: 0.5rem 1rem 0.5rem 1rem;
		text-transform: uppercase;
		font-size: 0.75rem;
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
		color: var(--text);
		background: var(--primary);
		box-shadow: var(--text) 0.5rem 0.5rem;
		border: 2px solid var(--text);
		transition: all 0.2s ease-in-out 0s;
		text-decoration: underline;
	}

	:global(form[inert] > button),
	button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
</style>
