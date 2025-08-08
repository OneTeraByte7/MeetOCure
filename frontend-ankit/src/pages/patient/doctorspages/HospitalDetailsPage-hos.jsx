import React, { useEffect, useState } from 'react';

import Headerhos from './Header-hos';
import { HeartIcon, HospitalIcon as BuildingIcon, LocationPinIcon, RouteIcon } from './Icons';
import { FaUserFriends, FaRegCommentDots } from 'react-icons/fa';
import { BsAwardFill, BsStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import PatientTopIcons from '../../../components/PatientTopIcons';
import { FaArrowLeft } from 'react-icons/fa';
// import { GoogleGenAI, Type } from "@google/genai";



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
        <div className="text-gray-600 leading-relaxed text-justify">
            {children}
        </div>
    </div>
);

const ReviewCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
        <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
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


const HospitalDetailsPage = ({ hospital, onBack, onToggleFavorite }) => {
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const generateContent = async () => {
            setIsLoading(true);

            const setFallbackContent = () => {
                setDescription("This hospital is dedicated to providing top-quality medical services and compassionate care to the community, utilizing modern technology and a patient-first approach.");
                setReviews([
                    { name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?img=1', reviewText: 'A great experience. The staff was very professional and caring throughout my visit.' },
                    { name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?img=2', reviewText: 'Clean facility and the wait times were shorter than I expected. Would recommend.' }
                ]);
            };

            if (!process.env.API_KEY) {
                setFallbackContent();
                setIsLoading(false);
                return;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const numberOfReviews = Math.floor(Math.random() * 3) + 2; // 2 to 4

                const prompt = `As a content writer for a hospital's website, create content for "${hospital.name}", which is a ${hospital.type}.
1. **About Section**: Write a warm and welcoming "About Us" paragraph. It should be around 50-70 words, highlighting the hospital's commitment to patient care and its role in the community. Avoid corporate jargon.
2. **Patient Testimonials**: Generate ${numberOfReviews} patient testimonials. They must sound authentic, with different tones and voices.
   - Give each a plausible first and last name.
   - Write a short testimonial (1-3 sentences).
   - Vary the focus: some might praise the staff, others the facility, others the efficiency.
   - Provide a unique placeholder avatar URL for each using "https://i.pravatar.cc/150?img=X" where X is a unique integer for each review.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                description: {
                                    type: Type.STRING,
                                    description: "A warm and welcoming 'About Us' paragraph for the hospital."
                                },
                                reviews: {
                                    type: Type.ARRAY,
                                    description: "A list of authentic-sounding patient testimonials.",
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING, description: "Fictional patient name." },
                                            avatarUrl: { type: Type.STRING, description: "Placeholder avatar URL." },
                                            reviewText: { type: Type.STRING, description: "The text of the patient's testimonial." },
                                        },
                                        required: ['name', 'avatarUrl', 'reviewText']
                                    }
                                }
                            },
                            required: ['description', 'reviews']
                        }
                    }
                });

                const content = JSON.parse(response.text.trim());
                setDescription(content.description);
                setReviews(content.reviews);

            } catch (err) {
                console.error("Error fetching details, falling back to default content:", err);
                setFallbackContent();
            } finally {
                setIsLoading(false);
            }
        };

        generateContent();
    }, [hospital.id, hospital.name, hospital.type]);

    return (
        <div className="bg-gray-100 min-h-screen font-oppins">
                <header className="flex items-center justify-between mb-8 border-b border-[#E2E8F0] pb-4">
                    <div className="flex items-center gap-4">
                        <FaArrowLeft
                            onClick={() => navigate(-1)}
                            className="text-xl text-[#0A4D68] cursor-pointer"
                        />
                        <h1 className="text-3xl font-bold tracking-tight text-[#0A4D68]">
                            Hospital Details
                        </h1>
                    </div>
                    <PatientTopIcons />
                </header>

                <main className="p-4 space-y-8 pb-32">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col sm:flex-row sm:space-x-4">
                        <div className="relative w-full sm:w-28 h-28 flex-shrink-0 mb-4 sm:mb-0">
                            <img
                                src={hospital.imageUrl}
                                alt={hospital.name}
                                className="w-full h-full object-cover rounded-xl"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start space-x-2">
                                <h2 className="font-bold text-gray-900 text-xl">{hospital.name}</h2>
                                <button
                                    onClick={() => onToggleFavorite(hospital.id)}
                                    className="transition-colors flex-shrink-0 text-gray-400 hover:text-red-500"
                                    aria-label={hospital.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <HeartIcon className={`w-7 h-7 ${hospital.isFavorite ? 'text-red-500' : ''}`} isFilled={hospital.isFavorite} />
                                </button>
                            </div>
                            <div className="mt-2 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <RouteIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span>{hospital.distance.toFixed(1)} km/{hospital.time}min</span>
                                    <div className="ml-auto flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold">
                                        <BuildingIcon className="w-3 h-3 mr-1" />
                                        <span>{hospital.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <LocationPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span>{hospital.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                        {hospital.patients && <StatItem icon={<FaUserFriends />} value={hospital.patients} label="patients" />}
                        {hospital.experience && <StatItem icon={<BsAwardFill />} value={hospital.experience} label="experience" />}
                        <StatItem icon={<BsStarFill />} value={String(hospital.rating)} label="rating" />
                        <StatItem icon={<FaRegCommentDots />} value={String(hospital.reviews)} label="reviews" />
                    </div>

                    {hospital.contact && (
                        <DetailSection title="Contact Details">
                            <p>Hospital Contact Details : {hospital.contact}</p>
                        </DetailSection>
                    )}

                    <DetailSection title="About Hospital">
                        {isLoading ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ) : (
                            <p>{description}</p>
                        )}
                    </DetailSection>


                    {hospital.workingHours && (
                        <DetailSection title="Working Time">
                            <p>{hospital.workingHours}</p>
                        </DetailSection>
                    )}

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
                            {!isLoading && <button className="text-[#0c4d6b] font-semibold text-sm">See All</button>}
                        </div>
                        <div className="space-y-4">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => <ReviewCardSkeleton key={i} />)
                            ) : (
                                reviews.map((review, index) => <ReviewCard key={index} review={review} />)
                            )}
                        </div>
                    </div>
                </main>

                <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-10">
                    <Link to="/patient/appointments/datetime">
                        <button className="w-full bg-[#0c4d6b] text-white py-3.5 rounded-full font-bold text-lg shadow-lg hover:bg-[#093b52] transition-colors">
                            Book Appointment
                        </button>
                    </Link>
                </footer>
            </div>
            );
};

            export default HospitalDetailsPage;