import Directus from '$lib/plugins/directus';
import {
	MovieRepository,
	type MovieAPI,
	type MovieParsed
} from '$lib/repositories/directus/movies';
import { normalizeBy } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async function load() {
	const { client } = Directus();
	const movieRepo = MovieRepository(client);
	const [list, categories] = await Promise.all([
		movieRepo.getMovieList(),
		movieRepo.getCategories()
	]);
	return {
		posts: list.reduce(
			...normalizeBy<'id', MovieAPI, MovieParsed>('id', (el) => {
				const g = movieRepo.parseGenre(el?.genre || '');
				return {
					...el,
					genre: g
				};
			})
		),
		categories
	};
};
