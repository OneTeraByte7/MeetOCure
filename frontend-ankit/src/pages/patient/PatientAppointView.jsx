import React, { useEffect, useState } from "react";
import { Calendar, Clock, Edit3, ChevronLeft, ChevronRight, Plus, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PatientTopIcons from "../../components/PatientTopIcons";

export default function PatientAppointView() {
  const [appointment, setAppointment] = useState({ date: null, time: null });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const date = localStorage.getItem("appointmentDate");
    const time = localStorage.getItem("appointmentTime");
    setAppointment({ date, time });
  }, []);

  const appointmentDateObj = appointment.date ? new Date(appointment.date) : null;
  const today = new Date();
  
  // Check if appointment has passed
  const isAppointmentPast = () => {
    if (!appointmentDateObj || !appointment.time) return false;
    
    const [time, period] = appointment.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let appointmentHours = hours;
    
    if (period === 'PM' && hours !== 12) appointmentHours += 12;
    if (period === 'AM' && hours === 12) appointmentHours = 0;
    
    const appointmentDateTime = new Date(appointmentDateObj);
    appointmentDateTime.setHours(appointmentHours, minutes, 0, 0);
    
    return appointmentDateTime < new Date();
  };
  
  const appointmentPassed = isAppointmentPast();

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const calendar = [];

    for (let i = 0; i < startDay; i++) calendar.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      calendar.push(new Date(currentYear, currentMonth, d));
    }
    return calendar;
  };

  const handleMonthChange = (dir) => {
    if (dir === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    
            <div className="mb-8">
                <div className="flex items-center justify-between gap-4">
                    <Link
                        to={"/patient-dashboard"}
                        className="flex items-center gap-2 text-[#0A4D68] hover:text-[#083952] transition-colors group w-fit"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-3 justify-center">
                        <h1 className="text-2xl font-bold text-[#0A4D68]">
                            Your Appointments
                        </h1>
                    </div>
                    <PatientTopIcons/>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Card - Now First */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#0A4D68] flex items-center gap-3">
                                <Calendar className="w-6 h-6" />
                                Calendar View
                            </h2>

                            {/* Month Navigation */}
                            <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 rounded-full px-2 sm:px-4 py-2">
                                <button
                                    onClick={() => handleMonthChange("prev")}
                                    className="p-2 hover:bg-white rounded-full transition-all duration-200 hover:shadow-md"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>

                                <span className="text-lg font-semibold text-[#0A4D68] min-w-[100px] sm:min-w-[140px] text-center">
                                    {monthNames[currentMonth]} {currentYear}
                                </span>

                                <button
                                    onClick={() => handleMonthChange("next")}
                                    className="p-2 hover:bg-white rounded-full transition-all duration-200 hover:shadow-md"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="bg-gray-50 rounded-2xl p-3 sm:p-6">
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                                {dayNames.map((day) => (
                                    <div
                                        key={day}
                                        className="text-center font-semibold text-gray-500 text-xs sm:text-sm py-1 sm:py-2"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                                {generateCalendar().map((date, idx) => {
                                    const isAppointmentDate =
                                        date &&
                                        appointmentDateObj &&
                                        date.toDateString() === appointmentDateObj.toDateString();
                                    const isToday =
                                        date && date.toDateString() === today.toDateString();
                                    const isPastDate = date && date < today && !isToday;

                                    return (
                                        <div key={idx} className="relative">
                                            {date ? (
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer
                                                            ${
                                                                isAppointmentDate
                                                                    ? "bg-gradient-to-r from-[#0A4D68] to-[#083952] text-white shadow-lg transform scale-105"
                                                                    : isToday
                                                                    ? "bg-gray-200 text-[#0A4D68] border-2 border-[#0A4D68]"
                                                                    : isPastDate
                                                                    ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
                                                                    : "hover:bg-gray-200 text-gray-700 hover:text-[#0A4D68]"
                                                            }`}
                                                    >
                                                        {date.getDate()}
                                                    </div>
                                                    {isAppointmentDate && (
                                                        <div
                                                            className={`mt-1 sm:mt-2 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full shadow-sm ${
                                                                appointmentPassed
                                                                    ? "bg-gray-500"
                                                                    : "bg-[#0A4D68]"
                                                            }`}
                                                        >
                                                            {appointment.time}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 sm:w-12 sm:h-12" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Details Sidebar - Now Second */}
                <div className="space-y-6 order-1 lg:order-2">
                    {/* Appointment Status Card */}
                    {appointment.date && appointment.time ? (
                        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                                        appointmentPassed ? "bg-gray-100" : "bg-green-100"
                                    }`}
                                >
                                    <CheckCircle
                                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                            appointmentPassed ? "text-gray-500" : "text-green-600"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <h3
                                        className={`text-lg sm:text-xl font-bold ${
                                            appointmentPassed
                                                ? "text-gray-600"
                                                : "text-[#0A4D68]"
                                        }`}
                                    >
                                        {appointmentPassed
                                            ? "Completed Appointment"
                                            : "Active Appointment"}
                                    </h3>
                                    <p className="text-gray-500 text-xs sm:text-sm">
                                        {appointmentPassed
                                            ? "This appointment has ended"
                                            : "Your next scheduled visit"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                <div
                                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                                        appointmentPassed ? "bg-gray-100" : "bg-gray-50"
                                    }`}
                                >
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A4D68]" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                            Date
                                        </p>
                                        <p
                                            className={`text-base sm:text-lg font-semibold ${
                                                appointmentPassed ? "text-gray-600" : "text-gray-800"
                                            }`}
                                        >
                                            {appointment.date}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                                        appointmentPassed ? "bg-gray-100" : "bg-gray-50"
                                    }`}
                                >
                                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A4D68]" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                            Time
                                        </p>
                                        <p
                                            className={`text-base sm:text-lg font-semibold ${
                                                appointmentPassed ? "text-gray-600" : "text-gray-800"
                                            }`}
                                        >
                                            {appointment.time}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {appointmentPassed ? (
                                <div className="w-full bg-gray-300 text-gray-600 py-3 sm:py-4 px-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 font-medium cursor-not-allowed text-sm sm:text-base">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Appointment Completed
                                </div>
                            ) : (
                                <button className="w-full bg-gradient-to-r from-[#0A4D68] to-[#083952] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
                                    <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Modify Appointment
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100 text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#0A4D68] mb-2 sm:mb-4">
                                No Appointments
                            </h3>
                            <p className="text-gray-500 mb-4 sm:mb-8 text-sm sm:text-base">
                                You don't have any upcoming appointments scheduled.
                            </p>

                            <button className="w-full bg-gradient-to-r from-[#0A4D68] to-[#083952] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm sm:text-base">
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                Schedule Appointment
                            </button>
                        </div>
                    )}

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100">
                        <h3 className="text-base sm:text-lg font-bold text-[#0A4D68] mb-4 sm:mb-6">
                            Quick Actions
                        </h3>

                        <div className="space-y-2 sm:space-y-3">
                            <button className="w-full text-left p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 sm:gap-3 group">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#0A4D68] transition-colors">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                                        View All Appointments
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        See your appointment history
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
