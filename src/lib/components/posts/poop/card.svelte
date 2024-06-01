<script lang="ts">
	import { goto } from '$app/navigation';
	import { type PoopPost } from '$lib';
	import Directus from '$lib/plugins/directus';
	import { ROUTES } from '$lib/utils/constants';
	import Icon from '@iconify/svelte';
	export const directusClient = Directus();
	export let post: PoopPost;
	function goToPost() {
		goto(ROUTES.ccpoopId(post.id));
	}
</script>

<button class="card" on:click={goToPost}>
	<div class="card__image">
		<img
			class="card__image__image"
			src={directusClient.getImageLink(post.image)}
			alt={post.description}
		/>
	</div>
	<div class="card__content">
		<div class="card__content__title">{post.title}</div>
		<a class="card__content__link" href={ROUTES.ccpoopId(post.id)}>
			<Icon class="card__content__link__icon" icon="solar:link-bold" />
		</a>
	</div>
</button>

<style lang="scss">
	.card {
		border: none;
		display: flex;
		flex-direction: column;
		width: 20rem;
		height: 20rem;
		padding: 0;
		margin: 0.5rem;
		background-color: #fff;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow:
			0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
		transition: all 0.1s ease-in-out;
		&:hover {
			background-color: #fff;
			box-shadow:
				0 16px 40px rgba(0, 0, 0, 0.19),
				0 12px 12px rgba(0, 0, 0, 0.23);
			cursor: pointer;
		}
		&__image {
			max-width: 100%;
			height: 80%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-around;
			img {
				max-width: 120%;
			}
		}
		&__content {
			height: 20%;
			display: flex;
			align-items: center;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem;
			max-width: 100%;
			&__title {
			}
			&__link {
				box-sizing: border-box;
				padding: 0.1rem;
				line-height: 2rem;
				text-align: center;
				background-color: #333;
				border-radius: 50%;
				width: 2rem;
				height: 2rem;
				color: #fff;
				&__icon {
					color: #fff;
				}
			}
		}
	}
</style>
