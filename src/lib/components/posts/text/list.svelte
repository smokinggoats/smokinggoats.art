<script lang="ts">
	import type { TextPost } from '$lib/index.types';
	import TextPostCard from '$lib/components/posts/text/card.svelte';
	export let texts: TextPost[] = [];
</script>

<div class="texts">
	{#each texts as text}
		<TextPostCard {text} />
	{/each}
</div>

<style lang="scss">
	.texts {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-flow: row wrap;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>
