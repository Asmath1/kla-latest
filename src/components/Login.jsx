import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Login.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            rememberMe: rememberMe,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      alert("Login successful! (This is a dummy API response)");
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password clicked! (This is a demo)");
  };

  const handleCreateAccount = () => {
    alert("Create account clicked! (This is a demo)");
  };

  return (
    <div className="login-container">
      <div className="row h-100">
        {/* Left side - Login Form */}
        <div className="col-lg-5 col-12 d-flex align-items-center justify-content-center login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2 className="login-title">Login</h2>
              <p className="login-subtitle">
                Don't have an account?{" "}
                <button
                  onClick={handleCreateAccount}
                  className="create-account-link"
                >
                  Create your account
                </button>
              </p>
            </div>

            <div className="login-form">
              <div className="form-group">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`form-control custom-input ${
                    errors.username ? "error" : ""
                  }`}
                  placeholder="Username"
                />
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              <div className="form-group password-group">
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-control custom-input ${
                      errors.password ? "error" : ""
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="eye-icon" />
                    ) : (
                      <EyeOff className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-options">
                <div className="form-check">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-check-input"
                  />
                  <label htmlFor="remember-me" className="form-check-label">
                    Remember Me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-password-link"
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-actions-row">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="back-home-btn"
                >
                  ← Back to Home
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`btn login-btn ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? (
                    <div className="loading-content">
                      <div className="spinner"></div>
                      Login
                    </div>
                  ) : (
                    "LOGIN"
                  )}
                </button>
              </div>

              {/* <div className="login-back-wrapper">
                <button
                  className="login-back-btn"
                  onClick={() => (window.location.href = "/")}
                >
                  ← Back to Home
                </button>
              </div> */}
              {/* 
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`btn login-btn ${isLoading ? "loading" : ""}`}
              >
                {isLoading ? (
                  <div className="loading-content">
                    <div className="spinner"></div>
                    Login
                  </div>
                ) : (
                  "LOGIN"
                )}
              </button> */}
            </div>
          </div>
        </div>

        {/* Right side - Welcome Section */}
        <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center welcome-section">
          <img
            className="rightBgImage col-lg-6 d-none d-lg-flex"
            src="/images/muralImg.png"
            alt="Welcome"
          />
          <div className="welcome-content row align-items-center wow fadeInUp">
            <h1 className="welcome-title main-title mb10">
              Welcome
              <br />
              Back.
            </h1>
            <p className="welcome-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="decorative-circle circle-1"></div>
          <div className="decorative-circle circle-2"></div>
          <div className="decorative-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
