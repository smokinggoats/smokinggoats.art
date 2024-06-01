import Directus from '$lib/plugins/directus';
import { PoopRepository } from '$lib/repositories/directus/poop';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load({ params }) {
	const { id } = params;
	const { client } = Directus();
	const poopRepository = PoopRepository(client);
	const post = await poopRepository.getPoop(id);
	return {
		post
	};
};
