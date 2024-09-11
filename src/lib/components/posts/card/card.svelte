<script lang="ts">
	import type { PoopPost } from '$lib/index.types';
	import Directus from '$lib/plugins/directus';
	import { createEventDispatcher } from 'svelte';
	export const directusClient = Directus();
	export let post: PoopPost;
	type CardType = 'top' | 'left' | 'right' | 'bottom';
	export const cardTypes: CardType[] = ['top', 'bottom', 'left', 'right'];
	export const cardType: CardType =
		cardTypes[Number(Number((Math.random() * 100) % (cardTypes.length - 1)).toFixed(0))];

	const dispatcher = createEventDispatcher();
	export function onCardClick() {
		dispatcher('click', { post });
	}
	export function parseDate(date: string) {
		return new Date(Date.parse(date))
			.toISOString()
			.replace(/T/, ' ')
			.replace(/:\d{2}\..+/, '');
	}
</script>

<button type="button" class={`card card-${cardType}`} on:click={onCardClick}>
	<div class="card-image">
		<img src={directusClient.getImageLink(post?.image || post?.header)} alt={post.title} />
	</div>
	<div class="card-text">
		<div class="card-text__title">{post.title}</div>
		<div class="card-text__info">{parseDate(post.date_created)}</div>
	</div>
</button>

<style lang="scss">
	$boxSpacing: 64px;
	$gridSize: 10rem;
	$cornerRadius: $gridSize/2.1;
	.card {
		cursor: pointer;
		display: flex;
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: $cornerRadius;
		box-shadow:
			rgb(128, 0, 128) 0px 0px 5px 0px,
			rgb(255, 192, 203) 0px 0px 5px 0px;
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
					rgb(128, 0, 128) -5px 5px,
					rgb(255, 192, 203) -10px 10px;
			}
		}

		&-right {
			flex-direction: row-reverse;
			grid-column: auto / span 2;
			grid-row: auto / span 1;
			&:hover {
				box-shadow:
					rgb(128, 0, 128) 5px 5px,
					rgb(255, 192, 203) 10px 10px;
			}
		}

		&-bottom {
			flex-direction: column-reverse;
			grid-column: auto / span 1;
			grid-row: auto / span 2;
			&:hover {
				box-shadow:
					rgb(128, 0, 128) 5px -5px,
					rgb(255, 192, 203) 10px -10px;
			}
		}
		&-left {
			flex-direction: row;
			grid-column: auto / span 2;
			grid-row: auto / span 1;
			&:hover {
				box-shadow:
					rgb(128, 0, 128) -5px -5px,
					rgb(255, 192, 203) -10px -10px;
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
			// padding: $boxSpacing;
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

		&-text p {
			margin: 0;
			line-height: 1.35em;
			color: #334455;
		}
	}
</style>
