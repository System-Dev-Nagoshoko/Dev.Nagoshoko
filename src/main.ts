interface ClassProject {
  grade: number;
  dept: string;
  name: string;
  location: string;
  status: '空き' | 'やや混雑' | '混雑';
}

const departments = [
  "工業技術科 機械コース", 
  "工業技術科 電気コース", 
  "建築科", 
  "総合情報科", 
  "商業科", 
  "地域産業科 地域創生類型",
  "地域産業科 観光類型"
];

const getDeptColor = (dept: string): string => {
  if (dept.includes('機械')) return '#FF4B3E';   // 赤
  if (dept.includes('電気')) return '#FFF100';   // 黄
  if (dept.includes('建築')) return '#FFB000';   // 橙
  if (dept.includes('情報')) return '#76D25C';   // 緑
  if (dept.includes('商業')) return '#40CFFF';   // 水色
  if (dept.includes('地域創生')) return '#1E88E5'; // 青
  if (dept.includes('観光')) return '#8E24AA';     // 紫
  return '#005bac';
};

let currentGradeFilter = 3;

function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="tab-nav">
      ${[3, 2, 1].map(g => `
        <button onclick="window.setGrade(${g})" class="${currentGradeFilter === g ? 'active' : ''}">${g}年生</button>
      `).join('')}
    </div>
    <div class="event-list">
      ${departments.map(dept => {
        const color = getDeptColor(dept);
        return `
          <div class="card" style="border-left: 8px solid ${color};">
            <span class="badge" style="border: 1.5px solid ${color}; color: ${color};">${dept}</span>
            <h3 style="margin: 8px 0;">${dept} ${currentGradeFilter}年 企画</h3>
            <div style="font-weight: bold; color: ${color};">📍 ${currentGradeFilter}F 実習室</div>
            <div style="text-align: right; color: #4caf50; font-weight: bold;">● 空き</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

(window as any).setGrade = (g: number) => {
  currentGradeFilter = g;
  render();
};

render();
