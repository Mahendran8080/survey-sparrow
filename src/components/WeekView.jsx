// src/components/WeekView.jsx
import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

const WeekView = ({ selectedDate, events, onEventClick }) => {
  const startOfWeek = dayjs(selectedDate).startOf('week');
  const today = dayjs();
  const days = [...Array(7)].map((_, i) => startOfWeek.add(i, 'day'));

  const getEventsForDay = (date) =>
    events.filter((e) => e.date === date.format('YYYY-MM-DD'));

  return (
    <div className="grid grid-cols-8 gap-[1px] bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white">
      {/* Header Row */}
      <div className="bg-gray-100 dark:bg-gray-800 p-2 text-center text-sm font-bold">Time</div>
      {days.map((d) => {
        const isToday = d.isSame(today, 'day');
        const isWeekend = d.day() === 0 || d.day() === 6;

        return (
          <div
            key={d.format('YYYY-MM-DD')}
            className={classNames(
              'p-2 text-center text-sm font-bold',
              {
                'bg-blue-100 dark:bg-blue-900': isToday,
                'bg-green-100 dark:bg-green-900': isWeekend && !isToday,
                'bg-gray-100 dark:bg-gray-800': !isToday && !isWeekend,
              }
            )}
          >
            {d.format('ddd D')}
          </div>
        );
      })}

      {/* Time Blocks */}
      {[...Array(24)].map((_, hour) => (
        <React.Fragment key={hour}>
          {/* Time label */}
          <div className="bg-white dark:bg-black h-24 border-t border-gray-200 dark:border-gray-600 text-xs text-center pt-2">
            {dayjs().hour(hour).format('h A')}
          </div>

          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const eventsAtHour = dayEvents.filter(
              (e) => dayjs(`${e.date} ${e.time}`).hour() === hour
            );

            const isToday = day.isSame(today, 'day');
            const isWeekend = day.day() === 0 || day.day() === 6;

            return (
              <div
                key={day.format('YYYY-MM-DD') + hour}
                className={classNames(
                  'relative border-t h-24 transition-all',
                  {
                    'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-600': isToday,
                    'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-600': isWeekend && !isToday,
                    'bg-white dark:bg-black border-gray-200 dark:border-gray-600': !isToday && !isWeekend,
                  }
                )}
              >
                {eventsAtHour.map((e, i) => {
                  const start = dayjs(`${e.date} ${e.time}`);
                  const height = (e.duration / 60) * 96; // 96px = 1 hour
                  const top = (start.minute() / 60) * 96;

                  return (
                    <div
                      key={i}
                      onClick={() => onEventClick(e)}
                      className="absolute left-1 right-1 px-2 py-[2px] text-xs text-white rounded shadow-md cursor-pointer hover:opacity-90 transition-all"
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
