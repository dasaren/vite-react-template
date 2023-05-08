// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc'

import jsconfigPaths from 'vite-jsconfig-paths'
import path from 'path'

import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), jsconfigPaths(),
  
  
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })


export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      jsconfigPaths(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Pass the environment variables to the client-side code
      'process.env': process.env,
    },
    build: {
      rollupOptions: {
        plugins: [
          // Use environment variables for production build
          isProduction && require('dotenv').config({ path: '.env.production' }),
        ].filter(Boolean),
      },
    },
  };
});
