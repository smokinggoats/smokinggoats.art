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

export interface MovieAPI extends Movie {
	genre?: string;
}
export interface MovieParsed extends Movie {
	genre: Record<string, string>;
}

export function MovieRepository(client: DirectusClient<any> & RestClient<any>) {
	return {
		parseGenre(genre: string): Record<string, string> {
			return Object.fromEntries(
				genre?.split(',')?.map((el: string) => {
					const e = el.trim();
					return [e, e];
				}) || []
			);
		},
		async getCategories() {
			const response = await client.request(
				readItems('movies', {
					fields: ['genre'],
					limit: -1
				})
			);
			return response.reduce((acc, curr) => {
				return { ...acc, ...this.parseGenre(curr.genre || '') };
			}, {});
		},
		async getMovieList() {
			return client.request<MovieAPI[]>(
				readItems('movies   ', {
					sort: ['-last_watched'],
					limit: -1
				})
			);
		}
	};
}
