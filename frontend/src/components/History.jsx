import React, { useEffect, useState } from "react";

import "../css/history.css";

import image2 from "../Images/user2.jpg";
import timeimage from "../Images/time_1759335.png";
import securityimage from "../Images/icons8-security.png";
import deleteimage from "../Images/icons8-delete-user-male-96.png";
import axios from "axios";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const formatId = (id) => {
  if (!id) return "";
  return id.length > 8 ? `${id.substring(0, 8)}...` : id;
};

export default function History() {
  const [query, setQuery] = useState("");
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      try {
        const { data } = await axios.get(
          "https://loginandregistration-rd3v.onrender.com/api/auth/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            timeout: 10000,
          },
        );

        // Ensure it's an array for mapping
        setProfileData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  console.log(profileData);

  return (
    <div className="wrap">
      <div className="topbar">
        <div className="brand">
          <img
            className="brand-icon"
            src={timeimage}
            alt="time icon"
            width={45}
            height={45}
          />
          <div className="title">
            <h1>User Login History</h1>
            <p>Recent sign-in activity & session details</p>
          </div>
        </div>

        <div className="controls">
          <div className="search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ opacity: 0.9 }}
              aria-hidden
            >
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history (static)..."
              aria-label="Search user history"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profileData.length > 0 ? (
                profileData.map((user, index) => (
                  <tr key={index}>
                    <td data-label="#">{formatId(user.user._id) || index + 1}</td>
                    <td data-label="Name">
                      <div className="usercell">
                        <img
                          className="avatar"
                          src={image2}
                          alt={`${user.user.name} avatar`}
                          width={50}
                          height={50}
                        />
                        <div>
                          <div style={{ fontWeight: 700 }}>
                            {user.user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Date Created">{formatDate(user.user.createdAt)}</td>
                    <td data-label="Role" className="muted">Admin</td>
                    <td data-label="Status">
                      <span
                        className={`badge ${
                          user.status === "Active" ? "success" : "Inactive"
                        }`}
                      >
                        {user.status || "Active"}
                      </span>
                    </td>
                    <td data-label="Actions" className="actions">
                      <button
                        type="button"
                        className="btn"
                        aria-label="settings"
                      >
                        <img
                          className="setting-icon"
                          src={securityimage}
                          alt="settings"
                          width={28}
                          height={28}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn"
                        aria-label="delete user"
                      >
                        <img
                          className="user-cancel-icon"
                          src={deleteimage}
                          alt="delete"
                          width={28}
                          height={28}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination" role="navigation" aria-label="pagination">
            <a href="#" onClick={(e) => e.preventDefault()}>
              &laquo;
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              1
            </a>
            <a className="active" href="#" onClick={(e) => e.preventDefault()}>
              2
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              3
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              4
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              5
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              6
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              &raquo;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
