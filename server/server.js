const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://meet-o-cure-oneterabyte7s-projects.vercel.app",
  "https://meet-o-cure.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
//app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.use("/api/doc&hosp", require("./routes/doc&hospRoutes"));
app.use("/api/patient", require("./routes/patientRoutes"));

app.get("/", (req, res) => {
  res.send("API is Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
