const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

console.log('server.js starting');
dotenv.config();
console.log('dotenv configured');
connectDB();
console.log('connectDB called');

const app = express();
console.log('express app created');

// Allow CORS from any origin so the public frontend can access the API.
// Using `origin: true` will echo the request origin and allow credentials.
const corsOptions = {
  origin: true, // echo request origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
console.log('cors configured');

// Ensure preflight requests are handled for all routes
// Some environments/path-to-regexp versions can throw when registering a
// wildcard OPTIONS route. Handle preflight requests with explicit middleware
// instead to avoid parsing issues.
app.use((req, res, next) => {
  const origin = req.headers.origin || req.get('Origin') || true;
  res.header('Access-Control-Allow-Origin', origin === true ? '*' : origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
console.log('preflight middleware configured');


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes - mount with logging and guarded requires to identify faulty mounts
const mounts = [
  ["/api/auth", "./routes/authRoutes"],
  ["/api/doctor", "./routes/doctorRoutes"],
  ["/api/appointments", "./routes/appointmentRoutes"],
  ["/api/slots", "./routes/slotRoutes"],
  ["/api/hospitals", "./routes/hospitalRoutes"],
  ["/api/availability", "./routes/availabilityRoutes"],
  // ["/api/chat", "./routes/chatRoutes"],
  ["/api/search", "./routes/searchRoutes"],
  ["/api/doc-hosp", "./routes/doc&hospRoutes"],
  ["/api/patient", "./routes/patientRoutes"],
];

for (const [path, mod] of mounts) {
  try {
    console.log(`Mounting ${path} -> ${mod}`);
    const router = require(mod);
    app.use(path, router);
  } catch (err) {
    console.error(`Failed to mount ${path} (${mod}):`, err && err.stack ? err.stack : err);
    // Rethrow so startup still fails, but with clearer log about which mount caused it
    throw err;
  }
}

app.get("/", (req, res) => {
  res.send("API is Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
