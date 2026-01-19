import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaRegCommentDots } from 'react-icons/fa';
import { BsAwardFill, BsStarFill } from 'react-icons/bs';
import { ChevronLeft, MessageCircle, Wallet, Bell } from 'lucide-react';
import PatientTopIcons from '../../components/PatientTopIcons';
import { allDoctorsData } from './doctorspages/DoctorsData';
import { allHospitalsData } from './hospitalpages/HospitalsData';

// Transform the new data structure to match the expected format
const transformHospitalData = (hospital) => ({
    id: hospital.id,
    name: hospital.name,
    specialty: hospital.type,
    location: hospital.location,
    rating: hospital.rating,
    image: hospital.imageUrl,
    patients: hospital.patients,
    experience: hospital.experience,
    reviews: hospital.reviews,
    contact: hospital.contact,
    about: `${hospital.name} is a ${hospital.type.toLowerCase()} providing quality healthcare services.`,
    distance: `${hospital.distance} km away`
});

const transformDoctorData = (doctor) => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.type,
    location: doctor.location,
    rating: doctor.rating,
    image: doctor.imageUrl,
    patients: doctor.patients,
    experience: doctor.experience,
    reviews: doctor.reviews,
    contact: doctor.contact,
    about: `${doctor.name} is a ${doctor.type.toLowerCase()} with ${doctor.experience} years of experience.`,
    distance: `${doctor.distance} km away`
});

// Transform all data to the expected format
const transformedHospitals = allHospitalsData.map(transformHospitalData);
const transformedDoctors = allDoctorsData.map(transformDoctorData);

// Combine all data sources for easier lookup
const allData = [...transformedHospitals, ...transformedDoctors];

const DetailPage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Hook for navigation

    // Try to find the item by ID (handle both string and numeric IDs)
    const item = allData.find(d => d.id.toString() === id.toString());

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h2>
                    <p className="text-gray-600 mb-6">The doctor or hospital you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#0c4d6b] text-white px-6 py-2 rounded-lg hover:bg-[#0a3d5a]"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Stat component for reuse
    const StatItem = ({ icon, value, label }) => (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#0c4d6b] text-2xl">
                {icon}
            </div>
            <p className="font-bold text-gray-800 text-lg">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
        </div>
    );
    return (
        <div className="pb-28 flex-auto bg-white"> {/* Padding bottom to clear the fixed button */}
            {/* Header */}
            <header className="p-8 flex justify-between bg-gray-50 shadow-sm">
            <div className="flex-row">
                <button onClick={() => navigate(-1)} className="text-2xl text-gray-700">
                    <ChevronLeft className="fas fa-arrow-left" />
                </button>
                <h1 className="text-xl ml-10 -mt-8 font-bold text-gray-800">
                    <h1>{item.specialty.includes('Clinic') || item.specialty.includes('Hospital') || item.specialty.includes('Pharmacy') || item.specialty.includes('Dental') || item.specialty.includes('Ayurvedic') ? 'Hospital Details' : 'Doctor Details'}</h1>
                </h1>
            </div>
                <div className="gap-2 ml-200 mr-8">
                    <PatientTopIcons />
                </div>
            </header>

            <main className="p-4 max-w-8xl mx-auto">
                {/* Main Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex gap-4 items-center mb-8">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-full object-cover" />
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.name}</h2>
                        <div className="flex items-center gap-4 text-gray-600 mb-1">
                            <span className="flex items-center gap-1">
                                <i className="fa-solid fa-route text-sm"></i>
                                {item.distance}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                {item.specialty}
                            </span>
                        </div>
                        <p className="text-gray-500 flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-sm"></i>
                            {item.location}
                        </p>
                    </div>
                    <i className="far fa-heart text-2xl text-gray-400 cursor-pointer"></i>
                </div>
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-8 mb-8">
                    <StatItem icon={<FaUserFriends />} value={item.patients} label="patients" />
                    <StatItem icon={<BsAwardFill />} value={item.experience} label="experience" />
                    <StatItem icon={<BsStarFill />} value={`${item.rating}`} label="rating" />
                    <StatItem icon={<FaRegCommentDots />} value={item.reviews} label="reviews" />
                </div>

                {/* Contact & About */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Contact Details</h3>
                        <p className="text-gray-700">Contact: {item.contact}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">About {item.specialty.includes('Clinic') || item.specialty.includes('Hospital') || item.specialty.includes('Pharmacy') || item.specialty.includes('Dental') || item.specialty.includes('Ayurvedic') ? 'Hospital' : 'Doctor'}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.about}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailPage;