interface ClassProject {
  grade: number;
  dept: string;
  name: string;
  location: string;
  time: string;
  description: string;
  status: '空き' | 'やや混雑' | '混雑';
}

/**
 * 名護商工高校 学科・コース構成
 */
const departments = [
  "工業技術科 機械", 
  "工業技術科 電気", 
  "建築科", 
  "総合情報科", 
  "商業科", 
  "地域産業科"
];

const projectData: ClassProject[] = [];

// 各学科・学年ごとのデータを生成
departments.forEach(dept => {
  [3, 2, 1].forEach(grade => {
    projectData.push({
      grade,
      dept,
      name: `${dept} ${grade}年 企画`,
      // 教室名の自動設定（例：建築科 -> 建築実習室）
      location: `${grade}F ${dept.split(' ').pop()}実習室`,
      time: "09:30 - 15:30",
      description: `${dept}の${grade}年生による、学習成果を活かした専門的な展示・体験です。`,
      status: '空き'
    });
  });
});

let currentGradeFilter = 3;

/**
 * 画面描画関数
 */
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
        ${currentGradeFilter}年生の企画を表示中
      </p>
      ${filtered.map(p => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <span class="badge" style="font-size: 0.7rem;">${p.dept}</span>
            <span style="font-size: 0.8rem; font-weight: bold; color: ${getStatusColor(p.status)};">
              ● ${p.status}
            </span>
          </div>
          <h3 style="margin: 8px 0; font-size: 1.1rem;">${p.name}</h3>
          <div style="font-size: 0.85rem; font-weight: bold; margin-bottom: 5px;">
            📍 ${p.location}
          </div>
          <p style="font-size: 0.8rem; color: #555; margin: 0; line-height: 1.4;">
            ${p.description}
          </p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * 混雑状況のカラー判定
 */
function getStatusColor(status: string) {
  switch (status) {
    case '空き': return '#4caf50';
    case 'やや混雑': return '#ff9800';
    case '混雑': return '#f44336';
    default: return '#999';
  }
}

/**
 * グローバルに関数を公開（HTMLのonclickから呼べるようにする）
 */
(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

// 初回実行
render();
