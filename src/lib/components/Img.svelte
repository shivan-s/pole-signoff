<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {}
	let { alt, ...rest }: Props = $props();
</script>

<img {...rest} {alt} />
