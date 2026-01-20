const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Slot = require("../models/Slot");

//Book an appointment 
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, patientInfo: incomingPatientInfo } = req.body;

    // Validate doctor slot availability
    const slot = await Slot.findOne({ doctor: doctorId, date });
    if (!slot || !slot.availableSlots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }

    // Fetch patient from DB to get DOB (to calculate age)
    const patientDoc = await User.findById(req.user.id).select("name gender dob phone");
    if (!patientDoc) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Calculate age
    const age = Math.floor(
      (Date.now() - new Date(patientDoc.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );

    // Normalize gender to lowercase (to match enum)
    const genderNormalized = patientDoc.gender.toLowerCase();

    // Build patientInfo for Appointment, using incoming mobile if provided or from DB
    const patientInfo = {
      name: patientDoc.name,
      gender: genderNormalized,
      age,
      phone: patientDoc.phone || (incomingPatientInfo && incomingPatientInfo.phone), // fallback to request data if phone missing in DB
      note: incomingPatientInfo?.note || "", // optionally take note from request
    };

    if (!patientInfo.phone) {
      return res.status(400).json({ message: "Patient phone number is required" });
    }

    // Create new appointment
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "Upcoming",
      patientInfo,
    });

    await appointment.save();

    // Remove booked slot from availableSlots and save
    slot.availableSlots = slot.availableSlots.filter((t) => t !== time);
    await slot.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("bookAppointment error:", err);
    res.status(500).json({ message: err.message });
  }
};



// Doctor views all appointment requests
const getDoctorAppointments = async (req, res) => {
  try {
    // Return all appointments so any user viewing the doctor dashboard
    // sees the complete list regardless of role or authenticated id.
    const appointments = await Appointment.find()
      .populate("patient", "name gender dob phone")
      .populate("doctor", "name email specialization")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Doctor updates appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patient views their appointments
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email specialization")
      .sort({ date: -1 });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientAppointments,
};
