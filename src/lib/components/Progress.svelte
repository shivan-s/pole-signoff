<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const progress = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});
	progress.set(1);
</script>

<div class="progress-bar">
	<div class="progress-sliver" style={`--width: ${$progress * 100}%`} />
</div>

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 50;
	}
	.progress-sliver {
		width: var(--width);
		background-color: var(--primary);
		height: 100%;
	}
</style>
