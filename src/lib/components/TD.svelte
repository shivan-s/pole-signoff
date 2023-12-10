<script lang="ts">
	export let centered = false;
</script>

<td class:centered {...$$restProps}>
	<slot />
</td>

<style>
	td {
		word-wrap: break-word;
		border-right: 2px var(--primary) solid;
		padding: 1rem 0.5rem 1rem 0.5rem;
		width: 150px;
	}
	td:last-child {
		border-right: none;
	}

	.centered {
		text-align: center;
	}
</style>
