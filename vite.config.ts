import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // 独自ドメイン・サブディレクトリ両対応
  build: {
    outDir: 'dist'
  }
})
