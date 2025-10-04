// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = require("../middleware/auth");

const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Helper to create token and send cookie
const sendToken = (res, user) => {
  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // cookie options
  const cookieOptions = {
    httpOnly: true,
    // secure true in production (requires https)
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: (() => {
      // parse days like '7d' or seconds if numeric - default 7 days
      const m = String(JWT_EXPIRES_IN).match(/(\d+)(d|h|m|s)?/);
      if (!m) return 7 * 24 * 60 * 60 * 1000;
      const val = parseInt(m[1], 10);
      const unit = m[2] || "d";
      switch (unit) {
        case "h":
          return val * 60 * 60 * 1000;
        case "m":
          return val * 60 * 1000;
        case "s":
          return val * 1000;
        case "d":
        default:
          return val * 24 * 60 * 60 * 1000;
      }
    })(),
  };

  res.cookie(COOKIE_NAME, token, cookieOptions);
  return token;
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;
    if (!name || !email || !password || !dob) {
      return res
        .status(400)
        .json({ message: "All fields required: name, email, password, dob" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      dob: new Date(dob),
    });

    // send token cookie
    const tok = sendToken(res, user);

    // return safe user object
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
    };
    return res
      .status(201)
      .json({ message: "Registered", user: safeUser, token: tok });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const tok = sendToken(res, user);
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      dob: user.dob,
    };
    return res.json({ message: "Logged in", user: safeUser, token: tok });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.json({ message: "Logged out" });
});

// Protected example route: get profile
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
