<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { NormalizedBy } from '$lib/index.types';
	import type { PoopPost } from '$lib/repositories/directus/poop';
	import { onDestroy, onMount } from 'svelte';
	import Viewer from 'viewerjs';
	import Card from './card.svelte';

	export interface Props {
		posts: NormalizedBy<'id', PoopPost>;
		onCardClick?: (post: PoopPost) => void;
	}

	export function safeParseInt(val: string | number | null | undefined = undefined) {
		try {
			if (typeof val === 'string') {
				return parseInt(val);
			}
			return val;
		} catch (error) {
			return undefined;
		}
	}

	let container: HTMLElement;
	let gallery: Viewer;
	let selectedPost: PoopPost | undefined | null = $state(null);
	let { posts, onCardClick: onCardClickHandler }: Props = $props();
	const urlSelectedKey = 'selected';
	const urlSelectedPostId = $derived<number | null | undefined>(
		safeParseInt(page.url.searchParams.get(urlSelectedKey))
	);

	function updateURLPath(sp: PoopPost | undefined = undefined) {
		if (sp) {
			page.url.searchParams.set(urlSelectedKey, `${sp.id}`);
		} else {
			page.url.searchParams.delete(urlSelectedKey);
		}
		goto(page.url.toString());
	}

	function updateSelectedPost(post: PoopPost | null | undefined = undefined) {
		selectedPost = post;
	}

	function updateGallery(index: number) {
		gallery.view(index);
		gallery.toggle();
	}

	function onCardClick(post: PoopPost, index: number) {
		if (onCardClickHandler) onCardClickHandler(post);
		updateSelectedPost(post);
		updateGallery(index);
		updateURLPath(post);
	}

	function initGallery(container: HTMLElement) {
		gallery = new Viewer(container, {
			// inline: true,
			title: (image: any) => {
				return image.alt;
			},
			navbar: true,
			focus: true,
			toolbar: false,
			transition: true,
			fullscreen: false,
			button: true,
			loop: true,
			backdrop: true,
			view(event) {},
			hide() {
				updateSelectedPost();
				updateURLPath();
			}
		});
	}

	function destroyGallery() {
		gallery?.destroy();
		gallery?.exit();
		gallery?.stop();
	}

	onMount(() => {
		initGallery(container);
		if (urlSelectedPostId) {
			const pIndex = posts.ids.indexOf(urlSelectedPostId);
			if (pIndex) {
				onCardClick(posts.byId[urlSelectedPostId], pIndex);
			}
		}
	});

	onDestroy(() => {
		console.log('unmount');
		destroyGallery();
	});
</script>

<div class="container" bind:this={container}>
	{#each posts.ids as postId, index}
		<Card post={posts.byId[postId]} onClick={(post) => onCardClick(post, index)} />
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
