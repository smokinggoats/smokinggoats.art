export const DIRECTUS_HOST = import.meta.env.VITE_DIRECTUS_HOST;
export const config = {
	directus: {
		host: DIRECTUS_HOST
	}
};

console.log({ config, import: import.meta.env });
