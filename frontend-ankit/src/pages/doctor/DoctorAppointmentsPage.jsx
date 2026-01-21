import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AppointmentTabs from "../../components/AppointmentTabs";
import AppointmentCard from "../../components/AppointmentCard";
import TopIcons from "../../components/TopIcons";
import axios from "axios";
import { apiUrl } from "../../utils/api";

// Helper to calculate age from DOB
const calculateAge = (dob) => {
  if (!dob) return "-";
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
};

const DoctorAppointmentsPage = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          apiUrl("/api/appointments/doctor"),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const enrichedAppointments = (res.data || []).map((appt) => ({
          ...appt,
          patientAge: calculateAge(appt.patient?.dob),
        }));

        setAppointments(enrichedAppointments);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (appt) => appt.status === selectedTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#ECF3F9] px-6 py-8 md:px-12 text-[#1F2A37] font-poppins">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-4">
          <FaArrowLeft
            onClick={() => navigate("/doctor-dashboard")}
            className="text-xl text-[#0A4D68] cursor-pointer"
          />
          <h1 className="text-3xl font-bold tracking-tight text-[#0A4D68]">
            Appointments
          </h1>
        </div>
        <TopIcons />
      </header>

      {/* Tabs */}
      <AppointmentTabs active={selectedTab} onChange={setSelectedTab} />

      {/* Appointment Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {loading ? (
          <p className="text-center text-gray-400 text-sm mt-10">Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">
            No appointments in this category.
          </p>
        ) : (
          filteredAppointments.map((appt) => (
            <AppointmentCard key={appt._id} appt={appt} />
          ))
        )}
      </section>
    </div>
  );
};

export default DoctorAppointmentsPage;
