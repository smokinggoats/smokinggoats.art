<script lang="ts">
	import { type TextPost } from '$lib';
	import TextList from '$lib/components/posts/text/list.svelte';
	import type { PageData } from './$types';

	export let data: PageData & { texts: TextPost[] };
</script>

<div class="page">
	<h1 class="page__title">Textos</h1>
	<TextList texts={data.texts} />
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
