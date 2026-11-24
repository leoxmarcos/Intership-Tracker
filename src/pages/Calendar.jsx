import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Calendar.css";

const STORAGE_KEY = "internshipCalendarEvents";

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Calendar() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(STORAGE_KEY);
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getToday());

  const [form, setForm] = useState({
    title: "",
    company: "",
    date: getToday(),
    type: "Interview",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date) {
      alert("Please enter an event title and date.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...form,
    };

    setEvents((previous) => [...previous, newEvent]);
    setSelectedDate(form.date);

    const eventDate = new Date(`${form.date}T00:00:00`);
    setCurrentDate(new Date(eventDate.getFullYear(), eventDate.getMonth(), 1));

    setForm({
      title: "",
      company: "",
      date: getToday(),
      type: "Interview",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this calendar event?")) {
      setEvents((previous) => previous.filter((event) => event.id !== id));
    }
  };

  const getDateKey = (day) => {
    const monthValue = String(month + 1).padStart(2, "0");
    const dayValue = String(day).padStart(2, "0");
    return `${year}-${monthValue}-${dayValue}`;
  };

  const selectedEvents = events.filter((event) => event.date === selectedDate);

  const upcomingEvents = [...events]
    .filter((event) => event.date >= getToday())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const formatDate = (dateString) => {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="calendar-page">
      <aside className="calendar-sidebar">
        <h2>InternTrack</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-applications">My Applications</Link>
        <Link to="/calendar" className="active">
          Calendar
        </Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/login" className="calendar-logout">
          Logout
        </Link>
      </aside>

      <main className="calendar-main">
        <header className="calendar-header">
          <div>
            <h1>My Calendar</h1>
            <p>Track your interviews and application deadlines.</p>
          </div>
        </header>

        <div className="calendar-layout">
          <section className="calendar-card">
            <div className="calendar-month-header">
              <button onClick={() => changeMonth(-1)}>Previous</button>

              <h2>{monthName}</h2>

              <button onClick={() => changeMonth(1)}>Next</button>
            </div>

            <div className="calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div className="calendar-empty" key={`empty-${index}`} />
                  );
                }

                const dateKey = getDateKey(day);

                const dayEvents = events.filter(
                  (event) => event.date === dateKey,
                );

                return (
                  <button
                    key={dateKey}
                    className={`calendar-day ${
                      selectedDate === dateKey ? "selected-day" : ""
                    }`}
                    onClick={() => setSelectedDate(dateKey)}
                  >
                    <span>{day}</span>

                    <div className="calendar-event-dots">
                      {dayEvents.map((event) => (
                        <span
                          key={event.id}
                          className={`event-dot ${
                            event.type === "Interview"
                              ? "interview-dot"
                              : "deadline-dot"
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="calendar-legend">
              <span>
                <i className="legend-dot interview-dot" />
                Interview
              </span>

              <span>
                <i className="legend-dot deadline-dot" />
                Application Deadline
              </span>
            </div>

            <div className="selected-events">
              <h3>Events on {formatDate(selectedDate)}</h3>

              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <div className="calendar-event-item" key={event.id}>
                    <div>
                      <strong>{event.title}</strong>
                      <p>{event.company || "No company specified"}</p>
                      <span
                        className={`event-type ${event.type.toLowerCase()}`}
                      >
                        {event.type}
                      </span>
                    </div>

                    <button
                      className="event-delete-btn"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-calendar-events">
                  No events scheduled for this date.
                </p>
              )}
            </div>
          </section>

          <div className="calendar-right-column">
            <section className="add-event-card">
              <h2>Add New Event</h2>

              <form onSubmit={handleAddEvent}>
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Technical Interview"
                  value={form.title}
                  onChange={handleChange}
                  required
                />

                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={handleChange}
                />

                <label>Event Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />

                <label>Event Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="Interview">Interview</option>
                  <option value="Deadline">Application Deadline</option>
                </select>

                <button type="submit" className="add-event-btn">
                  Add Event
                </button>
              </form>
            </section>

            <section className="upcoming-card">
              <h2>Upcoming Events</h2>

              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div className="upcoming-event" key={event.id}>
                    <div>
                      <strong>{event.title}</strong>
                      <p>{event.company || "No company specified"}</p>
                      <small>{formatDate(event.date)}</small>
                    </div>

                    <span className={`event-type ${event.type.toLowerCase()}`}>
                      {event.type}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-calendar-events">
                  No upcoming events. Add your first event!
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Calendar;
