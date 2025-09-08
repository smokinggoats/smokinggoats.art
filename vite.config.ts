import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		allowedHosts: true,
		port: Number(process.env.PORT) || 5173,
		cors: false
	},
	preview: {
		port: Number(process.env.PORT) || 5173
	}
});
