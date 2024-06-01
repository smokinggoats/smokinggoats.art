import Directus from '$lib/plugins/directus';
import { TextRepository } from '$lib/repositories/directus/text';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load({ params }) {
	const { id } = params;
	const { client } = Directus();
	const textRepository = TextRepository(client);
	const post = await textRepository.getText(id);
	return {
		post
	};
};
