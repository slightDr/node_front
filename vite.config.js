// import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const pathResolve = dir => resolve(__dirname, dir)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [],
    },
  },
  server: {
    port: 8080,
    open: true, // 自动打开浏览器
    cors: true,
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': pathResolve("./src"),
    }
  }
})
