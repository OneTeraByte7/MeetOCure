import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../utils/api';
import PatientTopIcons from '../../../components/PatientTopIcons';
import { FaArrowLeft } from 'react-icons/fa';
import { HeartIcon, HospitalIcon as BuildingIcon, LocationPinIcon, RouteIcon } from './Icons';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const StatItem = ({ icon, value, label }) => (
    <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-[#0c4d6b] text-2xl">
            {icon}
        </div>
        <p className="font-bold text-gray-800 text-lg">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
    </div>
);

const DetailSection = ({ title, children }) => (
    <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className="text-gray-600 leading-relaxed text-justify">{children}</div>
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-start space-x-4">
            <img src={review.avatarUrl} alt={review.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
            <div className="flex-1">
                <h4 className="font-bold text-gray-800">{review.name}</h4>
                <p className="text-gray-600 leading-relaxed mt-1 text-sm">{review.reviewText}</p>
            </div>
        </div>
    </div>
);

const HospitalDetailsPage = ({ hospitalId, onBack, onToggleFavorite }) => {
    const [hospital, setHospital] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const res = await axios.get(apiUrl(`/api/hospitals`));
                setHospital(res.data);
            } catch (err) {
                console.error("Error fetching hospital data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHospital();
    }, [hospitalId]);

    if (isLoading || !hospital) {
        return <div className="p-8 text-center text-gray-600">Loading hospital data...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#ECF3F9] px-6 py-8 md:px-12 text-[#1F2A37] font-poppins">
            <header className="flex items-center justify-between mb-8 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-4">
                    <FaArrowLeft
                        onClick={() => navigate(-1)}
                        className="text-xl text-[#0A4D68] cursor-pointer"
                    />
                    <h1 className="text-3xl font-bold tracking-tight text-[#0A4D68]">
                        All Hospitals
                    </h1>
                </div>
                <PatientTopIcons />
            </header>
            <main className="p-4 space-y-8 pb-32">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col sm:flex-row sm:space-x-4">
                    <div className="relative w-full sm:w-28 h-28 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                            src={hospital.imageUrl || 'https://via.placeholder.com/150'}
                            alt={hospital.name}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start space-x-2">
                            <h2 className="font-bold text-gray-900 text-xl">{hospital.name}</h2>
                            <button
                                onClick={() => onToggleFavorite(hospital._id)}
                                className="transition-colors flex-shrink-0 text-gray-400 hover:text-red-500"
                            >
                                <HeartIcon className={`w-7 h-7 ${hospital.isFavorite ? 'text-red-500' : ''}`} isFilled={hospital.isFavorite} />
                            </button>
                        </div>
                        <div className="mt-2 space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <RouteIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span>{(hospital.distance || 0).toFixed(1)} km / {hospital.timeFromDevice || '--'} min</span>
                                <div className="ml-auto flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold">
                                    <BuildingIcon className="w-3 h-3 mr-1" />
                                    <span>{hospital.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <LocationPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span>{hospital.city}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                    <StatItem icon={<BsStarFill />} value={String(hospital.rating)} label="rating" />
                    <StatItem icon={<FaRegCommentDots />} value={String(hospital.reviews?.length || 0)} label="reviews" />
                </div>

                {hospital.contact && (
                    <DetailSection title="Contact Details">
                        <p>{hospital.contact}</p>
                    </DetailSection>
                )}

                {hospital.description && (
                    <DetailSection title="About Hospital">
                        <p>{hospital.description}</p>
                    </DetailSection>
                )}

                {hospital.workingHours && (
                    <DetailSection title="Working Time">
                        <p>{hospital.workingHours}</p>
                    </DetailSection>
                )}

                {hospital.reviews && hospital.reviews.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
                        <div className="space-y-4">
                            {hospital.reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
                        </div>
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-10">
                <button className="w-full bg-[#0c4d6b] text-white py-3.5 rounded-full font-bold text-lg shadow-lg hover:bg-[#093b52] transition-colors">
                    Book Appointment
                </button>
            </footer>
        </div>
    );
};

export default HospitalDetailsPage;
