<script lang="ts">
	import { type PoopPost } from '$lib';
	import Directus from '$lib/plugins/directus';
	import { ROUTES } from '$lib/utils/constants';
	import type { PageData } from './$types';
	import PoopList from '$lib/components/posts/poop/list.svelte';
	export const directusClient = Directus();

	export let data: PageData & { posts: PoopPost[] };
</script>

<div class="page">
	<h1 class="page__title">Poop</h1>
	<PoopList posts={data.posts} />
</div>

<style lang="scss">
	.page {
		padding: 1rem 2rem;
		&__title {
			font-size: 2rem;
			margin: 1rem auto;
			text-align: center;
			text-transform: uppercase;
		}
	}
</style>
