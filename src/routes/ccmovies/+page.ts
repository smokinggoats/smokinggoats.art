import Directus from '$lib/plugins/directus';
import { MovieRepository } from '$lib/repositories/directus/movies';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const movieRepo = MovieRepository(client);
	const [posts, categories] = await Promise.all([
		movieRepo.getMovieList(),
		movieRepo.getCategories()
	]);
	return {
		posts,
		categories
	};
};
