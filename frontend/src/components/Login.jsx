// Login.js
import React, { useState } from "react";

import "../css/Login.css";
import Q_Img2 from "../Images/Q-img.webp";
import googleIcon from "../Images/icons8-google.png";
import facebookIcon from "../Images/icons8-facebook.png";
import appleIcon from "../Images/apple.png";
import { toast } from "react-toastify";

// remove the old eye import if you want to use inline SVG toggle
// import eye from "../Images/eye.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // new state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.password.trim()) newErrors.password = "Required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 2000,
        },
        setTimeout(() => {
          window.location.href = "http://localhost:5173/history";
        }, 2000)
      );

      if (data) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }

        // ✅ Save user
        if (data.user) {
          localStorage.setItem("loggedUser", JSON.stringify(data.user));
        }
      }

      setFormData({ email: "", password: "" });
      alert("✅ Logged in successfully!");
      console.log("Login response:", data);

      return data;
    } catch (err) {
      alert("Invalid credentials");
      console.error("axios error", err);
      if (err.response) {
        setServerError(
          err.response.data?.message || `Server ${err.response.status}`
        );
      } else if (err.request) {
        setServerError("No response from server (network or CORS issue)");
      } else if (err.code === "ECONNABORTED") {
        setServerError("Request timed out");
      } else {
        setServerError(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  // toggle handler for eye button
  const toggleShowPassword = () => {
    setShowPassword((s) => !s);
  };

  return (
    <main className="login-page">
      <div className="container">
        <section className="main-section">
          <div className="signUpPage1">
            <div className="headingSec1">
              <img src={Q_Img2} alt="icon" />
            </div>

            <div className="headingSec2">
              <h2 className="headingSize">Where Your Innovation Lives</h2>
              <p className="paraSize">
                Log in to your account and continue building the future with
                Quantum IT Innovation.
              </p>

              <div className="separator-container1">
                <span className="separator-line1"></span>
                <span className="separator-line2"></span>
                <span className="separator-line3"></span>
              </div>
            </div>
          </div>

          <div className="signUpPage2">
            <div className="signUpInnerPage1">
              <div className="headerSec">
                <h2 className="headerTitleSize">WELCOME BACK</h2>
                <h2 className="headerTitleSize2">Log In to your Account</h2>
              </div>

              <div className="formSec">
                <form className="insideInputData1" onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <input
                      required
                      className="inputEmailSize2"
                      type="text"
                      placeholder=""
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <span className="inputEmailSize" placeholder="">
                      Email ID
                    </span>
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </div>

                  {/* password wrapper: position relative so eye button sits on top */}
                  <div
                    className="inputBox passwordWrapper"
                    style={{ position: "relative" }}
                  >
                    <input
                      required
                      className="inputPasswordSize3"
                      type={showPassword ? "text" : "password"} // toggle here
                      placeholder=""
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      aria-describedby="passwordHelp"
                    />
                    <span className="inputPasswordSize">Password</span>

                    {/* Accessible toggle button (type="button" so it doesn't submit the form) */}
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="eyeToggleBtn"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      aria-pressed={showPassword}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 6,
                      }}
                    >
                      {/* inline SVG icons — eye (visible) and eye-off (hidden) */}
                      {showPassword ? (
                        // eye-off / closed eye icon
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3L21 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.58 10.58A3 3 0 0113.42 13.42"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.94 12.94C4.73 16.06 8.13 18 12 18c2.16 0 4.15-.6 5.86-1.65"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.53 9.47C14.21 8.95 13.64 8.6 13 8.6c-1.1 0-2 .9-2 2 0 .64.35 1.21.87 1.53"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        // eye / open eye icon
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    {errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </div>

                  {/* <div className="RememberPassSec">
                    <div className="sub-RememberPass">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                className="rememberPassSize"
                                type="checkbox"
                                name="remember"
                                value="true"
                                defaultChecked
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <h1 className="checkBox-1">Remember me</h1>
                    </div>

                    <div className="subForgot-Pass">
                      <h2 className="forgotPass-Size">Forgot Password?</h2>
                    </div>
                  </div> */}

                  <div className="remember-forget">
                    <div className="remember-main">
                      <input
                        className="rememberPassSize"
                        type="checkbox"
                        name="remember"
                        value="true"
                        defaultChecked
                      />
                      <h1 className="checkBox-0">Remember me</h1>
                    </div>

                    <div className="forget-div">
                      <h2 className="forgotPass-Size">Forgot Password?</h2>
                    </div>
                  </div>

                  <div className="continue-btn">
                    <button
                      type="submit"
                      className="insideStartBtn"
                      disabled={loading}
                    >
                      {loading ? "Please wait..." : "CONTINUE"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="separator-container">
                <span className="separator-line"></span>
                <span className="separator-text">Or</span>
                <span className="separator-line"></span>
              </div>

              <div className="variousSignPage">
                <div className="mainSignUp-G">
                  <img className="img-GSize" src={googleIcon} alt="icon" />
                  <h2 className="signUp-G">Sign up with Google</h2>
                </div>

                <div className="mainSignUp-F">
                  <img className="img-FSize" src={facebookIcon} alt="icon" />
                  <h2 className="signUp-G">Sign up with Facebook</h2>
                </div>

                <div className="mainSignUp-A">
                  <img className="img-ASize" src={appleIcon} alt="icon" />
                  <h2 className="signUp-G">Sign up with Apple</h2>
                </div>
              </div>

              <div className="footerSec">
                <p className="footerParaSize">
                  New User?
                  <Link className="footerParaSize2" to="/register">
                    SIGN UP HERE
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
