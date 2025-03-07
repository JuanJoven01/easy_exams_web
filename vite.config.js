import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')


    return defineConfig({
      plugins: [
        react(),
        tailwindcss(),],

        server: {
            proxy: {
              '/api': {
              target: env.VITE_API_URL_PROXY,
              changeOrigin: true,
              // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
            }
        },
    });
}

