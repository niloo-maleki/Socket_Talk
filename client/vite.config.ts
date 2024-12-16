import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174, // پورت دلخواه
    },
    resolve: {
        alias: { // Setting up aliases for cleaner imports
            '@src': resolve(__dirname, 'src'), // Alias for the "src" directory
            '@assets': resolve(__dirname, 'src/assets'), // Alias for the "assets" folder in "src"
            '@components': resolve(__dirname, 'src/components'), // Alias for the "components" folder in "src"
            '@icons': resolve(__dirname, 'src/assets/svg'), // Alias for the "svg" folder inside assets
            '@shared': resolve(__dirname, '../shared'), // Alias for the "svg" folder inside assets
        },
    },
});