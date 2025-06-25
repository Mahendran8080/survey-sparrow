import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import EventModal from './components/EventModal';
import dayjs from 'dayjs';
import './App.css';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const App = () => {
  const [view, setView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Theme controller
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToday = () => setSelectedDate(dayjs());

  const handlePrev = () => {
    setSelectedDate(prev =>
      view === 'month' ? prev.subtract(1, 'month') : prev.subtract(1, 'week')
    );
  };

  const handleNext = () => {
    setSelectedDate(prev =>
      view === 'month' ? prev.add(1, 'month') : prev.add(1, 'week')
    );
  };

  const detectConflicts = (visibleEvents) => {
    const conflicts = [];
    for (let i = 0; i < visibleEvents.length; i++) {
      for (let j = i + 1; j < visibleEvents.length; j++) {
        const a = visibleEvents[i];
        const b = visibleEvents[j];
        if (a.date === b.date) {
          const aStart = dayjs(`${a.date}T${a.time}`);
          const aEnd = aStart.add(a.duration, 'minute');
          const bStart = dayjs(`${b.date}T${b.time}`);
          const bEnd = bStart.add(b.duration, 'minute');
          if (aStart.isBefore(bEnd) && bStart.isBefore(aEnd)) {
            conflicts.push([a, b]);
          }
        }
      }
    }
    return conflicts;
  };

  const getConflicts = () => {
    const start = view === 'month'
      ? selectedDate.startOf('month').startOf('week')
      : selectedDate.startOf('week');

    const end = view === 'month'
      ? selectedDate.endOf('month').endOf('week')
      : selectedDate.endOf('week');

    const visibleEvents = events.filter((e) =>
      dayjs(e.date).isBetween(start, end, null, '[]')
    );

    return detectConflicts(visibleEvents);
  };

  return (
  <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    
    {/* ✅ Sidebar hidden on mobile */}
    <div className="hidden md:block">
      <Sidebar conflicts={getConflicts()} />
    </div>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
      <Navbar
        selectedDate={selectedDate}
        onToday={handleToday}
        onPrev={handlePrev}
        onNext={handleNext}
        view={view}
        setView={setView}
        onToggleTheme={toggleTheme}
        currentTheme={theme}
      />

      <main className="flex-1 overflow-auto">
        {view === 'month' ? (
          <MonthView
            selectedDate={selectedDate}
            events={events}
            onEventClick={(event) => setSelectedEvent(event)}
          />
        ) : (
          <WeekView
            events={events}
            selectedDate={selectedDate}
            onEventClick={(event) => setSelectedEvent(event)}
          />
        )}
      </main>
    </div>

    {selectedEvent && (
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    )}
  </div>
);

};

export default App;
