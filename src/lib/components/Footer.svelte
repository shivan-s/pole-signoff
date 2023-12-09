<script>
	import Link from './Link.svelte';
</script>

<nav>
	<div>
		<Link rel="external" href="https://github.com/shivan-s/pole-signoff">Code</Link>
	</div>
</nav>

<style>
	nav {
		justify-content: center;
		display: flex;
		border-top: 3px solid var(--primary);
	}

	nav > * {
		display: flex;
		align-items: center;
		padding: 0 2rem 0 2rem;
		min-height: 4rem;
	}
</style>
