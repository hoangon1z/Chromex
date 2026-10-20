import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contact from './api/contact.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'TELEGRAM_')
  Object.assign(process.env, env)
  const middleware = (server) => {
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0] === '/api/contact') return contact(req, res)
      next()
    })
  }
  return {
  plugins: [react(), { name: 'contact-api', configureServer: middleware, configurePreviewServer: middleware }],
  server: {
    port: 5173,
    host: true
  }
  }
})
