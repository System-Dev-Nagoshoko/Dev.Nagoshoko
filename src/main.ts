interface ClassProject {
  grade: number;       // 学年 (1, 2, 3)
  dept: string;        // 学科名
  name: string;        // 企画名
  location: string;    // 開催場所
  time: string;        // 開催時間
  description: string; // 説明文
  status: '空き' | 'やや混雑' | '混雑'; // 混雑状況
}

// 名護商工の正確な学科構成に基づいたリスト
const departments = [
  "工業技術科 機械", 
  "工業技術科 電気", 
  "建築科", 
  "総合情報科", 
  "商業科", 
  "地域産業科"
];

const projectData: ClassProject[] = [];

// データの自動生成
departments.forEach(dept => {
  [3, 2, 1].forEach(grade => {
    projectData.push({
      grade,
      dept,
      name: `${dept} ${grade}年 企画`,
      // 教室名の自動抽出（工業技術科 機械 -> 機械実習室）
      location: `${grade}F ${dept.split(' ').pop()}実習室`,
      time: "09:30 - 15:30",
      description: `${dept}の${grade}年生による、日頃の学習成果を活かした専門的な展示・体験です。`,
      status: '空き' 
    });
  });
});

// 現在の表示状態管理
let currentGradeFilter = 3; 

// 描画ロジック
function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const filtered = projectData.filter(p => p.grade === currentGradeFilter);

  app.innerHTML = `
    <div class="tab-nav">
      ${[3, 2, 1].map(g => `
        <button onclick="window.setGrade(${g})" 
          class="${currentGradeFilter === g ? 'active' : ''}">
          ${g}年生
        </button>
      `).join('')}
    </div>

    <div class="event-list">
      <p style="padding: 10px 16px; font-size: 0.8rem; color: #666; margin: 0;">
        ${currentGradeFilter}年生の企画を表示中（全 ${filtered.length} 件）
      </p>
      ${filtered.map(p => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <span class="badge">${p.dept}</span>
            <span class="badge" style="background: ${getStatusColor(p.status)}; color: white; border: none; font-size: 0.7rem;">
              ● ${p.status}
            </span>
          </div>
          <h3>${p.name}</h3>
          <div class="card-meta">
            <span class="loc" style="font-size: 0.85rem; font-weight: bold;">📍 ${p.location}</span>
            <span class="badge" style="background: #fff3e0; color: #e65100; border-color: #ffccbc; font-size: 0.7rem;">🕒 ${p.time}</span>
          </div>
          <p class="description" style="font-size: 0.85rem; color: #555; margin-top: 10px; line-height: 1.4;">
            ${p.description}
          </p>
        </div>
      `).join('')}
    </div>
  `;
}

// 混雑状況に応じた色の判定
function getStatusColor(status: string) {
  switch (status) {
    case '空き': return '#4caf50';
    case 'やや混雑': return '#ff9800';
    case '混雑': return '#f44336';
    default: return '#999';
  }
}

// グローバル関数への登録
(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

// 初回実行
render();
