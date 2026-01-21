import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Added for API calls
import { apiUrl } from "./../utils/api";

const DualLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "patient" || roleParam === "doctor") setRole(roleParam);
  }, [location.search]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password are required");
    try {
      const res = await axios.post(apiUrl("/api/auth/login"), { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setShowPopup(true);
      setTimeout(() => navigate(`/${role}-dashboard`), 1500);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-white font-[Poppins] flex items-center justify-center px-4 relative">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-2xl text-[#004B5C] hover:text-[#003246] transition"
      >
        <FaArrowLeft />
      </button>

      {/* Center Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white text-center"
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-10">
          <img src="/assets/logo.png" alt="Logo" className="w-28 h-28 mb-6" />
          <h1 className="text-4xl font-bold text-[#004B5C]">Hi, Welcome!</h1>
          <p className="text-base text-[#2D3A3A] mt-3 px-4">Enter your email and password to login.</p>
        </div>

        <>
          <label className="block text-left text-sm font-semibold mb-2">Email</label>
          <div className="flex items-center border border-[#7A869A] rounded-xl px-4 py-3 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500 text-base"
            />
          </div>

          <label className="block text-left text-sm font-semibold mb-2">Password</label>
          <div className="flex items-center border border-[#7A869A] rounded-xl px-4 py-3 mb-6">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500 text-base"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-full font-semibold text-lg ${
              email && password
                ? "bg-[#004B5C] text-white hover:bg-[#003246]"
                : "bg-gray-300 text-white cursor-not-allowed"
            } transition`}
            disabled={!email || !password}
          >
            Login
          </button>
        </>

        {/* Registration Link */}
        <div className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate(`/register?role=${role}`)}
            className="text-[#004B5C] font-semibold underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] px-10 py-8 max-w-sm w-full text-center shadow-2xl">
            <img
              src="/assets/popups/success.png"
              alt="Success"
              className="w-28 h-28 object-contain mx-auto mb-6"
            />
            <h3 className="text-[22px] font-bold text-[#1F2A37] mb-2">
              Login Successful
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Login successful! Redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualLoginPage;
