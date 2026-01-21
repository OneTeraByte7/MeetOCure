import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserMd } from "react-icons/fa";

const ChooseRoleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-[Poppins] px-4">
      {/* Larger Mobile Mockup */}
      <div className="w-[400px] h-[780px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-200">
        {/* Optional phone top mock */}
        <div className="bg-[#044E63] flex justify-center pt-6 px-6">
          <img
            src="/assets/phone-mock.png" // Optional image
            alt="Phone UI"
            className="w-[270px] object-contain"
          />
        </div>

        {/* Bottom content */}
        <div className="bg-white rounded-t-[2.5rem] px-8 pt-10 pb-12 text-center shadow-inner flex-1">
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-28 h-28 object-contain mx-auto mb-6"
          />

          {/* Headings */}
          <h1 className="text-2xl font-bold text-[#004B5C] mb-2">
            Let’s get started
          </h1>
          <p className="text-sm text-black mb-8">Choose your role</p>

          {/* Role Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) return navigate(`/login?role=patient`);
                navigate("/patient-dashboard");
              }}
              className="w-full flex items-center justify-center gap-3 py-3 text-white bg-[#004B5C] rounded-full font-semibold text-base shadow hover:bg-[#003246] transition"
            >
              <FaUser className="text-lg" />
              Patient
            </button>

            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) return navigate(`/login?role=doctor`);
                navigate("/doctor-dashboard");
              }}
              className="w-full flex items-center justify-center gap-3 py-3 text-white bg-[#004B5C] rounded-full font-semibold text-base shadow hover:bg-[#003246] transition"
            >
              <FaUserMd className="text-lg" />
              Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoleScreen;
