import React from 'react';
import { AlertTriangle, CalendarCheck2, Users, PenTool } from 'lucide-react';

const legendItems = [
  { label: 'Office', color: 'bg-blue-500', icon: <CalendarCheck2 size={16} /> },
  { label: 'Meeting', color: 'bg-green-500', icon: <Users size={16} /> },
  { label: 'Design', color: 'bg-pink-500', icon: <PenTool size={16} /> },
];

const Sidebar = ({ conflicts }) => {
  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Legend</h2>
      <ul className="space-y-2 mb-8">
        {legendItems.map(({ label, color, icon }) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mb-4">Conflicts</h2>
      {conflicts.length === 0 ? (
        <p className="text-sm text-gray-500">No conflicts</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {conflicts.map(([a, b], index) => (
            <li
              key={index}
              className="bg-red-50 dark:bg-red-900/30 p-2 rounded border border-red-400"
            >
              <div className="flex items-center gap-1 text-red-600 font-medium">
                <AlertTriangle size={14} /> Conflict on {a.date}
              </div>
              <div className="mt-1 text-xs">
                <strong>{a.title}</strong>: {a.time} ({a.duration} min)<br />
                <strong>{b.title}</strong>: {b.time} ({b.duration} min)
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
