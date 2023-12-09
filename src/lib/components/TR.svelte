<tr {...$$restProps}><slot /></tr>

<style>
	tr {
		border-bottom: 2px var(--primary) solid;
	}
	tr:hover {
		color: var(--accent);
	}
	tr:last-child {
		border-bottom: none;
	}
</style>
