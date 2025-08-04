import React, { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: <FaHome />, label: "Home", path: "/doctor-dashboard" },
  { icon: <FaChartBar />, label: "Stats", path: "/doctor/stats" },
  { icon: <FaCalendarAlt />, label: "Availability", path: "/doctor/availability" },
  { icon: <FaRegCalendarCheck />, label: "Schedule", path: "/doctor/appointments" },
  { icon: <FaUser />, label: "Profile", path: "/doctor/profile" },
];

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white shadow-xl min-h-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-33" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex justify-center items-center py-4 border-b border-gray-200">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#0A4D68] text-2xl focus:outline-none"
            title={isOpen ? "Collapse" : "Expand"}
          >
            <FaBars />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col items-center gap-3 py-6 px-2 text-[#0A4D68]">
          {navItems.map((item, index) => {
            const isActive = activePath === item.path;

            return (
              <div
                key={index}
                onClick={() => {
                  if (activePath !== item.path) {
                    navigate(item.path);
                  }
                }}
                className={`group flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-[#0A4D68] font-semibold"
                    : "text-gray-600 hover:text-[#0A4D68]"
                }`}
                title={item.label}
              >
                <div className="text-2xl">{item.icon}</div>
                {isOpen && (
                  <span className="text-xs mt-1 leading-tight">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>


    </>
  );
};

export default SidebarNav;
