import React from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

const Navbar = ({
  selectedDate,
  onToday,
  onPrev,
  onNext,
  view,
  setView,
  onToggleTheme,
  currentTheme,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow">
      {/* Left Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
        >
          Today
        </button>
        <button
          onClick={onPrev}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronRight size={20} />
        </button>
        <h2 className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">
          {view === 'month'
            ? selectedDate.format('MMMM YYYY')
            : `${selectedDate.startOf('week').format('MMM D')} - ${selectedDate
                .endOf('week')
                .format('MMM D, YYYY')}`}
        </h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* View Toggle */}
        <button
          onClick={() => setView('month')}
          className={`px-3 py-1 rounded text-sm ${
            view === 'month'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setView('week')}
          className={`px-3 py-1 rounded text-sm ${
            view === 'week'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          Week
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
          title="Toggle Theme"
        >
          {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
