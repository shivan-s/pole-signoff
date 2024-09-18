<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Img from '$lib/components/Img.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import shivanLogo from '$lib/assets/img/Shivan-Logo-Black.png';
	const LOVE = '💓';
</script>

<nav>
	<span>
		<span>Made with <abbr title="LOVE">{LOVE}</abbr> by</span>
		<a rel="external" href="https://shivan.xyz"
			><Img alt="Shivan" title="Shivan" src={shivanLogo} style="width: 2rem; height: 2rem" /></a
		>
	</span>
	<a rel="external" title="Source code on GitHub" href="https://github.com/shivan-s/pole-signoff">
		<GitHub width="2rem" height="2rem" />
		<span>Code</span>
	</a>
</nav>

<style>
	nav {
		justify-content: space-around;
		align-items: center;
		display: flex;
		border-top: 3px solid var(--primary);
		height: 100%;
	}

	nav > * {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
