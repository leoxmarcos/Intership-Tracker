import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/Login.css";
import heroImage from "../assets/hero.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand">
          <span className="brand-icon">S</span>
          <h2>InternTrack</h2>
        </div>

        <div className="welcome-content">
          <h1>
            Track Your Journey.
            <br />
            Achieve Your Goals.
          </h1>
          <p>
            Manage your internship applications, track your progress and stay
            organized throughout your career journey.
          </p>
          <img
            src={heroImage}
            alt="Internship tracking"
            className="hero-image"
          />
        </div>

        <p className="left-footer">Your career journey starts here.</p>
      </div>

      <div className="login-right">
        <div className="login-form-wrapper">
          <h1>Welcome Back!</h1>
          <p className="subtitle">Sign in to continue to your account.</p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>

            <div className="input-box">
              <FiMail />
              <input type="email" placeholder="Enter your email" required />
            </div>

            <label>Password</label>

            <div className="input-box">
              <FiLock />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <p className="register-text">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
