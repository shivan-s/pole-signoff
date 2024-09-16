<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
</script>

<main in:fade={{ easing: cubicInOut }}>
	<slot />
</main>

<style>
	main {
		width: 100%;
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
	@media only screen and (max-width: calc(var(--width-small))) {
		main {
			min-width: (--width-tiny);
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (min-width: calc(var(--width-small))) {
		main {
			min-width: var(--width-smallest);
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: calc(var(--width-medium))) {
		main {
			min-width: var(--width-small);
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: calc(var(--width-large))) {
		main {
			min-width: var(--width-medium);
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Extra large devices (large laptops and desktops, 1200px and up) */
	@media only screen and (min-width: calc(var(--width-largest))) {
		main {
			min-width: var(--width-large);
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
