<script lang="ts">
	import type { PoopPostDetails } from '$lib';
	import Directus from '$lib/plugins/directus';
	export const directusClient = Directus();
	export let post: PoopPostDetails;
</script>

<div class="post">
	{#if post.image?.filename_disk}
		<img
			class="post__image"
			src={directusClient.getImageLink(post.image.filename_disk)}
			alt={post.description}
		/>
	{/if}
	{#if post.content}
		<div class="post__content">
			{@html post.content}
		</div>
	{/if}
</div>

<style lang="scss">
	.post {
		box-sizing: border-box;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		&__image {
			max-width: 80rem;
		}
		&__content {
			max-width: 80rem;
		}
	}
</style>
