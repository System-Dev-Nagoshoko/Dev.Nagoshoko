import React, { useState } from 'react';

// 型定義：ナビゲーションのタブ
type Tab = 'map' | 'events' | 'info';

const EventLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('events');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* 固定ヘッダー */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-center text-blue-600">Event Guide 2026</h1>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-1 pb-20 px-4 pt-4">
        {activeTab === 'map' && <VenueMap />}
        {activeTab === 'events' && <EventList />}
        {activeTab === 'info' && <GeneralInfo />}
      </main>

      {/* ボトムナビゲーション (スマホ最適化) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around pb-safe-area-inset-bottom">
        <NavButton 
          label="マップ" 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
        />
        <NavButton 
          label="企画一覧" 
          active={activeTab === 'events'} 
          onClick={() => setActiveTab('events')} 
        />
        <NavButton 
          label="お知らせ" 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')} 
        />
      </nav>
    </div>
  );
};

// ナビボタンのサブコンポーネント
const NavButton: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 text-sm font-medium transition-colors ${active ? 'text-blue-600' : 'text-gray-500'}`}
  >
    {label}
  </button>
);

export default EventLayout;
