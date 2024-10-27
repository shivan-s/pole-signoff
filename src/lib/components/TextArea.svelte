<script lang="ts">
	interface Props {
		[key: string]: any;
	}

	let { ...rest }: Props = $props();
	let content: string | null = $state(null);
</script>

<div contenteditable bind:innerHTML={content} {...rest}></div>
<input type="hidden" {...rest} value={content} />

<style>
	div {
		border: 0px;
		border-bottom: 0px solid var(--text);
		padding: 0.25rem 0.5rem;
		outline: 2px solid var(--primary);
		background-color: var(--bg);
		font-size: 0.875rem;
		min-height: 4rem;
	}
	div:focus {
		outline: 2px solid var(--text);
	}
	div:active {
		outline: 2px solid var(--text);
	}

	div:not(:focus):empty:before {
		content: attr(data-placeholder);
		color: var(--grey);
	}
</style>
