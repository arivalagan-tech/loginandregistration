// File: src/components/History.jsx
import React, { useEffect, useState } from "react";

import "../css/history.css";

import image3 from "../Images/user3.jpeg";
import image1 from "../Images/user1.jpg";
import image2 from "../Images/user2.jpg";
import image4 from "../Images/user4.jpeg";
import image5 from "../Images/user5.jpeg";
import timeimage from "../Images/time_1759335.png";
import securityimage from "../Images/icons8-security.png";
import deleteimage from "../Images/icons8-delete-user-male-96.png";
import axios from "axios";

const initialData = [
  {
    id: 1,
    name: "Michael Johnson",
    avatar: image3,
    date: "04/10/2013",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Meena",
    avatar: image4,
    date: "05/08/2014",
    role: "Publisher",
    status: "Active",
  },
  {
    id: 3,
    name: "John Smith",
    avatar: image5,
    date: "11/05/2015",
    role: "Publisher",
    status: "Suspended",
  },
  {
    id: 4,
    name: "Raghav",
    avatar: image1,
    date: "06/09/2016",
    role: "Technical Support",
    status: "Active",
  },
  {
    id: 5,
    name: "Priya",
    avatar: image2,
    date: "12/08/2017",
    role: "Database Administrator",
    status: "Inactive",
  },
];

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
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            timeout: 10000,
          }
        );

        // Ensure it's an array for mapping
        setProfileData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
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
              placeholder="Search by name, email, IP or device (static)"
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
                    <td>{user.user._id || index + 1}</td>
                    <td>
                      <div className="usercell">
                        <img
                          className="avatar"
                          src={image2}
                          alt={`${user.user.createdAt} avatar`}
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
                    <td>{user.user.createdAt}</td>
                    <td className="muted">Admin</td>
                    <td>
                      <span
                        className={
                          user.status === "Active" ? "Success" : "Inactive"
                        }
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="actions">
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
