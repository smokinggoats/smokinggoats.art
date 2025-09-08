import { normalizeBy } from '$lib/utils';
import { readItems, type DirectusClient, type RestClient } from '@directus/sdk';

export type PoopPost = {
	id: number;
	title: string;
	status: string;
	image?: string | null | undefined;
	audio?: string | null | undefined;
	sort?: string | null | undefined;
	user_created: string;
	date_created: string;
	user_updated?: string | null | undefined;
	date_updated?: string | null | undefined;
};

export function PoopRepository(client: DirectusClient<any> & RestClient<any>) {
	return {
		async getPoopsList() {
			const data = await client.request<PoopPost[]>(
				readItems('poop', {
					filter: {
						status: {
							_in: ['published']
						}
					},
					sort: ['-date_created']
				})
			);
			return data.reduce(...normalizeBy<'id', PoopPost>('id'));
		}
	};
}
