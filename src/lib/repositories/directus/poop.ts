import type { PoopPost, PoopPostDetails } from '$lib/index.types';
import { readItem, readItems, type DirectusClient, type RestClient } from '@directus/sdk';

export function PoopRepository(client: DirectusClient<any> & RestClient<any>) {
	return {
		async getPoop(id: string, fields = ['*', { '*': ['*'] }]) {
			return client.request<PoopPostDetails>(readItem('poop', id, { fields }));
		},
		async getPoopsList() {
			return client.request<PoopPost[]>(
				readItems('poop', {
					filter: {
						status: {
							_in: ['published']
						}
					},
					sort: ['-date_created']
				})
			);
		}
	};
}
