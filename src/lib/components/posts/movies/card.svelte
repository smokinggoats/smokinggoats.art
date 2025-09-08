<script lang="ts">
	import Directus from '$lib/plugins/directus';
	import type { Movie, MovieParsed } from '$lib/repositories/directus/movies';
	import Icon from '@iconify/svelte';
	export const directusClient = Directus();
	export interface Props {
		post: MovieParsed;
		onClick?: (post: Movie) => void;
	}
	export type CardType = 'top' | 'bottom';

	const cardTypes: CardType[] = ['top', 'bottom'];
	const cardType: CardType =
		cardTypes[Number(Number((Math.random() * 100) % (cardTypes.length - 1)).toFixed(0))];

	const { post, onClick }: Props = $props();

	export function onCardClick() {
		onClick && onClick(post);
		window.open(`https://imdb.com/title/${post.imdb_id}`, '_blank');
	}
	export function parseDate(date: string) {
		return new Date(Date.parse(date)).toISOString().replace(/T.+/, '');
	}
</script>

<button type="button" class={`card card-${cardType}`} onclick={onCardClick}>
	<div class="card-image">
		{#if post?.poster_image}
			<img
				id="image-{post.poster_image}"
				loading="lazy"
				src={directusClient.getImageLink(post?.poster_image)}
				alt="-"
				class="card-image__img"
			/>
		{/if}
	</div>
	<div class="card-text">
		<div class="card-text__title">{post.title}</div>
		<div class="card-text__info">{post.last_watched ? parseDate(post.last_watched) : '-'}</div>
		<div class="card-text__info">
			<span>{post.personal_rating || '-'}</span>
			<Icon icon="solar:stars-minimalistic-line-duotone" width=".8rem" />
		</div>
	</div>
	<div class="card__details">
		<div class="card__details__year">
			<span class="card__details__year__tag">{post.year}</span>
		</div>
		<div class="card__details__dir">
			<div>DIRECTION:</div>
			<ul>
				{#each post.director as a}
					<li class="">{a}</li>
				{/each}
			</ul>
		</div>
		<hr />
		<div class="card__details__cast">
			<div>CAST:</div>
			<ul>
				{#each post.actors as a}
					<li class="">{a}</li>
				{/each}
			</ul>
		</div>
		<div class="card__details__genre">
			{#each Object.keys(post.genre) as a}
				<span class="card__details__genre__tag">{a}</span>
			{/each}
		</div>
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
		z-index: 0;
		cursor: pointer;
		display: flex;
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
		border-radius: $cornerRadius;
		box-shadow: $boxShadow;
		transition: all 0.3s ease;
		color: #fff;
		background-color: #555;
		position: relative;
		transition: all 0.3s ease 0.3s;

		&-text {
			&__info {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 2rem;
				vertical-align: middle;
				span {
					margin-right: 0.1rem;
				}
			}
		}

		&__details {
			font-size: 0.8rem;

			position: absolute;
			transition: all 0.3s ease 0.32s;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0;
			border-radius: $cornerRadius;
			background-color: #555;
			z-index: 1000;
			box-shadow: $boxShadow;
			color: #fff;
			padding: 4rem 1rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: stretch;

			& hr {
				width: 100%;
				border-color: var(--bg-purple);
				background-color: var(--bg-purple);
				box-shadow:
					var(--bg-purple) 0px 0px 1px 0px,
					var(--bg-pink) 0px 0px 1px 0px;
				border-radius: 1px;
				border-width: 1px;
				height: 0;
			}
			&__dir,
			&__cast {
				text-align: left;
				& ul {
					margin-top: 0;
					padding-left: 1rem;
				}
			}
			&__genre {
				transition: all 0.3s ease 0.32s;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				opacity: 0;
				padding: 2rem 1rem;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: left;
				justify-content: space-between;
				&__tag {
					font-size: 0.8rem;
					margin: 0.1rem;
					border-radius: 2rem;
					padding: 0.5rem;
					background: var(--bg-purple);
					text-transform: uppercase;
					box-shadow:
						var(--bg-purple) 0px 0px 1px 0px,
						var(--bg-pink) 0px 0px 10px 0px;
				}
			}
			&__year {
				position: absolute;
				top: 2rem;
				left: 50%;
				transform: translateX(-50%);
				&__tag {
					font-size: 0.8rem;
					margin: 0.1rem;
					border-radius: 2rem;
					padding: 0.5rem 1rem;
					background: rgba(128, 0, 128, 0.2);
					text-transform: uppercase;
					box-shadow:
						var(--bg-purple) 0px 0px 1px 0px,
						var(--bg-pink) 0px 0px 10px 0px;
				}
			}
		}
		&:hover {
			z-index: 1000;
			background-color: #fff;
			color: #000;
			transform: scale(1.1);
		}

		&-top {
			flex-direction: column;
			grid-column: auto / span 1;
			grid-row: auto / span 2;
			&:hover {
				transform: rotate(10deg);
				transform-origin: 0% 40%;
				margin: 0 5rem;
				box-shadow:
					var(--bg-purple) 5px 5px,
					var(--bg-pink) 10px 10px;

				& .card__details {
					transform: rotate(-20deg);
					transform-origin: 100% 50%;
					opacity: 1;
					left: -10rem;
					right: 10rem;

					&__genre {
						transform: rotate(20deg);
						transform-origin: 0% 50%;
						opacity: 1;
						left: 10rem;
						right: -10rem;
					}
				}
			}
		}

		&-bottom {
			flex-direction: column-reverse;
			grid-column: auto / span 1;
			grid-row: auto / span 2;
			&:hover {
				transform-origin: 0% 40%;
				transform: rotate(-10deg);
				margin: 0 -5rem;
				box-shadow:
					var(--bg-purple) -5px -5px,
					var(--bg-pink) -10px -10px;
				& .card__details {
					transform: rotate(20deg);
					transform-origin: 0% 50%;
					opacity: 1;
					left: 10rem;
					right: -10rem;

					&__genre {
						transform: rotate(-20deg);
						transform-origin: 100% 50%;
						opacity: 1;
						left: -10rem;
						right: 10rem;
					}
				}
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

		&-image img {
			width: 100%;
			object-fit: cover;
		}

		&-top img {
			border-radius: $cornerRadius $cornerRadius 0 0;
		}

		&-bottom img {
			border-radius: 0 0 $cornerRadius $cornerRadius;
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

		&-bottom &-text {
			height: auto;
			width: auto;
			padding-top: $boxSpacing * 1.6;
		}
	}
</style>
