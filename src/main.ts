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
 * 名護商工高校 公式カラーに基づいた学科・コース構成
 */
const departments = [
  "工業技術科 機械コース", 
  "工業技術科 電気コース", 
  "建築科", 
  "総合情報科", 
  "商業科", 
  "地域産業科 地域創生類型",
  "地域産業科 観光類型"
];

const projectData: ClassProject[] = [];

departments.forEach(dept => {
  [3, 2, 1].forEach(grade => {
    projectData.push({
      grade,
      dept,
      name: `${dept} ${grade}年 企画`,
      // 教室名の自動設定（例：電気コース -> 電気実習室）
      location: `${grade}F ${dept.split(' ').pop()?.replace('コース', '').replace('類型', '')}実習室`,
      time: "09:30 - 15:30",
      description: `${dept}の${grade}年生による、学習成果を活かした専門的な展示・体験です。`,
      status: '空き'
    });
  });
});

let currentGradeFilter = 3;

/**
 * 画像に基づいた公式学科カラーを取得
 */
function getDeptColor(dept: string): string {
  if (dept.includes('機械')) return '#FF4B3E';   // 赤（機械）
  if (dept.includes('電気')) return '#FFF100';   // 黄（電気）
  if (dept.includes('建築')) return '#FFB000';   // 橙（建築）
  if (dept.includes('情報')) return '#76D25C';   // 緑（情報）
  if (dept.includes('商業')) return '#40CFFF';   // 水色（商業）
  if (dept.includes('地域創生')) return '#1E88E5'; // 青（地産・創生）
  if (dept.includes('観光')) return '#8E24AA';     // 紫（地産・観光）
  return '#005bac'; 
}

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
      ${filtered.map(p => {
        const deptColor = getDeptColor(p.dept);
        // 電気(黄色)などは白文字が見づらいため、背景を白、文字に色を付ける
        return `
          <div class="card" style="border-left: 8px solid ${deptColor};">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <span class="badge" style="background: white; border: 1.5px solid ${deptColor}; color: ${deptColor}; font-weight: 800; font-size: 0.75rem;">
                ${p.dept}
              </span>
              <span style="font-size: 0.8rem; font-weight: bold; color: ${getStatusColor(p.status)};">
                ● ${p.status}
              </span>
            </div>
            <h3 style="margin: 8px 0; font-size: 1.1rem; color: var(--nago-navy);">${p.name}</h3>
            <div style="font-size: 0.85rem; font-weight: bold; margin-bottom: 5px; color: ${deptColor};">
              📍 ${p.location}
            </div>
            <p style="font-size: 0.8rem; color: #555; margin: 0; line-height: 1.4;">
              ${p.description}
            </p>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getStatusColor(status: string) {
  switch (status) {
    case '空き': return '#4caf50';
    case 'やや混雑': return '#ff9800';
    case '混雑': return '#f44336';
    default: return '#999';
  }
}

(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

render();
