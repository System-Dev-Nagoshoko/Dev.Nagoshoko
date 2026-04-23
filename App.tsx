import React, { useState } from 'react';

// --- 1. データ定義（JSONの代わりにここに直接書く） ---
interface EventProject {
  id: number;
  title: string;
  location: string;
  time: string;
  description: string;
  category: '展示' | '飲食' | 'ステージ';
}

const EVENT_DATA: EventProject[] = [
  {
    id: 1,
    title: "デジタルアート展",
    location: "3F 第1会議室",
    time: "10:00 - 16:00",
    description: "最新技術を使った体験型アート。光と音の演出をお楽しみください。",
    category: "展示"
  },
  {
    id: 2,
    title: "青空カフェ",
    location: "中庭広場",
    time: "11:00 - 15:00",
    description: "地元野菜を使ったサンドイッチと自家製レモネードを販売中。",
    category: "飲食"
  },
  {
    id: 3,
    title: "学生ライブパフォーマンス",
    location: "屋外特設ステージ",
    time: "13:30 - 14:30",
    description: "地元の学生バンド3組による熱いライブをお届けします！",
    category: "ステージ"
  }
];

// --- 2. メインコンポーネント ---
export const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('すべて');

  // フィルタリング処理
  const filteredEvents = filter === 'すべて' 
    ? EVENT_DATA 
    : EVENT_DATA.filter(item => item.category === filter);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', background: '#f9f9f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* ヘッダー */}
      <header style={{ background: '#007AFF', color: 'white', padding: '20px', textAlign: 'center', position: 'sticky', top: 0 }}>
        <h1 style={{ margin: 0, fontSize: '1.2rem' }}>イベント案内 2026</h1>
      </header>

      {/* カテゴリ選択 */}
      <div style={{ display: 'flex', gap: '8px', padding: '15px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {['すべて', '展示', '飲食', 'ステージ'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: filter === cat ? '#007AFF' : '#e0e0e0',
              color: filter === cat ? 'white' : '#333',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* リスト表示 */}
      <main style={{ padding: '0 15px 100px' }}>
        {filteredEvents.map(event => (
          <div key={event.id} style={{ background: 'white', borderRadius: '12px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', background: '#eef2ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '4px' }}>{event.category}</span>
              <span style={{ fontSize: '0.85rem', color: '#666' }}>🕒 {event.time}</span>
            </div>
            <h3 style={{ margin: '10px 0 5px', fontSize: '1.1rem' }}>{event.title}</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#007AFF', fontWeight: 'bold' }}>📍 {event.location}</p>
            <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#444', lineHeight: '1.5' }}>{event.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};
