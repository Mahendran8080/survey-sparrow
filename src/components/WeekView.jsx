// src/components/WeekView.jsx
import React from 'react';
import dayjs from 'dayjs';

const WeekView = ({ selectedDate, events, onEventClick }) => {
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const days = [...Array(7)].map((_, i) => startOfWeek.add(i, 'day'));

  const getEventsForDay = (date) =>
    events.filter((e) => e.date === date.format('YYYY-MM-DD'));

  return (
    <div className="grid grid-cols-8 gap-px bg-gray-200 dark:bg-gray-700">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 text-sm font-bold text-center">Time</div>
      {days.map((d) => (
        <div
          key={d.format('ddd')}
          className="bg-gray-100 dark:bg-gray-800 p-2 text-sm font-bold text-center"
        >
          {d.format('ddd D')}
        </div>
      ))}

      {/* Time blocks */}
      {[...Array(24)].map((_, hour) => (
        <React.Fragment key={hour}>
          <div className="bg-white dark:bg-black h-24 border-t border-gray-300 dark:border-gray-600 text-xs text-center pt-2">
            {dayjs().hour(hour).format('h A')}
          </div>
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const eventsAtHour = dayEvents.filter((e) => dayjs(`${e.date} ${e.time}`).hour() === hour);

            return (
              <div key={day + hour} className="relative bg-white dark:bg-black border-t border-gray-300 dark:border-gray-600 h-24">
                {eventsAtHour.map((e, i) => {
                  const start = dayjs(`${e.date} ${e.time}`);
                  const height = (e.duration / 60) * 96; // 96px = 1 hour block
                  const top = (start.minute() / 60) * 96;
                  return (
                    <div
                      key={i}
                      onClick={() => onEventClick(e)}
                      className="absolute left-1 right-1 px-1 py-0.5 text-xs text-white rounded shadow cursor-pointer"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: e.color || '#3b82f6',
                      }}
                    >
                      {e.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeekView;
