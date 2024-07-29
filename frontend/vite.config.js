// @ts-ignore
import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', //This allows Vite to listen on all network interfaces, which is necessary when running inside a Docker container. It makes the development server accessible from outside the container.
    port: 3000
  }
});
