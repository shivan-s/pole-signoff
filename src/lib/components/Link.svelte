<script lang="ts">
	export let href = '';
</script>

<a {href} {...$$restProps}><slot /></a>

<style>
	a {
		color: var(--primary);
		text-decoration: underline;
	}

	a:hover {
		color: var(--accent);
		text-decoration: none;
	}

	a:active {
		text-decoration: underline;
	}
</style>
