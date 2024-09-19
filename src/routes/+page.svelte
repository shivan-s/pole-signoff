<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table>
	<thead>
		<tr><th>User</th></tr>
	</thead>
	<tbody>
		{#each data.users as user}
			<tr>
				<td>
					{user.username}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
