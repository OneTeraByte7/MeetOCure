import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, useLocation as useRouterLocation, Link } from "react-router-dom";
import axios from "axios";
import PatientTopIcons from "../../components/PatientTopIcons";
import HeroCarousel from "../../components/HeroBanners";
import SidebarNavPatient from "../../components/SidebarNavPatient";
import FloatingContactButton from "../../components/FloatingContactButton";
import CardList from './CardList';
import { doctorsData, hospitalsData } from './Data';

// Import the new doctor and hospital data
const allDoctorsData = [
  {
    id: 101,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    location: 'Vijayawada',
    rating: 4.9,
    image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
    patients: '1,200+',
    experience: '12+',
    reviews: 156,
    contact: '+91 9876543001',
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases.',
    distance: '1.8 km away'
  },
  {
    id: 102,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    location: 'Guntur',
    rating: 4.8,
    image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
    patients: '900+',
    experience: '8+',
    reviews: 134,
    contact: '+91 9876543002',
    about: 'Dr. Michael Chen is a renowned dermatologist specializing in cosmetic dermatology and skin cancer treatment.',
    distance: '2.3 km away'
  },
  {
    id: 103,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    location: 'Tenali',
    rating: 4.7,
    image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
    patients: '1,500+',
    experience: '15+',
    reviews: 98,
    contact: '+91 9876543003',
    about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children.',
    distance: '3.1 km away'
  },
  {
    id: 104,
    name: 'Dr. David Kim',
    specialty: 'Neurologist',
    location: 'Vijayawada',
    rating: 4.9,
    image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
    patients: '800+',
    experience: '18+',
    reviews: 187,
    contact: '+91 9876543004',
    about: 'Dr. David Kim is a leading neurologist specializing in stroke treatment and neurological disorders.',
    distance: '4.2 km away'
  }
];

const allHospitalsData = [
  {
    id: 1,
    name: 'Sunrise Health Hospital',
    specialty: 'Hospital',
    location: 'Vijayawada',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop',
    patients: '2,000+',
    experience: '10+',
    reviews: 1872,
    contact: '+91 9939069288',
    about: 'Sunrise Health Hospital is a state-of-the-art medical facility providing comprehensive healthcare services.',
    distance: '2.5 km away'
  },
  {
    id: 2,
    name: 'Healing Touch Clinic',
    specialty: 'Clinic',
    location: 'Guntur',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop',
    patients: '1,800+',
    experience: '12+',
    reviews: 212,
    contact: '+91 9876543211',
    about: 'Healing Touch Clinic provides personalized healthcare services in a comfortable, welcoming environment.',
    distance: '1.2 km away'
  },
  {
    id: 3,
    name: 'Bright Smile Dental',
    specialty: 'Dental',
    location: 'Tenali',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606318467434-d4a6a6f33230?q=80&w=600&auto=format&fit=crop',
    patients: '900+',
    experience: '7+',
    reviews: 98,
    contact: '+91 9876543212',
    about: 'Bright Smile Dental provides comprehensive dental care with modern technology and experienced professionals.',
    distance: '3.1 km away'
  },
  {
    id: 4,
    name: 'Green Leaf Ayurvedic',
    specialty: 'Ayurvedic',
    location: 'Vijayawada',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544132139-9945c742734a?q=80&w=600&auto=format&fit=crop',
    patients: '2,200+',
    experience: '15+',
    reviews: 301,
    contact: '+91 9876543213',
    about: 'Green Leaf Ayurvedic Center offers traditional Ayurvedic treatments and wellness programs.',
    distance: '5.5 km away'
  }
];


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
      <div className="flex-1 min-h-screen px-6 py-6 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
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
        <SectionHeader title="Categories" seeAllLink="/doctorspages/Cards-data.jsx" />
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

        {/* Doctors
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
        )} */}

        {/* Hospitals */}
        {/* <SectionHeader title="Nearby Hospitals" seeAllLink="/patient/hospitals" />
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
        )} */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <CardList title="Nearby Doctors" data={allDoctorsData} type="doctor" />
            <CardList title="Nearby Hospitals" data={allHospitalsData} type="hospital" />
          </div>
        </div>
      </div>
      <FloatingContactButton />
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
        <Link to={"/doctorspages/Cards-data"}>
          See All
        </Link>
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
