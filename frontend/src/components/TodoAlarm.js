import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const TodoAlarm = ({ todo, onStatusChange }) => {
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [status, setStatus] = useState("In Progress");
  const [hasNotified, setHasNotified] = useState(false);
  const [toastId, setToastId] = useState(null);

  const handleSnooze = useCallback(
    (id) => {
      toast.update(id, {
        render: `🔕 Snoozed for 5 minutes...`,
        autoClose: 5000,
        closeOnClick: true,
        type: "info",
      });

      setSnoozeCount((prev) => prev + 1);
      setHasNotified(false);

      setTimeout(() => {
        if (snoozeCount >= 2) {
          setStatus("Completed");
          onStatusChange("Completed");
        } else {
          const newToastId = toast.info(
            <div>
              ⏰ Reminder: {todo.title} is due now!
              <button
                onClick={() => handleSnooze(newToastId)}
                className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Snooze 5 min
              </button>
            </div>,
            { autoClose: false, closeOnClick: false }
          );

          setToastId(newToastId);
        }
      }, 5 * 60 * 1000);
    },
    [snoozeCount, onStatusChange, todo.title] // Dependencies
  );

  useEffect(() => {
    if (!todo?.time || !todo?.date || hasNotified || status === "Completed") return;

    const checkAlarm = () => {
      const currentTime = new Date();
      const todoTime = new Date(`${todo.date}T${todo.time}`);

      if (todoTime <= currentTime) {
        setHasNotified(true);

        const newToastId = toast.info(
          <div>
            ⏰ Reminder: {todo.title} is due now!
            <button
              onClick={() => handleSnooze(newToastId)}
              className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Snooze 5 min
            </button>
          </div>,
          { autoClose: false, closeOnClick: false }
        );

        setToastId(newToastId);
      }
    };

    checkAlarm();
    const interval = setInterval(checkAlarm, 5000);

    return () => clearInterval(interval);
  }, [todo?.date, todo?.time, status, hasNotified, handleSnooze,todo?.title]);

  return null;
};

export default TodoAlarm;
