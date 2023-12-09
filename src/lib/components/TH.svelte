<th {...$$restProps}><slot /></th>

<style>
	th {
		padding: 2rem 0.5rem 2rem 0.5rem;
		border-bottom: 2px var(--primary) solid;
		color: var(--primary);
	}
	th:last-child {
		border-right: none;
	}
</style>
