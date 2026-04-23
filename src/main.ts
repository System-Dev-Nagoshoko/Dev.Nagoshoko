// 型定義
interface Project {
  title: string;
  loc: string;
}

// データ
const projects: Project[] = [
  { title: "総合案内", loc: "1F エントランス" },
  { title: "会場マップ", loc: "2F ホール" }
];

// 画面に表示するロジック
const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  app.innerHTML = `
    <h1>Event Guide</h1>
    ${projects.map(p => `<div><h3>${p.title}</h3><p>${p.loc}</p></div>`).join('')}
  `;
}
