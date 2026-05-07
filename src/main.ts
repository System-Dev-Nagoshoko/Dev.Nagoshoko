interface ClassProject {
  grade: number;
  dept: string;
  name: string;
  location: string;
  time: string;
  description: string;
  status: '空き' | 'やや混雑' | '混雑';
}

const departments = [
  "工業技術科 機械", 
  "工業技術科 電気", 
  "建築科", 
  "総合情報科", 
  "商業科", 
  "地域産業科"
];

const projectData: ClassProject[] = [];

departments.forEach(dept => {
  [3, 2, 1].forEach(grade => {
    projectData.push({
      grade,
      dept,
      name: `${dept} ${grade}年 企画`,
      location: `${grade}F ${dept.split(' ').pop()}実習室`,
      time: "09:30 - 15:30",
      description: `${dept}の${grade}年生による専門的な展示・体験です。`,
      status: '空き'
    });
  });
});

let currentGradeFilter = 3;

function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

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
            <span class="badge" style="background: ${getStatusColor(p.status)}; color: white; border: none; font-size: 0.75rem;">
              ● ${p.status}
            </span>
          </div>
          <h3 style="margin: 10px 0;">${p.name}</h3>
          <div class="card-meta">
            <span class="badge loc-badge">📍 ${p.location}</span>
          </div>
        </div>
      `).join('')}
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
