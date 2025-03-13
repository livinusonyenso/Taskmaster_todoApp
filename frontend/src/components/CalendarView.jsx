import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ todos }) => {
  useEffect(() => {
    console.log("Todos received in CalendarView:", todos);
  }, [todos]);

  useEffect(() => {
    console.log("Component mounted");
    console.log("Todos received in CalendarView:", todos);
  }, [todos]);
  

  // Check if todos exist and have valid dates
  const events = todos
    .filter(todo => todo.date) // Ensure date exists
    .map((todo) => {
      const parsedDate = moment(todo.date, "YYYY-MM-DD", true);
      
      if (!parsedDate.isValid()) {
        console.error(`Invalid date found in todo:`, todo);
        return null; // Skip invalid dates
      }

      return {
        title: todo.title,
        start: parsedDate.toDate(),
        end: parsedDate.toDate(),
        allDay: true,
      };
    })
    .filter(event => event !== null); // Remove invalid events

  console.log("Formatted events for Calendar:", events);

  return (
    <div className="calendar-container" style={{ height: 500 }}>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No valid tasks available for the calendar.</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      )}
    </div>
  );
};

export default CalendarView;
