import { defineConfig } from 'vite'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const STATIC_ASSETS = ['CNAME', 'robots.txt', 'sitemap.xml']

export default defineConfig({
  plugins: [
    {
      name: 'copy-root-static-assets',
      apply: 'build',
      closeBundle() {
        const outDir = 'dist'

        STATIC_ASSETS.forEach((file) => {
          if (!existsSync(file)) {
            return
          }

          const destination = resolve(outDir, file)
          mkdirSync(dirname(destination), { recursive: true })
          copyFileSync(file, destination)
        })
      },
    },
  ],
})
