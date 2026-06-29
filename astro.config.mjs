import { defineConfig } from 'astro/config';

export default defineConfig({
  // 商工祭案内システム全体を正しく表示するため、ベースをルート（'/'）に戻します
  base: '/', 
  outDir: 'dist',
});
