import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import "../styles/Register.css";
import heroImage from "../assets/hero.png";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    alert("Registration successful! Please login.");

    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Left Illustration Section */}

        <div className="register-illustration">
          <div className="register-brand">
            <span className="register-logo">S</span>
            <h2>InternTrack</h2>
          </div>

          <div className="illustration-content">
            <h1>
              Start Your
              <br />
              Career Journey!
            </h1>

            <p>
              Organize your internship applications, track your progress and
              take the next step towards your dream career.
            </p>

            <img
              src={heroImage}
              alt="Student managing internship applications"
              className="register-image"
            />
          </div>

          <p className="illustration-footer">
            Your career journey starts here.
          </p>
        </div>

        {/* Right Registration Form */}

        <div className="register-form-section">
          <div className="register-form">
            <h1>Student Signup</h1>

            <p className="register-description">
              Enter your details to create your account
            </p>

            <form onSubmit={handleRegister}>
              {/* Full Name */}

              <div className="register-field">
                <FiUser className="field-icon" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}

              <div className="register-field">
                <FiMail className="field-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}

              <div className="register-field">
                <FiPhone className="field-icon" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  required
                />
              </div>

              {/* Password */}

              <div className="register-field">
                <FiLock className="field-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Confirm Password */}

              <div className="register-field">
                <FiLock className="field-icon" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Create Account */}

              <button type="submit" className="register-submit">
                Create Account
              </button>
            </form>

            <div className="register-bottom">
              <p>
                Already have an account?
                <Link to="/login"> Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
