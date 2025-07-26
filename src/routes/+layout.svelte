<script lang="ts">
	import Menu from '$lib/components/menu/menu.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app">
	<Menu />
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
		
		&__content {
			box-sizing: border-box;
			padding: 0;
			margin: 4rem 0 2rem 0;
		}
	}
</style>
