// 1. 仕様書に基づくデータ項目の定義 [cite: 15, 16]
interface ClassProject {
  grade: number;      // 学年 (1, 2, 3)
  dept: string;       // 学科名
  name: string;       // 企画名
  location: string;   // 開催場所
  time: string;       // 開催時間
  description: string; // 説明文
  status: '空き' | 'やや混雑' | '混雑'; // 混雑状況 [cite: 16]
}

// 2. 5学科 × 3学年 = 15クラスのデータ生成
const departments = ["機械科", "電気科", "総合情報科", "商業科", "地域産業科"];
const projectData: ClassProject[] = [];

// データを自動生成（各学科・各学年に1クラスずつ）
departments.forEach(dept => {
  [1, 2, 3].forEach(grade => {
    projectData.push({
      grade: grade,
      dept: dept,
      name: `${dept} ${grade}年 企画`,
      location: `${grade}F ${dept}実習室`,
      time: "10:00 - 15:00",
      description: `${dept}${grade}年生による専門スキルを活かした展示・体験です。`,
      status: grade === 3 ? '混雑' : '空き' // 3年生は混みやすいと仮定
    });
  });
});

// 現在の表示状態
let currentGradeFilter: number | null = 3; // 初期表示は3年生

// 3. 描画ロジック 
function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  // 学年選択ボタンの生成
  const filterHtml = `
    <div style="display: flex; justify-content: center; gap: 10px; padding: 15px; background: #fff; border-bottom: 1px solid #eee;">
      ${[3, 2, 1].map(g => `
        <button onclick="window.setGrade(${g})" 
          style="flex:1; padding: 10px; border-radius: 20px; border: 1px solid var(--nago-blue); 
          background: ${currentGradeFilter === g ? 'var(--nago-blue)' : 'white'}; 
          color: ${currentGradeFilter === g ? 'white' : 'var(--nago-blue)'}; font-weight: bold;">
          ${g}年生
        </button>
      `).join('')}
    </div>
  `;

  // フィルタリングされたカード一覧
  const filteredProjects = projectData.filter(p => p.grade === currentGradeFilter);
  
  const listHtml = `
    <div class="event-list">
      <h2 style="font-size: 1rem; color: #666; margin-bottom: 10px;">${currentGradeFilter}年生の企画一覧</h2>
      ${filteredProjects.map(p => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <span class="badge">${p.dept}</span>
              <h3>${p.name}</h3>
            </div>
            <span class="badge" style="background: ${getStatusColor(p.status)}; color: white; border: none;">
              ${p.status}
            </span>
          </div>
          <div class="card-meta" style="margin-top: 8px;">
            <span class="badge loc-badge">📍 ${p.location}</span>
            <span class="badge" style="background: #fff3e0; color: #e65100;">🕒 ${p.time}</span>
          </div>
          <p style="font-size: 0.85rem; color: #555; margin-top: 10px;">${p.description}</p>
        </div>
      `).join('')}
    </div>
  `;

  app.innerHTML = filterHtml + listHtml;
}

// 混雑状況の色分け
function getStatusColor(status: string) {
  if (status === '混雑') return '#f44336';
  if (status === 'やや混雑') return '#ff9800';
  return '#4caf50';
}

// グローバル関数として登録
(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

render();
