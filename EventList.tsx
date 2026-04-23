interface EventProject {
  id: string;
  title: string;
  location: string;
  time: string;
  category: 'food' | 'stage' | 'exhibit';
}

const EventList: React.FC = () => {
  const projects: EventProject[] = [
    { id: '1', title: 'キッチンカー・フェス', location: '中庭エリア', time: '10:00 - 17:00', category: 'food' },
    { id: '2', title: '学生バンドLIVE', location: 'メインステージ', time: '13:00 - 14:30', category: 'stage' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold border-l-4 border-blue-500 pl-2">本日の企画一覧</h2>
      {projects.map(project => (
        <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{project.title}</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{project.category}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">📍 {project.location}</p>
          <p className="text-sm text-gray-500 mt-1">🕒 {project.time}</p>
        </div>
      ))}
    </div>
  );
};
