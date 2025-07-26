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
	let selectedPost: PoopPost | undefined | null = $state(null);
	function updateSelected(sp: PoopPost | undefined = undefined) {
		if (sp) {
			page.url.searchParams.set('selected', `${sp.id}`);
		} else {
			page.url.searchParams.delete('selected');
		}
		goto(page.url.toString());
	}

	export function onCardClick(index: number) {
		const post: PoopPost = posts && posts[index];
		if (onCardClickHandler) onCardClickHandler(post);
		selectedPost = post;
		updateSelected(post);
		gallery.view(posts.findIndex((p) => post.id === p.id));
		gallery.toggle();
	}
	let audioPlayer: HTMLElement | null = $state(null);
	let isPaused = $state(true);

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
			view(event) {
				console.log('start audio');
			},
			hide() {
				updateSelected();
			}
		});
		const preSelected = page.url.searchParams.get('selected');
		if (preSelected) {
			const p = posts.findIndex((el) => `${el.id}` === preSelected);
			if (p) {
				onCardClick(p);
			}
		}
	});
</script>

<div class="audio">
	<div class={['audio__src', !isPaused && 'audio__src--play']}>
		<audio
			class="audio__src__audio"
			controls
			autoplay
			loop
			onplay={() => (isPaused = false)}
			onpause={() => (isPaused = true)}
			bind:this={audioPlayer}
			src="https://directus.smokinggoats.art/assets/4c1c1822-a761-4a2f-876d-4c64e12917e1.flac?format=mp3"
		>
		</audio>
	</div>
</div>
<div class="container" bind:this={container}>
	{#each posts as post, index}
		<Card {post} onClick={() => onCardClick(index)} />
	{/each}
</div>

<style lang="scss">
	$boxSpacing: 64px;
	$gridSize: 10em;
	$cornerRadius: calc($gridSize/2.1);

	.audio {
		box-sizing: border-box;
		width: 100%;
		margin: 2rem auto 4rem auto;
		padding: 0 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		&__src {
			position: relative;
			&::after {
				position: absolute;
				transition: all ease 1s;
				content: '';
				top: 0;
				left: 0;
				right: 0;
				height: 100%;
				width: 100%;
				transform: translateZ(0);
				filter: blur(0px);
				background: linear-gradient(
					to left,
					#ff5770,
					#e4428d,
					#c42da8,
					#9e16c3,
					#6501de,
					#9e16c3,
					#c42da8,
					#e4428d,
					#ff5770
				);
				background-size: 100% 100%;
				z-index: 2;
			}
			&:hover {
				&::after {
					position: absolute;
					transition: all ease 1s;
					content: '';
					top: 0;
					left: 0;
					right: 0;
					height: 100%;
					width: 100%;
					transform: translateZ(0);
					filter: blur(15px);
					background: linear-gradient(
						to left,
						#ff5770,
						#e4428d,
						#c42da8,
						#9e16c3,
						#6501de,
						#9e16c3,
						#c42da8,
						#e4428d,
						#ff5770
					);
					background-size: 200% 200%;
					z-index: 1;
				}
			}
			&--play {
				&::after {
					position: absolute;
					transition: all ease 1s;
					content: '';
					top: 0;
					left: 0;
					right: 0;
					height: 100%;
					width: 100%;
					transform: translateZ(0);
					filter: blur(15px);
					background: linear-gradient(
						to left,
						#ff5770,
						#e4428d,
						#c42da8,
						#9e16c3,
						#6501de,
						#9e16c3,
						#c42da8,
						#e4428d,
						#ff5770
					);
					background-size: 200% 200%;
					animation: animateGlow 2s linear infinite reverse;
					z-index: 1;
				}
			}

			&__audio {
				position: relative;
				z-index: 3;
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
	}

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
