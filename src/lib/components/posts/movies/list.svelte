<script lang="ts">
	import type { NormalizedBy } from '$lib/index.types';
	import type { Movie } from '$lib/repositories/directus/movies';
	import Card from './card.svelte';

	export interface Props {
		posts: NormalizedBy<'id', Movie>;
	}

	let container: HTMLElement;
	let { posts }: Props = $props();
</script>

<div class="container" bind:this={container}>
	{#each posts.ids as postId, index}
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
		// display: flex;
		// flex-wrap: wrap;
		// align-items: center;
		// justify-content: space-around;
		// padding: 2rem 0rem;
	}
	:global(.viewer-title) {
		font-size: 3rem;
	}
</style>
