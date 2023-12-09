<button {...$$restProps}><slot /></button>

<style>
	button {
		background: var(--bg);
		color: var(--primary);
		border: 2px solid var(--primary);
		padding: 1rem 0rem 1rem 0rem;
		width: 100%;
		max-width: 16rem;
		text-transform: uppercase;
		font-size: 0.75rem;
	}

	button:hover {
		box-shadow: var(--primary) 0.5rem 0.5rem;
	}

	button:active {
		color: var(--text);
		background: var(--primary);
		box-shadow: var(--text) 0.5rem 0.5rem;
		border: 2px solid var(--text);
		transition: all 0.2s ease-in-out 0s;
		text-decoration: underline;
	}
</style>
