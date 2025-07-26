<script lang="ts">
	import type { TextPostDetails } from '$lib';
	import TextPost from '$lib/components/posts/text/details.svelte';
	import type { PageData } from './$types';
	interface Props {
		data: PageData & { post: TextPostDetails };
	}

	let { data }: Props = $props();
</script>

<TextPost post={data.post} />
