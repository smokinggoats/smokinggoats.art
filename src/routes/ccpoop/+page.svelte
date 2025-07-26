<script lang="ts">
	import PoopList from '$lib/components/posts/card/list.svelte';
	import Directus from '$lib/plugins/directus';
	import type { PageData } from './$types';
	export const directusClient = Directus();

	const { data }: { data: PageData } = $props();
</script>

<div class="page">
	<PoopList posts={data.posts} />
</div>

<style lang="scss">
	.page {
		padding: 1rem 1rem 2rem 1rem;
		box-sizing: border-box;
		overflow: auto;
		height: 100%;
	}
</style>
