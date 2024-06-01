<script lang="ts">
	import type { PoopPostDetails } from '$lib';
	import PoopPost from '$lib/components/posts/poop/details.svelte';
	import type { PageData } from './$types';
	export let data: PageData & { post: PoopPostDetails };
</script>

<PoopPost post={data.post} />
