import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";
import axios from "axios";
import PatientTopIcons from "../../components/PatientTopIcons";
import HeroCarousel from "../../components/HeroBanners";
import SidebarNavPatient from "../../components/SidebarNavPatient";
import FloatingContactButton from "../../components/FloatingContactButton";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [city, setCity] = useState("Vijayawada");
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState(null);
  const [errorHospitals, setErrorHospitals] = useState(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setCity(storedCity);
  }, [routerLocation]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // your auth token key

    if (!token) {
      console.warn("No auth token found. Cannot fetch protected routes.");
      return;
    }

    setLoadingDoctors(true);
    axios
      .get("https://meetocure.onrender.com/api/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDoctors(Array.isArray(res.data) ? res.data : []);
        setErrorDoctors(null);
      })
      .catch((err) => {
        setErrorDoctors(err.response?.data?.message || err.message);
      })
      .finally(() => setLoadingDoctors(false));

    setLoadingHospitals(true);
    axios
      .get("https://meetocure.onrender.com/api/hospitals")
      .then((res) => {
        setHospitals(Array.isArray(res.data) ? res.data : []);
        setErrorHospitals(null);
      })
      .catch((err) => {
        setErrorHospitals(err.response?.data?.message || err.message);
      })
      .finally(() => setLoadingHospitals(false));
  }, []);

  return (
    <div className="flex font-[Poppins] bg-[#F8FAFC] min-h-screen">
      <SidebarNavPatient />
      <div className="flex-1 min-h-screen px-6 py-6 pb-20 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img
                src="/assets/logo.png"
                alt="Meetocure"
                className="w-14 h-14 rounded-full object-cover shadow-md"
              />
              <h1 className="text-3xl font-bold text-[#0A4D68]">Meetocure</h1>
            </div>

            {/* Location */}
            <div
              className="flex items-center gap-2 text-[#0A4D68] cursor-pointer hover:underline text-sm md:text-base pl-1"
              onClick={() => navigate("/location")}
            >
              <FaMapMarkerAlt />
              <span>{city}</span>
            </div>
          </div>
          <PatientTopIcons />
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for doctors or specialties..."
            className="w-full max-w-xl px-5 py-3 border rounded-xl shadow-sm bg-white focus:outline-none"
          />
        </div>

        {/* Hero */}
        <div className="mb-10">
          <HeroCarousel height="h-64" />
        </div>

        {/* Categories */}
        <SectionHeader title="Categories" seeAllLink="/patient/categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((item) => (
            <div
              key={item.label}
              className="bg-[#E0F2FE] hover:bg-[#BDE0F9] w-full h-52 rounded-3xl shadow-md flex flex-col justify-center items-center px-4 py-6 transition duration-300 ease-in-out"
            >
              <img
                src={`/assets/categories/${item.icon}`}
                alt={item.label}
                className="w-12 h-12 mb-3"
              />
              <p className="text-base font-semibold text-gray-700 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Doctors */}
        <SectionHeader title="Nearby Doctors" seeAllLink="/patient/doctors" />
        {loadingDoctors ? (
          <p>Loading doctors...</p>
        ) : errorDoctors ? (
          <p className="text-red-600">Error: {errorDoctors}</p>
        ) : doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {doctors.map((doc) => (
              <DoctorCard
                key={doc._id}
                name={doc.name}
                specialty={doc.specialization || "General"}
                location={doc.address || "Unknown"}
                image={doc.photo || "/assets/doctor2.png"}
              />
            ))}
          </div>
        )}

        {/* Hospitals */}
        <div className="">
        <SectionHeader title="Nearby Hospitals" seeAllLink="/patient/hospitals" />
        </div>
        {loadingHospitals ? (
          <p>Loading hospitals...</p>
        ) : errorHospitals ? (
          <p className="text-red-600">Error: {errorHospitals}</p>
        ) : hospitals.length === 0 ? (
          <p>No hospitals found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hosp) => (
              <HospitalCard
                key={hosp._id}
                name={hosp.name}
                address={hosp.city || "Unknown"}
                image={hosp.image || "/assets/doctor2.png"}
              />
            ))}
          </div>
        )}
        
      </div>
     
    </div>
  );
};

const SectionHeader = ({ title, seeAllLink }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
    {seeAllLink && (
      <a
        href={seeAllLink}
        className="text-sm text-[#0A4D68] hover:underline font-medium"
      >
        See All
      </a>
    )}
  </div>
);

const DoctorCard = ({ name, specialty, location, image }) => (
  <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
    <div className="w-full h-44 overflow-hidden rounded-lg mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <h3 className="text-lg font-semibold text-[#1F2A37]">{name}</h3>
    <p className="text-sm text-gray-500">{specialty}</p>
    <p className="text-sm text-gray-400">{location}</p>
  </div>
);

const HospitalCard = ({ name, address, image }) => (
  <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
    <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <h3 className="text-lg font-semibold text-[#1F2A37]">{name}</h3>
    <p className="text-sm text-gray-500">{address}</p>
  </div>
);

const categories = [
  { label: "Dentistry", icon: "dentist.png" },
  { label: "Cardiology", icon: "cardiology.png" },
  { label: "Pulmonary", icon: "lungs.png" },
  { label: "General", icon: "general.png" },
  { label: "Neurology", icon: "brain.png" },
  { label: "Gastroen", icon: "stomach.png" },
  { label: "Laboratory", icon: "lab.png" },
  { label: "Vaccination", icon: "vaccine.png" },
];

export default PatientDashboard;
