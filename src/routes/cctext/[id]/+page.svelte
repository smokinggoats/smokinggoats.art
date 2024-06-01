<script lang="ts">
	import type { TextPostDetails } from '$lib';
	import TextPost from '$lib/components/posts/text/details.svelte';
	import type { PageData } from './$types';
	export let data: PageData & { post: TextPostDetails };
</script>

<TextPost post={data.post} />
