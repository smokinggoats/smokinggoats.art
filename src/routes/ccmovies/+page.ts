import Directus from '$lib/plugins/directus';
import { MovieRepository, type Movie } from '$lib/repositories/directus/movies';
import { normalizeBy } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const movieRepo = MovieRepository(client);
	const list = await movieRepo.getMovieList();
	return {
		posts: list.reduce(...normalizeBy<'id', Movie>('id'))
	};
};
