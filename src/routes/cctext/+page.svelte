<script lang="ts">
	import { goto } from '$app/navigation';
	import { type TextPost } from '$lib';
	import TextList from '$lib/components/posts/card/list.svelte';
	import { ROUTES } from '$lib/utils/constants';
	import type { PageData } from './$types';

	interface Props {
		data: PageData & { texts: TextPost[] };
	}

	let { data }: Props = $props();
	function goToPost(id: number) {
		goto(ROUTES.cctextId(id));
	}
	export function onCardClick(event: CustomEvent<{ post: TextPost }>) {
		const {
			detail: { post }
		} = event;
		goToPost(post.id);
	}
</script>

<div class="page">
	<h1 class="page__title">Textos</h1>
	<TextList posts={data.texts} on:cardClick={onCardClick} />
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
