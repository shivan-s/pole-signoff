<script lang="ts">
	export let centered = false;
</script>

<th class:centered {...$$restProps}><slot /></th>

<style>
	th {
		font-size: 1.25rem;
		text-align: left;
		padding: 2rem 0.5rem 2rem 0.5rem;
		border-bottom: 2px var(--primary) solid;
		border-right: 2px var(--primary) solid;
		color: var(--primary);
	}
	th:last-child {
		border-right: none;
	}
	.centered {
		text-align: center;
	}
</style>
