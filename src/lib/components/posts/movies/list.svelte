<script lang="ts">
	import type { NormalizedBy } from '$lib/index.types';
	import type { Movie, MovieParsed } from '$lib/repositories/directus/movies';
	import Icon from '@iconify/svelte';
	import Card from './card.svelte';

	export interface Props {
		posts: NormalizedBy<'id', MovieParsed>;
		categories: Record<string, string>;
	}

	function shouldRenderCardCategory(post: MovieParsed) {
		return selectedCategories.some((c) => !!post.genre[c]);
	}

	function shouldRenderCardTitle(post: MovieParsed) {
		return post.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase());
	}

	let container: HTMLElement;
	let { posts, categories }: Props = $props();
	let selectedCategories = $state([]);
	let titleFilter = $state('');
	const renderIds = $derived(
		(posts?.ids || []).filter((id) => {
			const p = posts.byId[id];
			if (!p) return false;

			let c = true;
			if (selectedCategories.length > 0) {
				c = shouldRenderCardCategory(p);
			}
			let t = true;
			if (titleFilter.length > 0) {
				t = shouldRenderCardTitle(p);
			}
			return c && t;
		})
	);
</script>

<div class="container" bind:this={container}>
	<div class="movie-menu">
		<div class="movie-menu__background"></div>
		<div class="movie-menu__container">
			<div class="movie-menu__field">
				<label for="titleFilter">Title:</label>
				<input id="titleFilter" type="input" bind:value={titleFilter} />
			</div>
			<div class="movie-menu__field">
				<label for="categorySelect">Category:</label>
				<select id="categorySelect" multiple bind:value={selectedCategories}>
					{#each Object.keys(categories) as cat}
						<option value={cat}>{cat}</option>
					{/each}
				</select>
			</div>
			<div class="movie-menu__action">
				<Icon icon="solar:settings-line-duotone" width="1.2rem" />
			</div>
		</div>
	</div>
	{#each renderIds as postId}
		<Card post={posts.byId[postId]} />
	{/each}
</div>

<style lang="scss">
	$boxSpacing: 8rem;
	$gridSize: 10em;
	$cornerRadius: calc($gridSize/2.1);
	.container {
		z-index: 0;
		padding: 2rem 6rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax($gridSize, $gridSize));
		grid-auto-rows: $gridSize;
		grid-auto-flow: row dense;
		grid-gap: $boxSpacing;
		justify-content: center;
	}

	.movie-menu {
		position: fixed;
		bottom: 4rem;
		left: -24rem;
		max-height: 30vh;
		width: 24rem;
		background: rgba(21, 0, 21, 0.75);
		z-index: 2016;
		display: flex;
		flex-direction: column;
		transition: all 0.7s 0.2s ease;
		border-top-right-radius: 2rem;

		&__background {
			position: absolute;
			border-top-right-radius: 2rem;
			transition: all ease 1s;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			filter: blur(0px);
			background: linear-gradient(
				to left,
				#730077,
				#800080,
				#a737a5,
				#d05fcc,
				#f759ef,
				#f759ef,
				#d05fcc,
				#a737a5,
				#800080,
				#730077
			);
			background-size: 100% 100%;
			transition: all 1s ease;
			z-index: 0;
		}
		&:hover {
			left: 0rem;
			border-bottom-right-radius: 2rem;
			.movie-menu__background {
				border-bottom-right-radius: 2rem;
				transition:
					all ease 1s 0.7s,
					border-radius .2s ease;
				filter: blur(.5rem);
				background-size: 200% 200%;
				animation: animateGlow 5s linear infinite reverse;
				z-index: 1;
			}
			.movie-menu__action {
				opacity: 0;
			}
			.movie-menu__container {
				border-bottom-right-radius: 2rem;
			}
			@keyframes animateGlow {
				0% {
					background-position: 0% 50%;
				}
				100% {
					background-position: 200% 50%;
				}
			}
		}

		&__container {
			border-top-right-radius: 2rem;
			background-color: rgba(21, 21, 21, 0.7);
			transition: all 0.7s 0.2s ease;
			z-index: 1;
			box-sizing: border-box;
			padding: 1rem 2rem 2rem 2rem;
			margin: 0;
			display: flex;
			height: 100%;
			width: 100%;
			flex-direction: column;
			overflow-y: auto;
		}
		&__action {
			opacity: 1;
			transition: all 0.3s 0.2s ease;
			position: absolute;
			bottom: 0;
			right: -2.3rem;
			background: rgba(115, 0, 119, 0.5);
			height: 2rem;
			width: 2rem;
			border-radius: 0 2rem 2rem 0;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-right: 0.3rem;
		}
		&__field {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			label {
				text-transform: uppercase;
				font-size: 0.7rem;
				margin: 0.5rem 0;
			}
			select,
			input {
				width: 100%;
			}
		}
	}

	:global(.viewer-title) {
		font-size: 3rem;
	}
</style>
