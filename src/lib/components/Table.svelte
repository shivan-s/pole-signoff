<div class="container">
	<table {...$$restProps}>
		<slot />
	</table>
</div>

<style>
	table {
		table-layout: auto;
		min-width: 100%;
		border-collapse: collapse;
		color: var(--text);
	}
	.container {
		max-width: 1280px;
		border: 2px var(--primary) solid;
		border-radius: 15px;
	}
</style>
