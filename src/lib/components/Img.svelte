<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLImgAttributes {
		alt: HTMLImgAttributes['alt'];
	}

	export let alt: HTMLImgAttributes['alt'];
</script>

<img {...$$restProps} {alt} />
