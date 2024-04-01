<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<main in:fade={{ easing: cubicInOut }}>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: auto;
		margin-left: auto;
		margin-bottom: 50dvh;
		gap: 3rem;
		padding: 1rem 0rem;
		flex-grow: 1;
		z-index: 0;
	}

	/* Extra small devices (phones, 600px and down) */
	@media only screen and (max-width: 600px) {
		main {
			min-width: 320px;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (min-width: 600px) {
		main {
			min-width: 480px;
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		main {
			min-width: 600px;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		main {
			min-width: 768px;
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Extra large devices (large laptops and desktops, 1200px and up) */
	@media only screen and (min-width: 1200px) {
		main {
			min-width: 922px;
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
