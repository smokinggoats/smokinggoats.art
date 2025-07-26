<script lang="ts">
	import Directus from '$lib/plugins/directus';
	import type { PoopPost } from '$lib/repositories/directus/poop';
	export const directusClient = Directus();
	export interface Props {
		post: PoopPost;
		onClick: (post: PoopPost) => void;
	}
	export type CardType = 'top' | 'left' | 'right' | 'bottom';

	const cardTypes: CardType[] = ['top', 'bottom', 'left', 'right'];
	const cardType: CardType =
		cardTypes[Number(Number((Math.random() * 100) % (cardTypes.length - 1)).toFixed(0))];

	const { post, onClick }: Props = $props();

	export function onCardClick() {
		onClick(post);
	}
	export function parseDate(date: string) {
		return new Date(Date.parse(date))
			.toISOString()
			.replace(/T/, ' ')
			.replace(/:\d{2}\..+/, '');
	}
</script>

<button type="button" class={`card card-${cardType}`} onclick={onCardClick}>
	<div class="card-image">
		{#if post?.image}
			<img
				id="image-{post.image}"
				loading="lazy"
				src={directusClient.getImageLink(post?.image)}
				alt={post.title}
				class="card-image__img"
			/>
		{/if}
	</div>
	<div class="card-text">
		<div class="card-text__title">{post.title}</div>
		<div class="card-text__info">{parseDate(post.date_created)}</div>
	</div>
</button>

<style lang="scss">
	:root {
		--bg-purple: rgb(128, 0, 128);
		--bg-purple-text: #fff;
		--bg-pink: rgb(255, 192, 203);
		--bg-pink-text: #333;
		--bg-black: #222;
		--text-grey: #666;
	}
	$boxShadow:
		var(--bg-purple) 0px 0px 5px 0px,
		var(--bg-pink) 0px 0px 1px 0px;
	$boxSpacing: 64px;
	$gridSize: 10rem;
	$cornerRadius: calc($gridSize/2.1);

	.card {
		cursor: pointer;
		display: flex;
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: $cornerRadius;
		box-shadow: $boxShadow;
		transition: all 0.3s ease;
		color: #fff;
		background-color: #555;

		&:hover {
			background-color: #fff;
			color: #000;
			transform: scale(1.1);
		}

		&-top {
			flex-direction: column;
			grid-column: auto / span 1;
			grid-row: auto / span 2;
			&:hover {
				box-shadow:
					var(--bg-purple) 5px 5px,
					var(--bg-pink) 10px 10px;
			}
		}

		&-right {
			flex-direction: row-reverse;
			grid-column: auto / span 2;
			grid-row: auto / span 1;
			&:hover {
				box-shadow:
					var(--bg-purple) -5px 5px,
					var(--bg-pink) -10px 10px;
			}
		}

		&-bottom {
			flex-direction: column-reverse;
			grid-column: auto / span 1;
			grid-row: auto / span 2;
			&:hover {
				box-shadow:
					var(--bg-purple) -5px -5px,
					var(--bg-pink) -10px -10px;
			}
		}
		&-left {
			flex-direction: row;
			grid-column: auto / span 2;
			grid-row: auto / span 1;
			&:hover {
				box-shadow:
					var(--bg-purple) 5px -5px,
					var(--bg-pink) 10px -10px;
			}
		}
		&-image {
			display: flex;
		}

		&-top &-image,
		&-bottom &-image {
			height: 50%;
			width: 100%;
		}

		&-left &-image,
		&-right &-image {
			height: 100%;
			width: 50%;
		}

		&-image img {
			width: 100%;
			object-fit: cover;
		}

		&-top img {
			border-radius: $cornerRadius $cornerRadius 0 0;
		}

		&-right img {
			border-radius: 0 $cornerRadius $cornerRadius 0;
		}

		&-bottom img {
			border-radius: 0 0 $cornerRadius $cornerRadius;
		}

		&-left img {
			border-radius: $cornerRadius 0 0 $cornerRadius;
		}

		&-text {
			align-self: center;
			padding: 1rem;
		}

		&-top &-text {
			height: auto;
			width: auto;
			padding-bottom: $boxSpacing * 1.6;
		}

		&-right &-text {
			height: auto;
			width: 50%;
			padding-left: $boxSpacing * 1.6;
		}

		&-bottom &-text {
			height: auto;
			width: auto;
			padding-top: $boxSpacing * 1.6;
		}

		&-left &-text {
			height: auto;
			width: 50%;
			padding-right: $boxSpacing * 1.6;
		}
	}
</style>
