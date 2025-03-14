import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reminder Notification Component
const ReminderNotifications = ({ todos = [], onSnooze }) => {
  const [notifiedTasks, setNotifiedTasks] = useState(new Set()); // Use Set to track notified tasks

  useEffect(() => {
    const checkReminders = () => {
      if (!Array.isArray(todos)) return;

      const now = new Date();

      todos.forEach((todo) => {
        let reminderTime = todo.reminderTime ? new Date(todo.reminderTime) : null;

        // If reminderTime is missing, use todo.time
        if (!reminderTime && todo.date && todo.time) {
          const [hours, minutes] = todo.time.split(":").map(Number);
          reminderTime = new Date(`${todo.date} ${hours}:${minutes}:00`);
        }

        // If task is due and has not been notified, show notification once
        if (
          reminderTime &&
          reminderTime <= now &&
          !todo.dismissed &&
          !notifiedTasks.has(todo.id) // Ensure it hasn’t been notified
        ) {
          showNotification(todo, onSnooze);

          // Mark as notified
          setNotifiedTasks((prev) => new Set([...prev, todo.id]));
        }
      });
    };

    checkReminders(); // Run immediately on mount
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [todos, onSnooze]);

  const showNotification = (todo, onSnooze) => {
    if (window.innerWidth <= 768 && navigator.vibrate) {
      navigator.vibrate(1000); // Vibrate for 1 second
    } else {
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

    // Remove from notified tasks so it can be re-notified when snoozed
    setNotifiedTasks((prev) => {
      const updated = new Set(prev);
      updated.delete(todo.id);
      return updated;
    });

    toast.dismiss(); // Close notification after snoozing

    if (window.innerWidth <= 768 && navigator.vibrate) {
      navigator.vibrate(500); // Vibrate after snooze
    } else {
      toast.info("🔔 Snoozed for 5 minutes!");
    }
  };

  return null;
};

export default ReminderNotifications;
