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
			backdrop: true,
			className: imageNode.className
		});
	});
</script>

<div class="post">
	<div class="post__content">
		<div class="post__content__title">{post.title}</div>
		{#if post.content}
			<div class="post__content__text">
				{@html post.content}
			</div>
		{/if}
	</div>
	{#if post.image?.filename_disk}
		<img
			bind:this={imageNode}
			class="post__image"
			style="display:none"
			src={directusClient.getImageLink(post.image.id)}
			alt={post.description}
		/>
	{/if}
</div>

<style lang="scss">
	.post {
		box-sizing: border-box;
		padding: 0;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		&__image {
			position: relative;
			justify-self: stretch;
		}
		&__content {
			box-shadow:
				rgb(128, 0, 128) 0px 0px 10px 0px,
				rgb(255, 192, 203) 0px 0px 10px 0px;
			box-sizing: border-box;
			padding: 1.6rem;
			min-height: 30%;
			max-height: 30%;
			overflow: auto;
			line-height: 2em;
			&__title {
				font-size: 2em;
				padding: 1em 0;
			}
			&__text {
				p {
					text-indent: 2em;
				}
			}
		}
	}

	@media (min-width: 60em) {
		.post {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			&__image {
				min-width: 50%;
				justify-self: stretch;
			}
			&__content {
				height: 100%;
				min-width: 30%;
				max-width: 40rem;
				max-height: 100%;
			}
		}
	}
</style>
