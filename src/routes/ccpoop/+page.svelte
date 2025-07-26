<script lang="ts">
	import { goto } from '$app/navigation';
	import { type PoopPost } from '$lib';
	import PoopList from '$lib/components/posts/card/list.svelte';
	import Directus from '$lib/plugins/directus';
	import { ROUTES } from '$lib/utils/constants';
	import type { PageData } from './$types';
	export const directusClient = Directus();

	interface Props {
		data: PageData & { posts: PoopPost[] };
	}

	let { data }: Props = $props();
</script>

<div class="page">
	<h1 class="page__title">Poop</h1>
	<PoopList posts={data.posts} />
</div>

<style lang="scss">
	.page {
		padding: 1rem 1rem 4rem 1rem;
		box-sizing: border-box;
		overflow: auto;
		height: 100%;
		&__title {
			font-size: 2rem;
			margin: 1rem auto;
			text-align: center;
			text-transform: uppercase;
		}
	}
</style>
