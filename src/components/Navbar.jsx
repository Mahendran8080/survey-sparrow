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
    <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Nav Buttons */}
        <button
          onClick={onPrev}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={onToday}
          className="px-4 py-1.5 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Today
        </button>

        <button
          onClick={onNext}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <ChevronRight size={18} />
        </button>

        {/* Month / Week Label */}
        <h2 className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">
          {view === 'month'
            ? selectedDate.format('MMMM YYYY')
            : `${selectedDate.startOf('week').format('MMM D')} - ${selectedDate
                .endOf('week')
                .format('MMM D, YYYY')}`}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* View Toggle */}
        <button
          onClick={() => setView('month')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            view === 'month'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setView('week')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            view === 'week'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Week
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          title="Toggle Theme"
        >
          {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
