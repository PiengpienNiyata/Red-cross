import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin({})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000, // Change if needed
    strictPort: true,
    host: 'localhost',
    hmr: {
      overlay: false, // Disable error overlay if it causes issues
    }
  },
  define: {
    __VUE_OPTIONS_API__: true,  // Ensure Vue 3 Options API support
    __VUE_PROD_DEVTOOLS__: true // Allow DevTools in production (optional)
  }
})
