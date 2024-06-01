import { config } from '$lib/config';
import { createDirectus, rest } from '@directus/sdk';

export default function Directus() {
	const { host } = config.directus;
	const client = createDirectus(host).with(rest());
	return {
		client,
		getImageLink(id: string = '') {
			return `${host}/assets/${id}`;
		}
	};
}
