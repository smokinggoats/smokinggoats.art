import { config } from '$lib/config';
import { createDirectus, rest } from '@directus/sdk';

export default function Directus() {
	const { host } = config.directus;
	const client = createDirectus(host).with(rest());
	return {
		client,
		getImageLink(id: string = '', width = 0, height = 0) {
			let url = `${host}/assets/${id}?format=webp&withoutEnlargement&fit=cover`;
			if (width && height) {
				url = `${url}&width=${width}&height=${height}`;
			}
			return url;
		}
	};
}
