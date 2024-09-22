<script lang="ts">
</script>

<span class="loader" />

<style>
	.loader {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: var(--primary);
		box-shadow:
			2rem 0 var(--primary),
			-2rem 0 var(--primary);
		position: relative;
		animation: flash 0.5s ease-out infinite alternate;
	}

	@keyframes flash {
		0% {
			background-color: #fff2;
			box-shadow:
				32px 0 #fff2,
				-32px 0 var(--primary);
		}
		50% {
			background-color: var(--primary);
			box-shadow:
				32px 0 #fff2,
				-32px 0 #fff2;
		}
		100% {
			background-color: #fff2;
			box-shadow:
				32px 0 var(--primary),
				-32px 0 #fff2;
		}
	}
</style>
