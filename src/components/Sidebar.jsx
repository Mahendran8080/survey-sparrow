import React from 'react';
import { AlertTriangle, CalendarCheck2, Users, PenTool } from 'lucide-react';
import logo from '../logo.avif'; // Adjust path if needed

const legendItems = [
  { label: 'Office', color: 'bg-blue-500', icon: <CalendarCheck2 size={16} /> },
  { label: 'Meeting', color: 'bg-green-500', icon: <Users size={16} /> },
  { label: 'Design', color: 'bg-pink-500', icon: <PenTool size={16} /> },
];

const Sidebar = ({ conflicts }) => {
  return (
    <div className="w-72 border-r border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 overflow-y-auto shadow-sm">
      
      {/* Logo & Company Name */}
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="Company Logo" className="w-9 h-9" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Survey Sparrow</h1>
      </div>

      {/* Legend Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
          Legend
        </h2>
        <ul className="space-y-3 mt-3">
          {legendItems.map(({ label, color, icon }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className={`w-3 h-3 rounded-full ${color}`}></span>
              {icon}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Conflicts Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">
          Conflicts
        </h2>
        {conflicts.length === 0 ? (
          <p className="text-sm text-gray-500 mt-3">No conflicts</p>
        ) : (
          <ul className="space-y-4 mt-3">
            {conflicts.map(([a, b], index) => (
              <li
                key={index}
                className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg border border-red-300 dark:border-red-500 shadow-sm"
              >
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-medium">
                  <AlertTriangle size={16} />
                  Conflict on <span className="font-semibold">{a.date}</span>
                </div>
                <div className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                  <strong>{a.title}</strong>: {a.time} ({a.duration} min)<br />
                  <strong>{b.title}</strong>: {b.time} ({b.duration} min)
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
