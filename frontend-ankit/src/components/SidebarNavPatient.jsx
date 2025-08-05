import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaCalendarAlt,
  FaCalendarCheck,
  FaUser,
  FaBars,
  FaHospital,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import FloatingContactButton from "./FloatingContactButton"; // <-- Import it
import { Hospital } from "lucide-react";

// navitems
const navItems = [


  { icon: <FaHospital />, label: "Hospitals", path: "/doctorspages/Cards-data" },
  { icon: <FaCalendarCheck />, label: "Appointments", path: "/patient/appointments" },
  { icon: <FaHome />, label: "Home", path: "/patient-dashboard" },
  { icon: <FaCalendarAlt />, label: "Calendar", path: "/patient/calendar" },
  { icon: <FaUser />, label: "Profile", path: "/patient/profile" },
];

const SidebarNavPatient = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Assume isBottomNavVisible is true on mobile (md:hidden), false otherwise
  // You can enhance this logic with context or state if needed
  const isBottomNavVisible = window.innerWidth < 768;

  // Track window width for responsive UI
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>
      {/* Sidebar for md+ screens */}
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
            const isActive = location.pathname === item.path;

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`group flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-[#0A4D68] font-semibold"
                    : "text-gray-600 hover:text-[#0A4D68]"
                }`}
                title={item.label}
              >
                <div className="text-2xl">{item.icon}</div>
                {isOpen && (
                  <span className="text-xs mt-1 leading-tight">{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav for mobile screens */}
      <div className="block md:hidden">
        <BottomNav navItems={navItems} />
      </div>

      {/* Floating Contact Button */}
      <FloatingContactButton isBottomNavVisible={isBottomNavVisible} />
    </>
  );
};

export default SidebarNavPatient;
