import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import stylelintPlugin from 'vite-plugin-stylelint'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: './docs',
  },
  plugins: [vue(), vueJsx(), stylelintPlugin({ fix: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'border-radius-small': '0px',
          'border-radius-medium': '0px',
          'border-radius-large': '0px',
          'color-text-4': 'var(--color-neutral-10)',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8090,
    open: true,
    proxy: {
      '/bridge': {
        // target: 'http://192.168.1.123:9990',
        target: 'http://192.168.1.21:83',
        changeOrigin: true,
      },
    },
  },
})
