<script lang="ts">
	import { type PoopPost } from '$lib';
	import PoopList from '$lib/components/posts/card/list.svelte';
	import Directus from '$lib/plugins/directus';
	import type { PageData } from './$types';
	export const directusClient = Directus();

	interface Props {
		data: PageData & { posts: PoopPost[] };
	}

	let { data }: Props = $props();
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
		&__title {
			font-size: 2rem;
			margin: 2rem auto 3rem auto;
			text-align: center;
			text-transform: uppercase;
		}
	}
</style>
