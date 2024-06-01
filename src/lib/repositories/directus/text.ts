import type { TextPost, TextPostDetails } from '$lib/index.types';
import { readItem, readItems, type DirectusClient, type RestClient } from '@directus/sdk';

export function TextRepository(client: DirectusClient<any> & RestClient<any>) {
	return {
		async getText(id: string, fields = ['*', { '*': ['*'] }]) {
			return client.request<TextPostDetails>(readItem('text', id, { fields }));
		},
		async getTextList() {
			return client.request<TextPost[]>(
				readItems('text', {
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
