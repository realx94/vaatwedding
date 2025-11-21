import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rsvp-api',
      configureServer(server) {
        server.middlewares.use('/api/rsvp', (req, res, next) => {
          if (req.method === 'POST') {
            let body = ''
            req.on('data', c => { body += c })
            req.on('end', () => {
              try {
                const data = JSON.parse(body || '{}')
                const fp = path.join(server.config.root, 'data', 'rsvp.json')
                try { fs.mkdirSync(path.dirname(fp), { recursive: true }) } catch {}
                let list = []
                try {
                  const cur = fs.readFileSync(fp, 'utf-8')
                  list = JSON.parse(cur || '[]')
                } catch {}
                const next = [data, ...list]
                fs.writeFileSync(fp, JSON.stringify(next, null, 2))
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify({ ok: true, count: next.length }))
              } catch {
                res.statusCode = 500
                res.end(JSON.stringify({ ok: false }))
              }
            })
            return
          }
          if (req.method === 'GET') {
            const fp = path.join(server.config.root, 'data', 'rsvp.json')
            try {
              const cur = fs.readFileSync(fp, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(cur)
            } catch {
              res.statusCode = 404
              res.end('[]')
            }
            return
          }
          next()
        })

        server.middlewares.use('/data/rsvp.json', (req, res, next) => {
          if (req.method !== 'GET') return next()
          const fp = path.join(server.config.root, 'data', 'rsvp.json')
          try {
            const cur = fs.readFileSync(fp, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(cur)
          } catch {
            res.statusCode = 404
            res.end('[]')
          }
        })

        server.middlewares.use('/api/wishes', (req, res, next) => {
          if (req.method === 'POST') {
            let body = ''
            req.on('data', c => { body += c })
            req.on('end', () => {
              try {
                const data = JSON.parse(body || '{}')
                const fp = path.join(server.config.root, 'data', 'wishes.json')
                try { fs.mkdirSync(path.dirname(fp), { recursive: true }) } catch {}
                let list = []
                try {
                  const cur = fs.readFileSync(fp, 'utf-8')
                  list = JSON.parse(cur || '[]')
                } catch {}
                const item = { name: String(data.name || '').trim(), message: String(data.message || '').trim(), ts: Date.now() }
                if (!item.name || !item.message) {
                  res.statusCode = 400
                  res.end(JSON.stringify({ ok: false }))
                  return
                }
                const next = [item, ...list]
                fs.writeFileSync(fp, JSON.stringify(next, null, 2))
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify({ ok: true, count: next.length }))
              } catch {
                res.statusCode = 500
                res.end(JSON.stringify({ ok: false }))
              }
            })
            return
          }
          next()
        })

        server.middlewares.use('/data/wishes.json', (req, res, next) => {
          if (req.method !== 'GET') return next()
          const fp = path.join(server.config.root, 'data', 'wishes.json')
          try {
            const cur = fs.readFileSync(fp, 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(cur)
          } catch {
            res.statusCode = 404
            res.end('[]')
          }
        })
      }
    },
    {
      name: 'copy-rsvp-data',
      apply: 'build',
      closeBundle() {
        try {
          const src = path.join(process.cwd(), 'data', 'rsvp.json')
          const dest = path.join(process.cwd(), 'dist', 'data', 'rsvp.json')
          let content = '[]'
          try { content = fs.readFileSync(src, 'utf-8') } catch {}
          fs.mkdirSync(path.dirname(dest), { recursive: true })
          fs.writeFileSync(dest, content)
        } catch {}
      }
    }
    ,
    {
      name: 'copy-wishes-data',
      apply: 'build',
      closeBundle() {
        try {
          const src = path.join(process.cwd(), 'data', 'wishes.json')
          const dest = path.join(process.cwd(), 'dist', 'data', 'wishes.json')
          let content = '[]'
          try { content = fs.readFileSync(src, 'utf-8') } catch {}
          fs.mkdirSync(path.dirname(dest), { recursive: true })
          fs.writeFileSync(dest, content)
        } catch {}
      }
    }
  ],
})
