<script lang="ts">
	import type { PoopPostDetails } from '$lib';
	import Directus from '$lib/plugins/directus';
	import { onMount } from 'svelte';
	import Viewer from 'viewerjs';
	export const directusClient = Directus();
	export let post: PoopPostDetails;

	export let imageNode: HTMLElement;
	export let imageView;

	onMount(() => {
		imageView = new Viewer(imageNode, {
			inline: true,
			navbar: false,
			focus: true,
			toolbar: false,
			transition: false,
			fullscreen: true,
			backdrop: true
		});
	});
</script>

<div class="post">
	{#if post.image?.filename_disk}
		<img
			bind:this={imageNode}
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
		height: 100%;
		&__image {
			opacity: 0;
			display: none;
		}
	}
</style>
