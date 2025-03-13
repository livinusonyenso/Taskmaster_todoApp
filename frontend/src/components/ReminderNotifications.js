import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reminder Notification Component
const ReminderNotifications = ({ todos = [], onSnooze }) => {
  const [notifiedTasks, setNotifiedTasks] = useState({}); // Track notified tasks

  useEffect(() => {
    const checkReminders = () => {
      if (!Array.isArray(todos)) return;

      const now = new Date();
      let nextDueTask = null; // Store the first due task

      todos.forEach((todo) => {
        let reminderTime = todo.reminderTime ? new Date(todo.reminderTime) : null;

        // If reminderTime is missing, use todo.time
        if (!reminderTime && todo.date && todo.time) {
          const [hours, minutes] = todo.time.split(":").map(Number);
          reminderTime = new Date(`${todo.date} ${hours}:${minutes}:00`);
        }

        console.log("🔍 Checking Reminder:", {
          task: todo.title,
          reminderTime: reminderTime ? reminderTime.toLocaleString() : "Not Set",
          currentTime: now.toLocaleString(),
          isDue: reminderTime && reminderTime <= now,
        });

        // If this task is due and has a new reminder time, store it
        if (
          reminderTime &&
          reminderTime <= now &&
          !todo.dismissed &&
          (!notifiedTasks[todo.id] || notifiedTasks[todo.id] !== reminderTime.toISOString()) // Check if new time
        ) {
          nextDueTask = todo;
        }
      });

      if (nextDueTask) {
        showNotification(nextDueTask, onSnooze);
        setNotifiedTasks((prev) => ({
          ...prev,
          [nextDueTask.id]: nextDueTask.reminderTime, // Track latest reminder time
        }));
      }
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todos, onSnooze]);

  const showNotification = (todo, onSnooze) => {
    if (window.innerWidth <= 768 && navigator.vibrate) {
      // Mobile: Vibrate
      navigator.vibrate(1000); // Vibrates for 1 second
    } else {
      // Desktop: Toast Notification for the current due task
      toast.info(
        <div>
          ⏰ Reminder: <strong>{todo.title}</strong> is due!
          <br />
          <button
            onClick={() => handleSnooze(todo, onSnooze)}
            className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded"
          >
            Snooze 5 min
          </button>
        </div>,
        { autoClose: false }
      );
    }
  };

  const handleSnooze = (todo, onSnooze) => {
    if (typeof onSnooze !== "function") {
      console.error("❌ Error: onSnooze is not a function.");
      return;
    }

    const newReminderTime = new Date();
    newReminderTime.setMinutes(newReminderTime.getMinutes() + 5);
    onSnooze(todo.id, newReminderTime);

    // Reset notification tracking for this task
    setNotifiedTasks((prev) => ({
      ...prev,
      [todo.id]: newReminderTime.toISOString(), // Reset when snoozed
    }));

    toast.dismiss(); // Close notification after snoozing

    if (window.innerWidth <= 768 && navigator.vibrate) {
      navigator.vibrate(500); // Vibrates for 0.5 seconds after snooze
    } else {
      toast.info("🔔 Snoozed for 5 minutes!");
    }
  };

  return null;
};

export default ReminderNotifications;
