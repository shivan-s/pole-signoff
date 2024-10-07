<label {...$$restProps}>
	<slot />
</label>

<style>
	label {
		display: grid;
		color: var(--grey);
		align-items: center;
		grid-template-rows: 1fr;
		gap: 0.5rem;
	}
</style>
