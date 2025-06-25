// src/components/MonthView.jsx
import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const getMonthGrid = (selectedDate) => {
  const start = dayjs(selectedDate).startOf('month').startOf('week');
  const end = dayjs(selectedDate).endOf('month').endOf('week');
  const days = [];

  let day = start;
  while (day.isBefore(end, 'day') || day.isSame(end, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  return days;
};

const MonthView = ({ selectedDate, events, onEventClick }) => {
  const days = getMonthGrid(selectedDate);
  const today = dayjs();

  const getEventsForDay = (date) =>
    events.filter((e) => e.date === date.format('YYYY-MM-DD'));

  return (
    <div className="grid grid-cols-7 gap-[1px] bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div
          key={d}
          className="bg-gray-100 dark:bg-gray-800 p-2 font-medium text-center text-sm"
        >
          {d}
        </div>
      ))}

      {days.map((day, idx) => {
        const isToday = day.isSame(today, 'day');
        const isWeekend = day.day() === 0 || day.day() === 6; // 0 = Sunday, 6 = Saturday
        const dayEvents = getEventsForDay(day);

        return (
          <div
            key={idx}
            className={classNames(
              'min-h-[120px] p-2 border border-gray-200 dark:border-gray-600 transition-all',
              {
                'bg-blue-50 dark:bg-blue-900 ring-2 ring-blue-600': isToday,
                'bg-green-50 dark:bg-green-900': isWeekend && !isToday,
                'bg-white dark:bg-black': !isToday && !isWeekend,
              }
            )}
          >
            <div
              className={classNames('text-xs font-semibold mb-1', {
                'text-blue-700 dark:text-blue-300': isToday,
              })}
            >
              {day.format('D')}
            </div>

            {dayEvents.map((event, i) => (
              <div
                key={i}
                onClick={() => onEventClick && onEventClick(event)}
                className="truncate cursor-pointer px-2 py-1 rounded mb-1 text-white text-xs shadow hover:opacity-90 transition-all"
                style={{ backgroundColor: event.color || '#3b82f6' }}
              >
                {event.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
