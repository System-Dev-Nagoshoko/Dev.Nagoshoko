// --- 型定義 ---
interface EventProject {
  id: number;
  title: string;
  location: string;
  time: string;
  category: '展示' | '飲食' | 'ステージ' | '案内';
}

// --- データ定義 (ここを編集して更新) ---
const PROJECTS: EventProject[] = [
  { id: 1, title: "総合受付 / 当日券", location: "エントランスホール", time: "09:00 - 17:00", category: "案内" },
  { id: 2, title: "デジタルアート展", location: "3F 第1会議室", time: "10:00 - 16:00", category: "展示" },
  { id: 3, title: "キッチンカー広場", location: "屋外中庭", time: "11:00 - 15:00", category: "飲食" },
  { id: 4, title: "学生バンドLIVE", location: "メインステージ", time: "13:00 - 14:30", category: "ステージ" },
];

const MAP_URL = "https://via.placeholder.com/600x400?text=Venue+Map"; // 実際の画像URLに差し替え

// --- DOM操作 ---
const app = document.querySelector<HTMLDivElement>('#app')!;

function initApp() {
  renderHome();
}

// 企画一覧の描画
function renderEvents(filter: string = 'すべて') {
  const filtered = filter === 'すべて' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  
  const listHtml = filtered.map(p => `
    <div class="card">
      <div class="card-meta">
        <span class="badge">${p.category}</span>
        <span class="time">${p.time}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="loc">📍 ${p.location}</p>
    </div>
  `).join('');

  const container = document.getElementById('content-area')!;
  container.innerHTML = `<div class="event-list">${listHtml}</div>`;
}

// 各セクションの切り替え描画
function renderSection(type: 'map' | 'events' | 'terms') {
  const container = document.getElementById('content-area')!;
  
  if (type === 'map') {
    container.innerHTML = `
      <div class="map-view">
        <h2>会場マップ</h2>
        <img src="${MAP_URL}" alt="会場マップ" style="width:100%; border-radius:8px;">
        <p>※各エリアの詳細は企画一覧をご確認ください。</p>
      </div>`;
  } else if (type === 'terms') {
    container.innerHTML = `
      <div class="terms-view">
        <h2>⚠️ 利用について</h2>
        <p>本ソフトウェアは、特定のイベント案内用途に限定して使用を想定しています。</p>
        <p>無断での再配布や、他用途での使用は禁止されています。使用を希望する場合は、事前に所有者へご連絡ください。</p>
      </div>`;
  } else {
    renderEvents();
  }
}

// メインレイアウトの生成
app.innerHTML = `
  <header>
    <h1>Event Guide System</h1>
    <p>来場者案内システム</p>
  </header>

  <nav class="tab-nav">
    <button onclick="window.renderSection('events')">企画一覧</button>
    <button onclick="window.renderSection('map')">マップ</button>
    <button onclick="window.renderSection('terms')">利用規約</button>
  </nav>

  <div id="content-area"></div>

  <footer>
    <p>&copy; 2026 Event Guide System. LINE Bot連携準備中...</p>
  </footer>
`;

// グローバルに公開（onclickイベント用）
(window as any).renderSection = renderSection;

// 初回起動
renderSection('events');