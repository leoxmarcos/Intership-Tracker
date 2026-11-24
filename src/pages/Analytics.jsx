import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "../styles/Analytics.css";

const COLORS = ["#4F46E5", "#0EA5E9", "#F59E0B", "#EF4444", "#10B981"];

function Analytics() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("internshipApplications") || "[]",
    );

    setApplications(savedApplications);
  }, []);

  const statusNames = [
    "Applied",
    "Shortlisted",
    "Interview",
    "Rejected",
    "Accepted",
  ];

  const statusData = statusNames
    .map((status) => ({
      name: status,
      value: applications.filter(
        (app) => app.status?.toLowerCase() === status.toLowerCase(),
      ).length,
    }))
    .filter((item) => item.value > 0);

  const monthlyData = [];

  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const monthName = monthDate.toLocaleString("en-US", {
      month: "short",
    });

    const monthApplications = applications.filter((app) => {
      if (!app.date) return false;

      const appDate = new Date(app.date + "T00:00:00");

      return (
        appDate.getMonth() === monthDate.getMonth() &&
        appDate.getFullYear() === monthDate.getFullYear()
      );
    }).length;

    monthlyData.push({
      month: monthName,
      applications: monthApplications,
    });
  }

  const totalApplications = applications.length;

  const shortlisted = applications.filter(
    (app) => app.status?.toLowerCase() === "shortlisted",
  ).length;

  const interviews = applications.filter(
    (app) => app.status?.toLowerCase() === "interview",
  ).length;

  return (
    <div className="analytics-container">
      <aside className="analytics-sidebar">
        <h2>InternTrack</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/my-applications">My Applications</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/analytics" className="active">
          Analytics
        </Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/login" className="analytics-logout">
          Logout
        </Link>
      </aside>

      <main className="analytics-main">
        <div className="analytics-header">
          <div>
            <h1>Analytics</h1>
            <p>Track and analyze your internship applications.</p>
          </div>
        </div>

        <div className="analytics-stats">
          <div className="analytics-stat-card">
            <h3>Total Applications</h3>
            <h2>{totalApplications}</h2>
          </div>

          <div className="analytics-stat-card">
            <h3>Shortlisted</h3>
            <h2>{shortlisted}</h2>
          </div>

          <div className="analytics-stat-card">
            <h3>Interviews</h3>
            <h2>{interviews}</h2>
          </div>
        </div>

        <div className="analytics-charts">
          <section className="chart-card">
            <h2>Application Status Distribution</h2>
            <p>View applications according to their current status.</p>

            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="analytics-empty">
                No application data available yet.
              </div>
            )}
          </section>

          <section className="chart-card">
            <h2>Monthly Application Activity</h2>
            <p>Number of applications submitted in the last six months.</p>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  fill="#4F46E5"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Analytics;
