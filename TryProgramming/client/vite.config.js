// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import djangoVite from 'django-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import jsconfigPaths from 'vite-jsconfig-paths'
import { resolve } from 'path'
import path from 'path'






export default defineConfig({
  plugins: [react(), jsconfigPaths(), 
    // djangoVite(
    //   {
    //     input: {
    //       main: resolve(__dirname, 'index.html')
    //       // maini: resolve(__dirname, 'dist'),
    //       // main: resolve(__dirname, 'dist/index.html'),
    //   }
    // }
    // )
//     djangoVite([
//     'home/js/app.js',
//     'home/css/style.css',
// ])
],
  resolve: {
    alias: {
       "~": path.resolve(__dirname, "node_modules"),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    manifest: true ,
    chunkSizeWarningLimit: 16000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
  base: process.env.mode === "production" ? "/static/" : "/",
  // root: "./src"
})
