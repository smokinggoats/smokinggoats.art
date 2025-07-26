<script lang="ts">
	import type { PoopPost } from '$lib/index.types';
	import Directus from '$lib/plugins/directus';
	import Viewer from 'viewerjs';
	import Card from './card.svelte';
	export const directusClient = Directus();
	interface Props {
		posts?: PoopPost[];
	}

	let selectedPost: PoopPost | null = $state(null);
	let container: HTMLElement;
	let gallery: Viewer;
	let {
		posts = [],
		onCardClick: onCardClickHandler
	}: { posts: PoopPost[]; onCardClick?: (post: PoopPost) => void } = $props();
	$effect(() => {
		gallery = new Viewer(container, {
			// inline: true,
			title: (image: any) => {
				return image.alt;
			},
			navbar: true,
			focus: true,
			toolbar: true,
			transition: true,
			fullscreen: false,
			button: true,
			loop: true,
			backdrop: true
		});
	});
	export function onCardClick(post: PoopPost) {
		if (onCardClickHandler) onCardClickHandler(post);
		gallery.view(posts.findIndex((p) => post.id === p.id));
		gallery.toggle();
	}
</script>

<div class="container" bind:this={container}>
	{#each posts as post}
		<Card {post} onClick={onCardClick} />
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
	:global(.viewer-title) {
		font-size: 3rem;
	}
</style>
