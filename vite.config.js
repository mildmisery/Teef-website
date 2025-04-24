import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Teef-website/",
  plugins: [
    react()
  ],
  resolve: {
    alias: [
      { find: '@assets', replacement: '/src/assets' },
    ]
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  assetsInclude: ["**/*.PNG"],
})

// import.meta.glob('@assets/asso/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' })
// resolve: { // Assigns aliass to paths,
//   alias: [
//     { find: '@/*', replacement: resolve(__dirname, "src") },
//     { find: '@components', replacement: resolve(__dirname, "./src/components") },
//     { find: '@pages', replacement: resolve(__dirname, "./src/pages") },
//     { find: '@utilities', replacement: resolve(__dirname, "./src/utilities") },
//     { find: '@context', replacement: resolve(__dirname, "./src/context") },
//     { find: '@hooks', replacement: resolve(__dirname, "./src/hooks") },
//     { find: '@assets', replacement: resolve(__dirname, "./src/assets") },
//   ]
// },