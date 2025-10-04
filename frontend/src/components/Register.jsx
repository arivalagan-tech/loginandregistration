import React, { useState } from "react";

import "../css/Register.css"; // Make sure your CSS is in the same folder or adjust path
import Q_Img from "../Images/Q-image.webp";
import googleIcon from "../Images/icons8-google.png";
import facebookIcon from "../Images/icons8-facebook.png";
import appleIcon from "../Images/apple.png";
import bridge from "../Images/apple.png";
// import eye from "../Images/eye.png";

import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // store validation errors

  // new state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.dob.trim()) newErrors.dob = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors); // show errors
    //   return;
    // }

    // setErrors({}); // clear errors if valid

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          // withCredentials: true, // if cookies needed
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setFormData({ name: "", dob: "", email: "", password: "" });
      alert("✅ Data stored successfully!");

      return data;
    } catch (err) {
      console.error("axios error", err);
      // axios gives more detail (err.response, err.request)
      if (err.response) {
        throw new Error(
          err.response.data?.message || `Server ${err.response.status}`
        );
      } else if (err.request) {
        throw new Error("No response from server (network or CORS issue)");
      } else {
        throw err;
      }
    }

    // try {
    //   console.log(formData);

    //   const response = await fetch("http://localhost:5000/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert("Registration successful!");
    //     console.log("Response:", data);
    //   } else {
    //     alert("Registration failed: " + data.message);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Something went wrong. Try again!");
    // }
  };

  // toggle handler for eye button
  const toggleShowPassword = () => {
    setShowPassword((s) => !s);
  };

  return (
    <main>
      <div className="container">
        <section className="main-section">
          <div className="signUpPage1">
            <div className="headingSec1">
              <img src={Q_Img} alt="icon" />
            </div>

            <div className="headingSec2">
              <h2 className="headingSize">The Future Starts with Quantum...</h2>
              <p className="paraSize">
                Sign up to be part of the IT revolution. From AI to
                quantum-powered innovation, the future of technology begins
                here.
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
                <h2 className="headerTitleSize">LET'S GET YOU STARTED</h2>
                <h2 className="headerTitleSize2">Create an Account</h2>
              </div>

              <div className="formSec">
                <form className="insideInputData1" onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <input
                      required
                      className="inputNameSize1"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                    />
                    <span className="inputNameSize">Your Name</span>
                  </div>

                  <div className="inputBox">
                    <input
                      required
                      className="inputPasswordSize3"
                      type="date"
                      placeholder=""
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="inputBox">
                    <input
                      required
                      className="inputEmailSize2"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                    <span className="inputEmailSize">Email</span>
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

                  <button type="submit" className="insideStartBtn">
                    GET STARTED
                  </button>
                </form>
              </div>

              <div className="separator-container">
                <span className="separator-line"></span>
                <span className="separator-text">Or</span>
                <span className="separator-lines"></span>
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
                  Already have an account?{" "}
                  <Link className="footerParaSize2" to="/">
                    LOGIN HERE
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

export default Register;
