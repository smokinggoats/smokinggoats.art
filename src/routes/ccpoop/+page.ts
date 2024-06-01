import Directus from '$lib/plugins/directus';
import { PoopRepository } from '$lib/repositories/directus/poop';
import type { PageLoad } from './$types';

export type PoopPost = {
	id: number;
	status: string;
	date_created: string;
	date_updated: string;
	title: string;
	description?: string;
	tags?: string[];
	image?: string;
};

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const poopRepository = PoopRepository(client);
	return {
		posts: await poopRepository.getPoopsList()
	};
};
