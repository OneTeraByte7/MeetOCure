const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register (doctor/patient)
const register = async (req, res) => {
  try {
    const { name, dob, gender, phone, email, password, address, role } = req.body;

    let certificateUrl = undefined;
    if (role === "doctor" && req.file) {
      certificateUrl = req.file.path;
    }

    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) return res.status(400).json({ message: "Phone already registered" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already registered" });

    const isProfileComplete =
      !!name && !!dob && !!gender && !!phone && !!email && !!password &&
      (role !== "doctor" || (!!address && !!certificateUrl));

    const user = await User.create({
      name,
      dob,
      gender,
      phone,
      email,
      password,
      address: role === "doctor" ? address : undefined,
      certificateUrl: role === "doctor" ? certificateUrl : undefined,
      role,
      isProfileComplete,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        address: user.address,
        certificateUrl: user.certificateUrl,
        dob: user.dob,
        gender: user.gender,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Email/password login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Check if phone is registered
const checkPhone = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  res.json({ exists: !!user });
};

module.exports = {
  register,
  login,
  checkPhone,
};
