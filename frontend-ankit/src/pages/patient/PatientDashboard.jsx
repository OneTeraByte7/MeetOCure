import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation as useRouterLocation, Link } from "react-router-dom";
import axios from "axios";
import PatientTopIcons from "../../components/PatientTopIcons";
import HeroCarousel from "../../components/HeroBanners";
import SidebarNavPatient from "../../components/SidebarNavPatient";
import FloatingContactButton from "../../components/FloatingContactButton";
import CardList from './CardList';
import { allDoctorsData } from './doctorspages/DoctorsData';
import { allHospitalsData } from './hospitalpages/HospitalsData';




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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setCity(storedCity);
  }, [routerLocation]);

  // Category mapping for filtering
  const categoryMapping = {
    'dentistry': ['Dentist', 'Dental'],
    'cardiology': ['Cardiologist', 'Cardiology'],
    'pulmonary': ['Pulmonologist', 'Pulmonary', 'Lungs'],
    'general': ['General', 'General Physician', 'Family Medicine'],
    'neurology': ['Neurologist', 'Neurology'],
    'gastroen': ['Gastroenterologist', 'Gastroenterology', 'Gastro'],
    'laboratory': ['Laboratory', 'Lab', 'Pathology'],
    'vaccination': ['Vaccination', 'Immunization', 'Vaccine']
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Get the search terms for this category
    const searchTerms = categoryMapping[category.toLowerCase()] || [category];

    // Filter doctors from the existing data (using doctorsData from Data.js)
    const doctors = doctorsData.filter(doctor =>
      searchTerms.some(term =>
        doctor.specialty.toLowerCase().includes(term.toLowerCase())
      )
    );

    // Filter hospitals from the existing data (using hospitalsData from Data.js)
    const hospitals = hospitalsData.filter(hospital =>
      searchTerms.some(term =>
        hospital.specialty.toLowerCase().includes(term.toLowerCase()) ||
        hospital.name.toLowerCase().includes(term.toLowerCase())
      )
    );

    setFilteredDoctors(doctors);
    setFilteredHospitals(hospitals);
  };

  const handleBackToDashboard = () => {
    setSelectedCategory(null);
    setFilteredDoctors([]);
    setFilteredHospitals([]);
  };

  const getCategoryTitle = (category) => {
    const titles = {
      'dentistry': 'Dentistry',
      'cardiology': 'Cardiology',
      'pulmonary': 'Pulmonary',
      'general': 'General Medicine',
      'neurology': 'Neurology',
      'gastroen': 'Gastroenterology',
      'laboratory': 'Laboratory',
      'vaccination': 'Vaccination',
    };
    return titles[category.toLowerCase()] || category;
  };

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
            {selectedCategory ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-2 text-[#0A4D68] hover:text-[#08374f] transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img
                  src="/assets/logo.png"
                  alt="Meetocure"
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                />
                <h1 className="text-3xl font-bold text-[#0A4D68]">Meetocure</h1>
              </div>
            )}

            {/* Category Header or Location */}
            {selectedCategory ? (
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={`/assets/categories/${categories.find(cat => cat.label.toLowerCase() === selectedCategory.toLowerCase())?.icon || 'general.png'}`}
                  alt={getCategoryTitle(selectedCategory)}
                  className="w-12 h-12"
                />
                <div>
                  <h1 className="text-3xl font-bold text-[#0A4D68]">{getCategoryTitle(selectedCategory)}</h1>
                  <div className="flex items-center gap-2 text-[#0A4D68] text-sm">
                    <FaMapMarkerAlt />
                    <span>{city}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-[#0A4D68] cursor-pointer hover:underline text-sm md:text-base pl-1"
                onClick={() => navigate("/location")}
              >
                <FaMapMarkerAlt />
                <span>{city}</span>
              </div>
            )}
          </div>
          <PatientTopIcons />
        </div>

        {!selectedCategory ? (
          <>
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
                  onClick={() => handleCategoryClick(item.label)}
                  className="bg-[#E0F2FE] hover:bg-[#BDE0F9] w-full h-52 rounded-3xl shadow-md flex flex-col justify-center items-center px-4 py-6 transition duration-300 ease-in-out cursor-pointer"
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
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {selectedCategory ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setFilteredDoctors([]);
                          setFilteredHospitals([]);
                        }}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaArrowLeft />
                        <span>Back to All Categories</span>
                      </button>
                    </div>
                    {filteredDoctors.length > 0 && (
                      <CardList title={`${selectedCategory} Doctors`} data={filteredDoctors} type="doctor" />
                    )}
                    {filteredHospitals.length > 0 && (
                      <CardList title={`${selectedCategory} Hospitals`} data={filteredHospitals} type="hospital" />
                    )}
                    {filteredDoctors.length === 0 && filteredHospitals.length === 0 && (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
                        <p className="text-gray-600">No doctors or hospitals found for {selectedCategory} category.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <CardList title="Nearby Doctors" data={allDoctorsData} type="doctor" />
                    <CardList title="Nearby Hospitals" data={allHospitalsData} type="hospital" />
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Category Results */
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {filteredDoctors.length > 0 && (
                <CardList
                  title={`${getCategoryTitle(selectedCategory)} Doctors`}
                  data={filteredDoctors}
                  type="doctor"
                />
              )}

              {filteredHospitals.length > 0 && (
                <CardList
                  title={`${getCategoryTitle(selectedCategory)} Hospitals & Clinics`}
                  data={filteredHospitals}
                  type="hospital"
                />
              )}

              {filteredDoctors.length === 0 && filteredHospitals.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-500 text-lg mb-4">
                    No {getCategoryTitle(selectedCategory).toLowerCase()} providers found in {city}
                  </div>
                  <button
                    onClick={handleBackToDashboard}
                    className="bg-[#0A4D68] text-white px-6 py-3 rounded-lg hover:bg-[#08374f] transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              )}
            </div>
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
  { label: "Vaccination", icon: "vaccine.png" }
];

export default PatientDashboard;
