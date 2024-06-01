<script lang="ts">
	export const ssr = false;
	import Menu from '$lib/components/menu/menu.svelte';
</script>

<div class="app">
	<Menu />
	<div class="app__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
		&__content {
			box-sizing: border-box;
			padding: 4rem 0 0 0;
			margin: 0;
			width: 100%;
			height: 100%;
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
