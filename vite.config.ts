import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { config } from 'dotenv';
import basicSsl from '@vitejs/plugin-basic-ssl';

// Load the appropriate .env file
// install dotevn and cross-env libraries (for platform agnostic env read)
config({ path: `.env.${process.env.NODE_ENV}` });

export default defineConfig({
	plugins: [sveltekit(), basicSsl()]
});
