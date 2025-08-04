import React from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/HeroBanners";
import TodayAppointments from "../../components/TodayAppointments";
import SidebarNav from "../../components/SidebarNav";
import BottomNav from "../../components/BottomNav";
import TopIcons from "../../components/TopIcons"; 
import { FaCalendarAlt, FaChartBar, FaHome, FaRegCalendarCheck, FaUser } from "react-icons/fa";
const navItems = [
  { icon: <FaChartBar />, label: "Stats", path: "/doctor/stats" },
  { icon: <FaCalendarAlt />, label: "Availability", path: "/doctor/availability" },
  { icon: <FaHome />, label: "Home", path: "/doctor-dashboard" },
  { icon: <FaRegCalendarCheck />, label: "Schedule", path: "/doctor/appointments" },
  { icon: <FaUser />, label: "Profile", path: "/doctor/profile" },
];
const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-[#F8FAFC] font-[Poppins]">
      {/* Sidebar */}
      <SidebarNav navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen px-6 py-6 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="Meetocure"
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <h1 className="text-3xl font-bold text-[#0A4D68]">Meetocure</h1>
          </div>
          <TopIcons />
        </div>

        {/* Hero Banner */}
        <div className="mb-10">
          <HeroCarousel />
        </div>

        {/* Today Appointments */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#1F2A37]">
            Today Appointments
          </h2>
          <span
            onClick={() => navigate("/doctor/appointments")}
            className="text-sm md:text-base text-[#0A4D68] cursor-pointer hover:underline font-medium"
          >
            See All
          </span>
        </div>
        <TodayAppointments />

        {/* Quick Stats */}
        <div className="flex justify-between items-center mt-12 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#1F2A37]">
            Quick Stats
          </h2>
          <span
            onClick={() => navigate("/doctor/stats")}
            className="text-sm md:text-base text-[#0A4D68] cursor-pointer hover:underline font-medium"
          >
            See All
          </span>
        </div>

        {/* Stats Cards Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard title="Appointments" value="30" />
          <StatCard title="Pending Appt" value="5" />
        </div>

        {/* Stats Cards Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <StatCard title="Earnings" value="₹3000" prefix="Earned : " />
          <StatCard title="Patients" value="30" />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="block md:hidden">
        <BottomNav navItems={navItems} />
      </div>
    </div>
  );
};

// Reusable stat card
const StatCard = ({ title, value, prefix = "Count : " }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 text-center border border-gray-100">
    <p className="text-xs text-gray-400 mb-1">Today</p>
    <h3 className="font-semibold text-lg text-[#1F2A37] border-b pb-2 mb-3">
      {title}
    </h3>
    <p className="text-[#0A4D68] text-xl font-bold">
      {prefix}
      {value}
    </p>
  </div>
);

export default DoctorDashboard;
