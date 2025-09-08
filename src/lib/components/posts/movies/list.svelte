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

	:global(.viewer-title) {
		font-size: 3rem;
	}
</style>
