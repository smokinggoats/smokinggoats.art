<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { PoopPost } from '$lib/index.types';
	import { onMount } from 'svelte';
	import Viewer from 'viewerjs';
	import Card from './card.svelte';

	interface Props {
		posts?: PoopPost[];
	}

	let container: HTMLElement;
	let gallery: Viewer;
	let {
		posts = [],
		onCardClick: onCardClickHandler
	}: { posts: PoopPost[]; onCardClick?: (post: PoopPost) => void } = $props();
	let selectedPost: PoopPost | null = $state(null);
	function updateSelected(sp: PoopPost | undefined = undefined) {
		if (sp) {
			page.url.searchParams.set('selected', `${sp.id}`);
		} else {
			page.url.searchParams.delete('selected');
		}
		goto(page.url.toString());
	}

	export function onCardClick(post: PoopPost) {
		if (onCardClickHandler) onCardClickHandler(post);
		updateSelected(post);
		gallery.view(posts.findIndex((p) => post.id === p.id));
		gallery.toggle();
	}
	onMount(() => {
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
			backdrop: true,
			hide() {
				updateSelected();
			}
		});
		const preSelected = page.url.searchParams.get('selected');
		if (preSelected) {
			const p = posts.find((el) => `${el.id}` === preSelected);
			if (p) {
				selectedPost = p;
				onCardClick(p);
			}
		}
	});
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
