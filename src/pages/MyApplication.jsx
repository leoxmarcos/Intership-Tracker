import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MyApplication.css";

const STORAGE_KEY = "internshipApplications";

const initialApplications = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer Intern",
    date: "2026-11-10",
    status: "Applied",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineering Intern",
    date: "2026-11-12",
    status: "Shortlisted",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Web Development Intern",
    date: "2026-11-15",
    status: "Interview",
  },
  {
    id: 4,
    company: "Infosys",
    role: "React Developer Intern",
    date: "2026-11-17",
    status: "Rejected",
  },
];

function MyApplications() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    company: "",
    role: "",
    date: "",
    status: "Applied",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.company.trim() || !form.role.trim() || !form.date) {
      alert("Please fill all the fields.");
      return;
    }

    if (editingId !== null) {
      setApplications((prev) =>
        prev.map((app) => (app.id === editingId ? { ...app, ...form } : app)),
      );
      setEditingId(null);
    } else {
      const newApplication = {
        id: Date.now(),
        ...form,
      };

      setApplications((prev) => [...prev, newApplication]);
    }

    setForm({
      company: "",
      role: "",
      date: "",
      status: "Applied",
    });
  };

  const handleEdit = (app) => {
    setEditingId(app.id);

    setForm({
      company: app.company,
      role: app.role,
      date: app.date,
      status: app.status,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications((prev) => prev.filter((app) => app.id !== id));

      if (editingId === id) {
        setEditingId(null);
        setForm({
          company: "",
          role: "",
          date: "",
          status: "Applied",
        });
      }
    }
  };

  const filteredApplications = applications.filter((app) =>
    `${app.company} ${app.role} ${app.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="applications-page">
      <aside className="applications-sidebar">
        <h2>InternTrack</h2>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/my-applications" className="active">
          My Applications
        </Link>

        <Link to="/calendar">Calendar</Link>

        <Link to="/profile">My Profile</Link>

        <Link to="/login" className="logout-link">
          Logout
        </Link>
      </aside>

      <main className="applications-main">
        <div className="applications-header">
          <div>
            <h1>My Applications</h1>
            <p>Manage and track all your internship applications.</p>
          </div>

          <span className="total-count">Total: {applications.length}</span>
        </div>

        <section className="application-form-card">
          <h2>
            {editingId !== null ? "Edit Application" : "Add New Application"}
          </h2>

          <form onSubmit={handleSubmit} className="application-form">
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={form.role}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button type="submit" className="save-btn">
              {editingId !== null ? "Update Application" : "Add Application"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    company: "",
                    role: "",
                    date: "",
                    status: "Applied",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="applications-table-card">
          <div className="table-heading">
            <h2>Application History</h2>

            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="table-responsive">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Application Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.company}</td>
                      <td>{app.role}</td>
                      <td>{app.date}</td>

                      <td>
                        <span
                          className={`status-badge ${app.status.toLowerCase()}`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(app)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(app.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyApplications;
