<script lang="ts">
	import type { Soundtrack } from '$lib/utils/constants';

	let isPaused = $state(true);
	let audioPlayer: HTMLAudioElement | null | undefined = $state();
	let volume = $state(1.0);
	let muted = $state(false);
	const volumeClass = $derived(muted ? '0' : (volume * 100).toFixed(0));
	const { soundtrack }: { soundtrack: Soundtrack | undefined | null } = $props();
</script>

{#if soundtrack && soundtrack.src?.length}
	<div class="soundtrack">
		<div
			class="soundtrack__background soundtrack__background--vol-{volumeClass}"
			class:soundtrack__background--play={!isPaused}
		></div>
		<audio
			bind:muted
			bind:volume
			class="soundtrack__audio"
			controls
			loop
			onplay={() => (isPaused = false)}
			onpause={() => (isPaused = true)}
			bind:this={audioPlayer}
			src={soundtrack.src[0]}
		>
		</audio>
	</div>
{/if}

<style lang="scss">
	@for $i from 1 through 100 {
		.soundtrack__background--play.soundtrack__background--vol-#{$i} {
			filter: blur(#{calc(($i/10) + 4)}px);
		}
	}
	:root {
		--bg-purple: rgb(128, 0, 128);
		--bg-purple-text: #fff;
		--bg-pink: rgb(255, 192, 203);
		--bg-pink-text: #333;
		--bg-black: #222;
		--text-grey: #666;
	}
	$bgGradient: linear-gradient(
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

	$bgBlur: 1rem;

	.soundtrack {
		position: fixed;
		bottom: 1.8rem;
		right: 0;
		left: 0;
		box-sizing: border-box;
		width: 90%;
		margin: 2rem auto 2rem auto;
		display: flex;
		z-index: 100;
		&__audio {
			width: 100%;
			border-radius: 2rem;
			position: relative;
			padding: 0;
			margin: 0 auto;
			z-index: 3;
		}
		&__background {
			position: absolute;
			border-radius: 2rem;
			position: absolute;
			transition: all ease 1s;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			filter: blur(0px);
			background: $bgGradient;
			background-size: 100% 100%;
			transition: all ease 1s;
			z-index: 1;

			&--play {
				transition: all ease 1s;
				// filter: blur($bgBlur);
				background-size: 200% 200%;
				animation: animateGlow 2s linear infinite reverse;
				z-index: 1;
			}
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

	@media (min-width: 40em) {
		.soundtrack {
			width: 50%;
		}
	}

	@media (min-width: 60em) {
		.soundtrack {
			width: 25%;
		}
	}
</style>
