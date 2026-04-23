// 1. 型定義
interface ClassEvent {
  grade: number;  // 学年 (1, 2, 3)
  group: number;  // 組 (1, 2, 3, 4, 5)
  name: string;
  place: string;
  info: string;
}

interface Department {
  id: string;
  name: string;
  icon: string;
  allClasses: ClassEvent[];
}

// 2. データ生成（一気に75クラス分作成）
const deptNames = ["機械科", "電気科", "総合情報科", "商業科", "地域産業科"];
const icons = ["⚙️", "⚡", "💻", "💹", "🌿"];
const ids = ["mechanical", "electrical", "info", "business", "local"];

const departments: Department[] = ids.map((id, index) => ({
  id,
  name: deptNames[index],
  icon: icons[index],
  // 各学科ごとに 1〜3学年 × 1〜5組 を自動生成
  allClasses: [1, 2, 3].flatMap(g => 
    [1, 2, 3, 4, 5].map(c => ({
      grade: g,
      group: c,
      name: "準備中",
      place: `${g}年${c}組 教室`,
      info: "展示内容が決まり次第更新します"
    }))
  )
}));

// 状態管理（現在選択されている 学科 と 学年）
let currentDeptId = "mechanical";
let currentGrade = 3; // デフォルトは3年生

// 3. 描画ロジック
function render() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const currentDept = departments.find(d => d.id === currentDeptId)!;
  // 選択中の学年のクラスだけを抽出
  const displayClasses = currentDept.allClasses.filter(c => c.grade === currentGrade);

  // 学科選択タブ
  const deptNav = `
    <div class="tab-nav">
      ${departments.map(d => `
        <button onclick="window.setDept('${d.id}')" class="${d.id === currentDeptId ? 'active' : ''}">
          <span style="font-size:1.1rem">${d.icon}</span><br>${d.name}
        </button>
      `).join('')}
    </div>
  `;

  // 学年選択スイッチ
  const gradeNav = `
    <div style="display: flex; justify-content: center; gap: 10px; padding: 15px; background: #fff;">
      ${[3, 2, 1].map(g => `
        <button onclick="window.setGrade(${g})" 
          style="flex:1; padding: 10px; border-radius: 20px; border: 1px solid var(--nago-blue); 
          background: ${currentGrade === g ? 'var(--nago-blue)' : 'white'}; 
          color: ${currentGrade === g ? 'white' : 'var(--nago-blue)'}; font-weight: bold;">
          ${g}年生
        </button>
      `).join('')}
    </div>
  `;

  // カード一覧
  const listHtml = `
    <div class="event-list">
      <h2 style="font-size: 1rem; color: #666; margin-left: 5px;">
        ${currentDept.name}：${currentGrade}年生
      </h2>
      ${displayClasses.map(c => `
        <div class="card">
          <h3 style="margin:0; color:var(--nago-navy);">${c.group}組：${c.name}</h3>
          <div class="card-meta">
            <span class="badge">場所</span>
            <p class="loc">${c.place}</p>
          </div>
          <p style="font-size:0.85rem; color:#555; margin-top:8px;">${c.info}</p>
        </div>
      `).join('')}
    </div>
  `;

  app.innerHTML = deptNav + gradeNav + listHtml;
}

// グローバル関数
(window as any).setDept = (id: string) => { currentDeptId = id; render(); };
(window as any).setGrade = (g: number) => { currentGrade = g; render(); };

render();
