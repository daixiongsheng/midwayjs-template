import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import hooks from '@midwayjs/vite-plugin-hooks'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hooks(), reactRefresh()],
  define: {
    __DEV__: true,
  },
  mode: 'development',
  publicDir: 'public',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'Fragment',
  },
  server: {
    proxy: {
      // string shorthand
      '/foo': 'http://localhost:4567/foo',
      // with options
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      // with RegEx
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fallback/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    sourcemap: false,
  },
})
