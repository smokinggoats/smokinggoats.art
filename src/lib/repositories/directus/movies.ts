import type { NormalizedBy } from '$lib/index.types';
import { normalizeBy } from '$lib/utils';
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
	director: string;
	writer: string;
	actors: string;
}
export interface MovieParsed extends Movie {
	genre: Record<string, string>;
	director: string[];
	writer: string[];
	actors: string[];
}

export function MovieRepository(client?: DirectusClient<any> & RestClient<any>) {
	return {
		//client
		parseGenre(genre: string): Record<string, string> {
			return Object.fromEntries(
				genre?.split(',')?.map((el: string) => {
					const e = el.trim();
					return [e, e];
				}) || []
			);
		},
		parseStringToList(s: string) {
			return s.split(',')?.map((el: string) => el.trim());
		},
		shouldRenderCardCategory(post: MovieParsed, selectedCategories: string[] = []) {
			return selectedCategories.some((c) => !!post.genre[c]);
		},

		shouldRenderCardTitle(post: MovieParsed, titleFilter: string = '') {
			return post.title.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase());
		},
		shouldRenderCardYear(post: MovieParsed, yearFilter: number[] = []) {
			return yearFilter.includes(Number(post.year));
		},
		filterMovies(
			id: string,
			posts: NormalizedBy<'id', MovieParsed>,
			selectedCategories: string[] = [],
			titleFilter: string = '',
			yearFilter: number[]
		) {
			const p = posts.byId[id];
			if (!p) return false;

			let c = true;
			if (selectedCategories.length > 0) {
				c = this.shouldRenderCardCategory(p, selectedCategories);
			}
			let t = true;
			if (titleFilter.length > 0) {
				t = this.shouldRenderCardTitle(p, titleFilter);
			}
			let y = true;
			if (yearFilter.length > 0) {
				y = this.shouldRenderCardYear(p, yearFilter);
			}
			return c && t && y;
		},
		// api
		async getCategories() {
			if (!client) throw 'missing client';
			const response = await client.request(
				readItems('movies', {
					fields: ['genre', 'year'],
					limit: -1
				})
			);
			return {
				genre: response.reduce((acc, curr) => {
					return { ...acc, ...this.parseGenre(curr.genre || '') };
				}, {}),
				year: Object.values(
					response.reduce((acc, curr) => {
						return { ...acc, [curr.year]: Number(curr.year) };
					}, {})
				)
			};
		},
		async getMovieList() {
			if (!client) throw 'missing client';
			const response = await client.request<MovieAPI[]>(
				readItems('movies   ', {
					sort: ['-last_watched'],
					limit: -1
				})
			);
			return response.reduce(
				...normalizeBy<'id', MovieAPI, MovieParsed>('id', (el) => {
					const g = this.parseGenre(el?.genre || '');
					return {
						...el,
						genre: g,
						actors: this.parseStringToList(el.actors || ''),
						director: this.parseStringToList(el.director || ''),
						writer: this.parseStringToList(el.writer || '')
					};
				})
			);
		}
	};
}
