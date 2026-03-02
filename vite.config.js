import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    historyApiFallback: true,
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-vendor': [
            'react-bootstrap', 
            'bootstrap',
            'react-icons',
            'lucide-react',
            '@radix-ui/react-accordion',
            '@radix-ui/react-icons'
          ],
          'animation-vendor': [
            'framer-motion',
            'gsap',
            '@gsap/react'
          ],
          'carousel-vendor': [
            'react-slick',
            'slick-carousel',
            'react-owl-carousel',
            'swiper'
          ],
          'calendar-vendor': [
            '@fullcalendar/react',
            '@fullcalendar/daygrid',
            '@fullcalendar/interaction',
            'react-calendar'
          ],
          'fontawesome': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/react-fontawesome'
          ],
          'pdf-vendor': [
            '@react-pdf-viewer/core',
            '@react-pdf-viewer/default-layout',
            'jspdf'
          ],
          'utils': [
            'clsx',
            'tailwind-merge',
            'react-scroll-to-top',
            'react-zoom-pan-pinch'
          ]
        },
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      'bootstrap'
    ]
  }
})
