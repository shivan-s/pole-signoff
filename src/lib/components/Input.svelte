<input {...$$restProps} />

<style>
	input {
		border: 0px;
		border-bottom: 0px solid var(--text);
		padding: 0.25rem 0.5rem;
		outline: 2px solid var(--primary);
		background-color: var(--bg);
	}
	input:user-invalid {
		outline: 2px solid var(--danger);
		box-shadow: 0rem 0rem 0.5rem 3px var(--danger);
	}
	input:user-valid {
		outline: 2px solid var(--success);
		box-shadow: 0rem 0rem 0.5rem 3px var(--success);
	}
	input:focus {
		outline: 2px solid var(--text);
	}
</style>
