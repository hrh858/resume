import { defineConfig } from 'vite'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const STATIC_ASSETS = ['CNAME', 'robots.txt', 'sitemap.xml']

const copyStaticAssetsPlugin = () => {
  let resolvedOutDir = 'dist'

  return {
    name: 'copy-root-static-assets',
    apply: 'build',
    configResolved(config) {
      resolvedOutDir = config.build?.outDir ?? resolvedOutDir
    },
    closeBundle() {
      STATIC_ASSETS.forEach((file) => {
        if (!existsSync(file)) {
          return
        }

        const destination = resolve(resolvedOutDir, file)
        mkdirSync(dirname(destination), { recursive: true })
        copyFileSync(file, destination)
      })
    },
  }
}

export default defineConfig({
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [copyStaticAssetsPlugin()],
})
