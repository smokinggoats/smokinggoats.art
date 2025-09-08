<script lang="ts">
	import type { NormalizedBy } from '$lib/index.types';
	import { type MovieParsed } from '$lib/repositories/directus/movies';
	import MovieCard from './card.svelte';
	import MovieConfig from './config.svelte';

	export interface Props {
		posts: NormalizedBy<'id', MovieParsed>;
		categories: {
			genre: string[];
			year: number[];
		};
	}

	let container: HTMLElement;
	let { posts, categories }: Props = $props();
	let renderIds: string[] = $state([]);
</script>

<div class="movie-total">
	<span>{renderIds.length} / {posts.ids.length}</span>
</div>
<div class="container" bind:this={container}>
	<MovieConfig {categories} {posts} onchange={(ids) => (renderIds = ids)} />
	{#each renderIds as postId}
		<MovieCard post={posts.byId[postId]} />
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

	.movie-total {
		width: 100%;
		text-align: center;
		& span {
			margin: auto;
			text-align: center;
			font-size: 0.8rem;
			border-radius: 2rem;
			padding: 0.5rem 1rem;
			background: rgba(128, 0, 128, 0.2);
			text-transform: uppercase;
			box-shadow:
				var(--bg-purple) 0px 0px 1px 0px,
				var(--bg-pink) 0px 0px 1px 0px;
		}
	}

	:global(.viewer-title) {
		font-size: 3rem;
	}
</style>
