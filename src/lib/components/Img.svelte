<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface $$Props extends HTMLImgAttributes {
		alt: HTMLImgAttributes['alt'];
	}

	export let alt: HTMLImgAttributes['alt'];
</script>

<img {...$$restProps} {alt} />
