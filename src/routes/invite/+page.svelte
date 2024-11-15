<script lang="ts">
	import UL from '$lib/components/UL.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
</script>

<UL>
	{#each data.inviteCodes as inviteCode}
		<li>
			{inviteCode.createdAt}
			{inviteCode.code}
			{inviteCode.receiverId}
		</li>
	{/each}
</UL>
