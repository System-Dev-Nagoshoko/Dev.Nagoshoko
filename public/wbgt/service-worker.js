const CACHE_NAME = "heat-safety-shell-v6";

// 最初から確実に存在する主要なルートとマニフェストだけを事前にキャッシュ
const urlsToCache = [
  "/wbgt/",
  "/wbgt/index.html",
  "/wbgt/manifest.webmanifest" // パスがルート直下なら "/manifest.webmanifest" に変更してください
];

// インストール時にコアファイルをキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // 新しいService Workerをすぐにアクティブにする
});

// アクティベート時に古いキャッシュを掃除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ネットワーク優先（オンライン時は最新を取得し、キャッシュを更新。オフライン時はキャッシュを返す）
self.addEventListener("fetch", (event) => {
  // 外部APIやスキーマ（chrome-extension等）はキャッシュ対象外にする
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 正常なレスポンスならキャッシュに保存・更新
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // オフラインなどでネットワークが失敗したらキャッシュから返す
        return caches.match(event.request);
      })
  );
});
