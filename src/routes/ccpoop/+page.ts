import Directus from '$lib/plugins/directus';
import { PoopRepository } from '$lib/repositories/directus/poop';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const poopRepository = PoopRepository(client);
	const posts = await poopRepository.getPoopsList();
	return {
		posts
	};
};
