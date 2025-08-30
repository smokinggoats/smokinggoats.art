import { readItems, type DirectusClient, type RestClient } from '@directus/sdk';

export type Movie = {
	id: string;
	status: string;
	sort?: string;
	user_created: string;
	date_created: string;
	user_updated: string;
	date_updated: string;
	title: string;
	imdb_id: string;
	year: string;
	released: string;
	runtime: string;
	genre: string;
	director: string;
	writer: string;
	actors: string;
	plot: string;
	language: string;
	country: string;
	imdb_rating: string;
	poster: string;
	poster_image: string;
	watched_at?: string[];
	watched?: boolean;
	personal_rating?: string;
	last_watched?: string;
};

export function MovieRepository(client: DirectusClient<any> & RestClient<any>) {
	return {
		async getMovieList() {
			return client.request<Movie[]>(
				readItems('movies   ', {
					sort: ['-last_watched']
				})
			);
		}
	};
}
