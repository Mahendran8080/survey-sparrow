// src/components/MonthView.jsx
import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const getMonthGrid = (selectedDate) => {
  const start = dayjs(selectedDate).startOf('month').startOf('week');
  const end = dayjs(selectedDate).endOf('month').endOf('week');
  const days = [];

  let day = start;
  while (day.isBefore(end, 'day')) {
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
    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div
          key={d}
          className="bg-gray-100 dark:bg-gray-800 p-2 font-semibold text-center text-sm"
        >
          {d}
        </div>
      ))}
      {days.map((day, idx) => {
        const isToday = day.isSame(today, 'day');
        const dayEvents = getEventsForDay(day);

        return (
          <div
            key={idx}
            className={classNames(
              'bg-white dark:bg-black min-h-[100px] border border-gray-300 dark:border-gray-600 p-1 text-xs overflow-hidden',
              { 'bg-blue-100 dark:bg-blue-900': isToday }
            )}
          >
            <div className="text-xs font-bold mb-1">
              {day.format('D')}
            </div>
            {dayEvents.map((event, i) => (
              <div
                key={i}
                onClick={() => onEventClick && onEventClick(event)}
                className="truncate cursor-pointer px-1 py-[2px] rounded mb-[2px] text-white"
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
