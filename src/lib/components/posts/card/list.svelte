<script lang="ts">
	import type { PoopPost } from '$lib/index.types';
	import { createEventDispatcher } from 'svelte';
	import Card from './card.svelte';
	import { eachWeekOfInterval } from 'date-fns';

	export let posts: PoopPost[] = [];
	const dispatcher = createEventDispatcher();
	export function onCardClick(e: CustomEvent<{ post: PoopPost }>) {
		const {
			detail: { post }
		} = e;
		dispatcher('cardClick', { post });
	}
</script>

<div class="container">
	{#each posts as post}
		<Card {post} on:click={onCardClick} />
	{/each}
</div>

<style lang="scss">
	$boxSpacing: 64px;
	$gridSize: 10em;
	$cornerRadius: calc($gridSize/2.1);

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax($gridSize, $gridSize));
		grid-auto-rows: $gridSize;
		grid-auto-flow: row dense;
		grid-gap: $boxSpacing;
		justify-content: center;
	}
</style>
