import Directus from '$lib/plugins/directus';
import { PoopRepository, type PoopPost } from '$lib/repositories/directus/poop';
import { normalizeBy } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const poopRepository = PoopRepository(client);
	const list = await poopRepository.getPoopsList();
	return {
		posts: list.reduce(...normalizeBy<'id', PoopPost>('id'))
	};
};
