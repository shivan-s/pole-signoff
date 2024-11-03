<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends HTMLInputAttributes {}
	let { value = $bindable(), type, ...rest }: Props = $props();
</script>

{#if type === 'checkbox'}
	<span><input type="checkbox" bind:value {...rest} /></span>
{:else}
	<span><input bind:value {...rest} /></span>
{/if}

<style>
	input {
		width: 100%;
		border: 0px;
		border-bottom: 0px solid var(--text);
		padding: 0.5rem;
		outline: 2px solid var(--primary);
		background-color: var(--bg);
	}
	input:user-invalid {
		outline: 2px solid var(--danger);
		box-shadow: 0rem 0rem 0.5rem 3px var(--danger);
	}
	span:has(input:user-invalid)::after {
		position: absolute;
		transform: translate(-150%, 25%);
		content: '✘';
		color: var(--danger);
	}
	input:user-valid {
		outline: 2px solid var(--success);
		box-shadow: 0rem 0rem 0.5rem 3px var(--success);
	}
	span:has(input:user-valid)::after {
		position: absolute;
		transform: translate(-150%, 50%);
		content: '✔';
		color: var(--success);
	}
	input:focus {
		outline: 2px solid var(--text);
	}
</style>
