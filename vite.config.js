import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Optional local proxy for testing the email endpoint.
      // Run a local serverless/function dev server on http://127.0.0.1:8787
      // (or change target below) so the UI can call /api/subscribe without 404.
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  }
}
