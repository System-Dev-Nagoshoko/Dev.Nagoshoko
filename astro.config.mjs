import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pagesの公開フォルダ名およびアプリのルートに合わせて '/wbgt/' に修正
  base: '/wbgt/', 
  outDir: 'dist',
});
