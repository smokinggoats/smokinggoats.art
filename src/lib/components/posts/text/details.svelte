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
				top: 4rem;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				background: rgb(238, 238, 238);
				background: linear-gradient(
					0deg,
					rgba(238, 238, 238, 1) 0%,
					rgba(221, 221, 221, 1) 99%,
					rgba(204, 204, 204, 0) 100%
				);
			}
			&__image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				z-index: -2;
			}
		}
		&__content {
			box-sizing: border-box;
			font-size: 1.4rem;
			line-height: 160%;
			max-width: 100rem;
			padding: 0 2rem;
		}
	}

	@media (min-width: 40em) {
		.post {
			&__header {
				&::after {
					background: rgb(238, 238, 238);
					background: linear-gradient(
						0deg,
						rgba(238, 238, 238, 1) 0%,
						rgba(221, 221, 221, 1) 95%,
						rgba(204, 204, 204, 0) 100%
					);
				}
			}
		}
	}
	@media (min-width: 120em) {
		.post {
			&__header {
				&::after {
					background: rgb(238, 238, 238);
					background: linear-gradient(
						0deg,
						rgba(238, 238, 238, 1) 0%,
						rgba(221, 221, 221, 1) 90%,
						rgba(204, 204, 204, 0) 100%
					);
				}
			}
		}
	}
</style>
