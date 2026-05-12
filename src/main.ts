// インターフェース定義

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
 
const getDeptColor = (dept: string) => {

    if (dept.indexOf('機械') !== -1) return '#FF4B3E';

    if (dept.indexOf('電気') !== -1) return '#D4C500';

    if (dept.indexOf('建築') !== -1) return '#FFB000';

    if (dept.indexOf('情報') !== -1) return '#76D25C';

    if (dept.indexOf('商業') !== -1) return '#40CFFF';

    if (dept.indexOf('地域創生') !== -1) return '#1E88E5';

    if (dept.indexOf('観光') !== -1) return '#8E24AA';

    return '#005bac';

};
 
const getStatusColor = (status: string) => {

    if (status === '混雑') return '#ff3b30';

    if (status === 'やや混雑') return '#ffcc00';

    return '#4cd964';

};
 
function render() {

    const app = document.getElementById('app');

    const tabArea = document.getElementById('tab-area');

    if (!app || !tabArea) return;
 
    // タブの生成

    const grades = [3, 2, 1];

    let tabHtml = '';

    for (let i = 0; i < grades.length; i++) {

        const g = grades[i];

        const activeClass = currentGradeFilter === g ? 'active' : '';

        tabHtml += `<button onclick="setGrade(${g})" class="${activeClass}">${g}年生</button>`;

    }

    tabArea.innerHTML = tabHtml;
 
    // リストの生成

    let listHtml = '';

    for (let j = 0; j < departments.length; j++) {

        const dept = departments[j];

        const color = getDeptColor(dept);

        const status = '空き';

        const deptName = dept.split(' ').pop();
 
        listHtml += `
<div class="card" style="border-left: 6px solid ${color};">
<span class="badge" style="border: 1.5px solid ${color}; color: ${color};">

                    ${dept}
</span>
<h3 style="margin: 4px 0 8px; font-size: 1.05rem;">

                    ${currentGradeFilter}年：${deptName}企画
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

    }

    app.innerHTML = listHtml;

}
 
// Windowオブジェクトへ登録（エラー回避のため明示的に）

(window as any).setGrade = function(g: number) {

    currentGradeFilter = g;

    render();

};
 
// 初回実行

render();
 
