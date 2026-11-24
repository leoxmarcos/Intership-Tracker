import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiLogOut,
  FiSearch,
  FiPlus,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiBarChart2,
} from "react-icons/fi";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [applications, setApplications] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer Intern",
      date: "20 Nov 2026",
      status: "Applied",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineering Intern",
      date: "18 Nov 2026",
      status: "Shortlisted",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Web Development Intern",
      date: "15 Nov 2026",
      status: "Interview",
    },
    {
      id: 4,
      company: "Infosys",
      role: "React Developer Intern",
      date: "12 Nov 2026",
      status: "Rejected",
    },
  ]);

  const [newApplication, setNewApplication] = useState({
    company: "",
    role: "",
    date: "",
    status: "Applied",
  });

  const handleAddApplication = (e) => {
    e.preventDefault();

    const application = {
      ...newApplication,
      id: Date.now(),
    };

    setApplications([application, ...applications]);

    setNewApplication({
      company: "",
      role: "",
      date: "",
      status: "Applied",
    });

    setShowForm(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const filteredApplications = applications.filter((app) =>
    `${app.company} ${app.role}`.toLowerCase().includes(search.toLowerCase()),
  );

  const applied = applications.filter((app) => app.status === "Applied").length;

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted",
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const selected = applications.filter(
    (app) => app.status === "Selected",
  ).length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">S</div>
          <h2>InternTrack</h2>
        </div>

        <div className="sidebar-menu">
          <p className="menu-heading">MAIN MENU</p>

          <a href="#overview" className="menu-item active">
            <FiHome />
            Dashboard
          </a>

          <a href="#applications" className="menu-item">
            <FiBriefcase />
            Internships
          </a>

          <Link to="/my-applications" className="menu-item">
            <FiFileText />
            My Applications
          </Link>

          <Link to="/calendar" className="menu-item">
            <FiCalendar />
            Calendar
          </Link>
          <Link to="/analytics" className="menu-item">
            <FiBarChart2 />
            Analytics
          </Link>

          <Link to="/profile" className="menu-item">
            <FiUser />
            My Profile
          </Link>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}

      <main className="dashboard-main">
        {/* Top Navbar */}

        <header className="dashboard-header">
          <div>
            <h2>Student Dashboard</h2>
            <p>Welcome back! Here's your internship overview.</p>
          </div>

          <div className="header-right">
            <button className="notification-button" aria-label="Notifications">
              <FiBell />
            </button>

            <div className="profile-info">
              <div className="profile-avatar">S</div>
              <div>
                <h4>Student</h4>
                <p>Student Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Overview */}

        <section id="overview" className="dashboard-content">
          <div className="section-heading">
            <div>
              <h1>Dashboard Overview</h1>
              <p>Track and manage your internship journey.</p>
            </div>

            <button
              className="add-application-button"
              onClick={() => setShowForm(!showForm)}
            >
              <FiPlus />
              Add Internship
            </button>
          </div>

          {/* Statistics Cards */}

          <div className="stats-grid">
            <div className="stat-card blue-card">
              <div className="stat-icon">
                <FiBriefcase />
              </div>
              <p>Total Applications</p>
              <h2>{applications.length}</h2>
              <span>All applications</span>
            </div>

            <div className="stat-card orange-card">
              <div className="stat-icon">
                <FiClock />
              </div>
              <p>Applied</p>
              <h2>{applied}</h2>
              <span>Waiting for response</span>
            </div>

            <div className="stat-card green-card">
              <div className="stat-icon">
                <FiCheckCircle />
              </div>
              <p>Shortlisted</p>
              <h2>{shortlisted}</h2>
              <span>Shortlisted applications</span>
            </div>

            <div className="stat-card purple-card">
              <div className="stat-icon">
                <FiCalendar />
              </div>
              <p>Interviews</p>
              <h2>{interviews}</h2>
              <span>Interview opportunities</span>
            </div>
          </div>

          {/* Additional Status */}

          <div className="status-summary">
            <div>
              <FiXCircle />
              <span>
                Rejected: <strong>{rejected}</strong>
              </span>
            </div>

            <div>
              <FiCheckCircle />
              <span>
                Selected: <strong>{selected}</strong>
              </span>
            </div>
          </div>

          {/* Add Application Form */}

          {showForm && (
            <div className="application-form-card">
              <h2>Add New Internship</h2>

              <form onSubmit={handleAddApplication}>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newApplication.company}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      company: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Job Role"
                  value={newApplication.role}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      role: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="date"
                  value={newApplication.date}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      date: e.target.value,
                    })
                  }
                  required
                />

                <select
                  value={newApplication.status}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button type="submit">Save Application</button>
              </form>
            </div>
          )}

          {/* Recent Applications */}

          <section id="applications" className="applications-section">
            <div className="applications-heading">
              <div>
                <h2>Recent Applications</h2>
                <p>Keep track of your internship applications.</p>
              </div>

              <div className="search-box">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search company or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-wrapper">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id}>
                      <td>
                        <strong>{app.company}</strong>
                      </td>

                      <td>{app.role}</td>

                      <td>{app.date}</td>

                      <td>
                        <span
                          className={`status-badge ${app.status.toLowerCase()}`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan="4" className="empty-message">
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="profile" className="profile-note">
            <h3>My Profile</h3>
            <p>Manage your student information and career details.</p>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
