// src/components/EventModal.jsx
import React from 'react';
import dayjs from 'dayjs';

const EventModal = ({ event, onClose }) => {
  const start = dayjs(`${event.date} ${event.time}`);
  const end = start.add(event.duration, 'minute');

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg w-[300px] p-4">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-sm">
          <strong>Date:</strong> {start.format('MMMM D, YYYY')}
        </p>
        <p className="text-sm">
          <strong>Time:</strong> {start.format('hh:mm A')} – {end.format('hh:mm A')}
        </p>
        <p className="text-sm mb-4">
          <strong>Duration:</strong> {event.duration} minutes
        </p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
