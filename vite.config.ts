import { defineConfig } from 'vite'

export default defineConfig({
  // 独自ドメインのルートで動かすための設定
  base: './', 
  build: {
    // Actionsが探しにいくフォルダ名と一致させる
    outDir: 'dist',
  }
})
