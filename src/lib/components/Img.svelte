<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	interface Props {
		alt: HTMLImgAttributes['alt'];
		[key: string]: any;
	}

	let { alt, ...rest }: Props = $props();
</script>

<img {...rest} {alt} />
