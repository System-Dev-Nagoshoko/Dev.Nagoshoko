// 1. 仕様書に基づくデータ項目の定義 
interface ClassProject {
  grade: number;       // 学年 (1, 2, 3)
  dept: string;        // 学科名 (機械, 電気, 情報, 商業, 地産)
  name: string;        // 企画名 [cite: 16]
  location: string;    // 開催場所 [cite: 16]
  time: string;        // 開催時間 [cite: 16]
  description: string; // 説明文 [cite: 16]
  status: '空き' | 'やや混雑' | '混雑'; // 混雑状況 [cite: 16]
}

// 2. 5学科 × 3学年 = 15クラスのデータセット
const departments = ["機械科", "電気科", "総合情報科", "商業科", "地域産業科"];
const projectData: ClassProject[] = [];

// 15クラス分のデータを生成 [cite: 14]
departments.forEach(dept => {
  [3, 2, 1].forEach(grade => {
    projectData.push({
      grade,
      dept,
      name: `${dept} ${grade}年 企画`,
      location: `${grade}F ${dept}実習室`,
      time: "09:30 - 15:30",
      description: `${dept}の${grade}年生による、日頃の学習成果を活かした専門的な展示・体験です。`,
      status: '空き' // 初期状態 [cite: 16]
    });
  });
});

// 現在の表示状態管理
let currentGradeFilter = 3; // デフォルトは3年生 [cite: 13]

// 3. 描画ロジック [cite: 10, 11]
function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  // 仕様書の「企画一覧表示」に基づくフィルタリング [cite: 11]
  const filtered = projectData.filter(p => p.grade === currentGradeFilter);

  app.innerHTML = `
    <div class="grade-selector" style="display: flex; gap: 8px; padding: 15px; background: #fff; border-bottom: 1px solid #eee;">
      ${[3, 2, 1].map(g => `
        <button onclick="window.setGrade(${g})" 
          class="grade-btn ${currentGradeFilter === g ? 'active' : ''}"
          style="flex:1; padding: 10px; border-radius: 20px; border: 1px solid var(--nago-blue);
          background: ${currentGradeFilter === g ? 'var(--nago-blue)' : 'white'};
          color: ${currentGradeFilter === g ? 'white' : 'var(--nago-blue)'}; font-weight: bold; cursor: pointer;">
          ${g}年生
        </button>
      `).join('')}
    </div>

    <div class="event-list">
      <p style="padding: 10px 16px; font-size: 0.9rem; color: #666;">
        ${currentGradeFilter}年生の企画を表示中（全 ${filtered.length} 件）
      </p>
      ${filtered.map(p => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <span class="badge">${p.dept}</span>
            <span class="badge" style="background: ${getStatusColor(p.status)}; color: white; border: none;">
              ${p.status}
            </span>
          </div>
          <h3>${p.name}</h3>
          <div class="card-meta">
            <span class="badge loc-badge">📍 ${p.location}</span>
            <span class="badge" style="background: #fff3e0; color: #e65100;">🕒 ${p.time}</span>
          </div>
          <p class="description" style="font-size: 0.85rem; color: #555; margin-top: 10px; line-height: 1.4;">
            ${p.description}
          </p>
        </div>
      `).join('')}
    </div>
  `;
}

// 混雑状況に応じた色の判定 [cite: 16]
function getStatusColor(status: string) {
  switch (status) {
    case '空き': return '#4caf50';
    case 'やや混雑': return '#ff9800';
    case '混雑': return '#f44336';
    default: return '#999';
  }
}

// ボタンクリック時の挙動定義 [cite: 11, 18]
(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

// 初回実行
render();
