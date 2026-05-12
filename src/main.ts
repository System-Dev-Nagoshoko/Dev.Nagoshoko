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
 
let currentGradeFilter = 3;
 
const getDeptColor = (dept: string): string => {

    if (dept.includes('機械')) return '#FF4B3E';

    if (dept.includes('電気')) return '#D4C500'; // 可読性のため少し濃い黄色に

    if (dept.includes('建築')) return '#FFB000';

    if (dept.includes('情報')) return '#76D25C';

    if (dept.includes('商業')) return '#40CFFF';

    if (dept.includes('地域創生')) return '#1E88E5';

    if (dept.includes('観光')) return '#8E24AA';

    return '#005bac';

};
 
const getStatusColor = (status: string) => {

    if (status === '混雑') return '#ff3b30';

    if (status === 'やや混雑') return '#ffcc00';

    return '#4cd964';

};
 
function render() {

    const app = document.querySelector<HTMLDivElement>('#app');

    const tabArea = document.querySelector<HTMLDivElement>('#tab-area');

    if (!app || !tabArea) return;
 
    // タブの更新

    tabArea.innerHTML = [3, 2, 1].map(g => `
<button onclick="window.setGrade(${g})" class="${currentGradeFilter === g ? 'active' : ''}">

            ${g}年生
</button>

    `).join('');
 
    // リストの更新

    app.innerHTML = departments.map(dept => {

        const color = getDeptColor(dept);

        const status: ClassProject['status'] = '空き'; // 初期値

        return `
<div class="card" style="border-left: 6px solid ${color};">
<span class="badge" style="border: 1.5px solid ${color}; color: ${color};">

                    ${dept}
</span>
<h3 style="margin: 4px 0 8px; font-size: 1.05rem;">

                    ${currentGradeFilter}年：${dept.split(' ').pop()}企画
</h3>
<div style="display: flex; justify-content: space-between; align-items: flex-end;">
<div style="font-size: 0.85rem; font-weight: bold; color: #555;">

                        📍 ${currentGradeFilter}F 実習室
</div>
<div class="status-dot" style="color: ${getStatusColor(status)};">
<span style="font-size: 1.2rem; margin-right: 4px;">●</span>${status}
</div>
</div>
</div>

        `;

    }).join('');

}
 
// グローバルに関数を公開

(window as any).setGrade = (g: number) => {

    currentGradeFilter = g;

    render();

};
 
// 初回実行

render();
 
