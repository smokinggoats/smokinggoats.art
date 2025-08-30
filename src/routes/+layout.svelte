<script lang="ts">
	import { page } from '$app/state';
	import Menu from '$lib/components/menu/menu.svelte';
	import Soundtrack from '$lib/components/soundtrack/soundtrack.svelte';
	import { menuByRoute, menuDict } from '$lib/utils/constants';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	const soundtrack = $derived(page.route.id && menuByRoute[page.route.id || '/']?.soundtrack);
</script>

<div class="app">
	<Menu />
	<div class="app__spacer"></div>
	{#if soundtrack}
		<Soundtrack {soundtrack} />
	{/if}
	<div class="app__content">
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.app {
		background-color: rgba(21, 21, 21, 1);
		color: #fff;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;
		&__spacer {
			height: 4rem;
			padding: 0;
			margin: 0;
			width: 100%;
		}
		&__content {
			box-sizing: border-box;
			padding: 0;
			margin: 0rem 0 2rem 0;
		}
	}
</style>
