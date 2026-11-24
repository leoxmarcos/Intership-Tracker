import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const defaultProfile = {
  name: "Student Name",
  email: "student@example.com",
  phone: "",
  college: "ABES Engineering College",
  course: "B.Tech - Computer Science",
  year: "3rd Year",
  graduation: "2027",
  skills: "HTML, CSS, JavaScript, React",
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("studentProfile");
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("studentProfile", JSON.stringify(profile));

    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const initials = profile.name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="profile-page">
      <aside className="profile-sidebar">
        <h2>InternTrack</h2>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/my-applications">My Applications</Link>

        <Link to="/calendar">Calendar</Link>

        <Link to="/profile" className="active">
          My Profile
        </Link>

        <Link to="/login" className="profile-logout">
          Logout
        </Link>
      </aside>

      <main className="profile-main">
        <header className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal and academic information.</p>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-top">
            <div className="profile-avatar-large">{initials || "S"}</div>

            <div className="profile-title">
              <h2>{profile.name}</h2>
              <p>{profile.course}</p>
              <span>{profile.year}</span>
            </div>

            <button
              className="edit-profile-btn"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          <hr />

          <form onSubmit={handleSave}>
            <h3>Personal Information</h3>

            <div className="profile-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="profile-field">
                <label>College Name</label>
                <input
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <hr />

            <h3>Academic Information</h3>

            <div className="profile-grid">
              <div className="profile-field">
                <label>Course</label>
                <input
                  type="text"
                  name="course"
                  value={profile.course}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="profile-field">
                <label>Current Year</label>
                <select
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              <div className="profile-field">
                <label>Graduation Year</label>
                <input
                  type="text"
                  name="graduation"
                  value={profile.graduation}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div className="profile-field">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            {editMode && (
              <button type="submit" className="save-profile-btn">
                Save Changes
              </button>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
