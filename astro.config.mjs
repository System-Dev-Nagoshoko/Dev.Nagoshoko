import { defineConfig } from 'astro/config';

export default defineConfig({
  // URLが https://nagoyc.stki.org/ のようにルート（一番上）なら '/'
  // もし https://ユーザー名.github.io/event-guide/ なら '/event-guide/' にしてください
  base: '/', 
  outDir: 'dist', // ビルドしたファイルの出力先をdistに指定
});
