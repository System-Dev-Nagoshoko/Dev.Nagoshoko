// (これまでの ClassProject 定義や departments 等はそのまま)

/**
 * 学科名からカラーを取得する関数
 */
function getDeptColor(dept: string): string {
  if (dept.includes('機械')) return '#e53935';   // 赤
  if (dept.includes('電気')) return '#fb8c00';   // 橙
  if (dept.includes('建築')) return '#7cb342';   // 黄緑
  if (dept.includes('総合情報')) return '#1e88e5'; // 青
  if (dept.includes('商業')) return '#8e24aa';   // 紫
  if (dept.includes('地域産業')) return '#f06292'; // ピンク
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
        return `
          <div class="card" style="border-left: 8px solid ${deptColor};">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <span class="badge" style="background: none; border: 1px solid ${deptColor}; color: ${deptColor}; font-size: 0.7rem;">
                ${p.dept}
              </span>
              <span style="font-size: 0.8rem; font-weight: bold; color: ${getStatusColor(p.status)};">
                ● ${p.status}
              </span>
            </div>
            <h3 style="margin: 8px 0; font-size: 1.1rem;">${p.name}</h3>
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

// (getStatusColor, setGrade, render初回実行などはそのまま)
