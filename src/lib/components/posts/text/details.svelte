<script lang="ts">
	import type { TextPostDetails } from '$lib';
	import Directus from '$lib/plugins/directus';
	export const directusClient = Directus();
	export let post: TextPostDetails;
</script>

<div class="post">
	<div class="post__header">
		<img
			class="post__header__image"
			src={directusClient.getImageLink(post.header?.filename_disk || '')}
			alt={post.title}
		/>
	</div>
	{#if post.content}
		<div class="post__content">
			{@html post.content}
		</div>
	{/if}
</div>

<style lang="scss">
	:global(.post__content hr) {
		margin: 1.6rem 0;
	}
	:global(.post__content pre) {
		margin: 2rem 0;
		padding: 0;
		max-width: 100%;
		font-size: 0.8em;
		line-break: normal;
		white-space: normal;
	}
	:global(.post__content p) {
		font-size: 1em;
		text-indent: 2em;
		text-align: justify;
	}
	.post {
		box-sizing: border-box;
		padding: 32rem 2rem 2rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: relative;
		&__header {
			&::after {
				content: attr(data-descr);
				position: absolute;
				top: 0rem;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				background: rgba(21, 21, 21, 1);
				background: linear-gradient(
					180deg,
					rgba(238, 238, 238, 0.8) 0%,
					rgba(21, 21, 21, 0.8) 5%,
					rgba(21, 21, 21, 1) 100%
				);
			}
			&__image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 0;
			}
		}
		&__content {
			z-index: 10;
			box-sizing: border-box;
			font-size: 1.4rem;
			line-height: 160%;
			max-width: 100%;
			padding: 0 2rem;
		}
	}

	// @media (min-width: 40em) {
	// 	.post {
	// 		&__header {
	// 			&::after {
	// 				background: rgb(238, 238, 238);
	// 				background: linear-gradient(
	// 					0deg,
	// 					rgba(238, 238, 238, 1) 0%,
	// 					rgba(221, 221, 221, 1) 95%,
	// 					rgba(204, 204, 204, 0) 100%
	// 				);
	// 			}
	// 		}
	// 	}
	// }
	// @media (min-width: 80em) {
	// 	.post {
	// 		&__content {
	// 			max-width: 50rem;
	// 		}
	// 	}
	// }
	// @media (min-width: 120em) {
	// 	.post {
	// 		&__content {
	// 			max-width: 80rem;
	// 		}
	// 		&__header {
	// 			&::after {
	// 				background: rgb(238, 238, 238);
	// 				background: linear-gradient(
	// 					0deg,
	// 					rgba(238, 238, 238, 1) 0%,
	// 					rgba(221, 221, 221, 1) 90%,
	// 					rgba(204, 204, 204, 0) 100%
	// 				);
	// 			}
	// 		}
	// }
	// }
</style>
