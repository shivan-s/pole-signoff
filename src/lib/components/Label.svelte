<label {...$$restProps}>
	<slot />
</label>

<style>
	label {
		display: grid;
		color: var(--grey);
		grid-template-rows: 1fr;
		grid-template-rows: auto;
		gap: 0.5rem;
	}
</style>
