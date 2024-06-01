<script lang="ts">
	import type { PoopPost } from '$lib/index.types';
	import PoopPostCard from '$lib/components/posts/poop/card.svelte';
	export let posts: PoopPost[];
</script>

<div class="posts">
	{#each posts as post}
		<PoopPostCard {post} />
	{/each}
</div>

<style lang="scss">
	.posts {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-flow: row wrap;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>
