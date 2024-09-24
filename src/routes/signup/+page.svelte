<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import FormSet from '$lib/components/FormSet.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import A from '$lib/components/A.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { loading } from '$lib/stores';

	export let data: PageData;
	const { form, allErrors, errors, capture, restore, constraints, delayed, enhance } = superForm(
		data.form,
		{
			onSubmit: () => loading.set(true),
			onResult: () => loading.set(false),
			applyAction: false
		}
	);
	export const snapshot = {
		capture,
		restore
	};
</script>
