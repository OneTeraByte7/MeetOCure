import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorsData, hospitalsData } from './Data';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaRegCommentDots } from 'react-icons/fa';
import { BsAwardFill, BsStarFill } from 'react-icons/bs';
import { ChevronLeft, MessageCircle, Wallet, Bell } from 'lucide-react';
import PatientTopIcons from '../../components/PatientTopIcons';


// Import the hospitals data from Cards-data with correct field names
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
        about: 'Sunrise Health Hospital is a state-of-the-art medical facility providing comprehensive healthcare services. We are committed to excellence in patient care and medical innovation.',
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
        about: 'Healing Touch Clinic provides personalized healthcare services in a comfortable, welcoming environment. We focus on preventive care and wellness.',
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
    },
    {
        id: 5,
        name: 'City Central Pharmacy',
        specialty: 'Pharmacy',
        location: 'Guntur',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1576683567222-ac74d4411182?q=80&w=600&auto=format&fit=crop',
        patients: '3,000+',
        experience: '5+',
        reviews: 120,
        contact: '+91 9876543214',
        about: 'City Central Pharmacy provides quality medications and healthcare products with professional service.',
        distance: '0.8 km away'
    },
    {
        id: 6,
        name: 'Manipal Hospital',
        specialty: 'Hospital',
        location: 'Vijayawada',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=600&auto=format&fit=crop',
        patients: '3,500+',
        experience: '25+',
        reviews: 450,
        contact: '+91 9876543215',
        about: 'Manipal Hospital is a leading healthcare institution providing world-class medical services.',
        distance: '7.2 km away'
    },
    {
        id: 7,
        name: 'Kamineni Hospitals',
        specialty: 'Hospital',
        location: 'Guntur',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1629904853716-f0bc64219b1b?q=80&w=600&auto=format&fit=crop',
        patients: '2,800+',
        experience: '22+',
        reviews: 320,
        contact: '+91 9876543216',
        about: 'Kamineni Hospitals provides comprehensive healthcare with advanced medical technology.',
        distance: '4.0 km away'
    },
    {
        id: 8,
        name: 'Aayush Hospitals',
        specialty: 'Hospital',
        location: 'Tenali',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600&auto=format&fit=crop',
        patients: '2,500+',
        experience: '18+',
        reviews: 280,
        contact: '+91 9876543217',
        about: 'Aayush Hospitals is committed to providing quality healthcare services to the community.',
        distance: '8.1 km away'
    },
    {
        id: 9,
        name: 'Apollo Pharmacy',
        specialty: 'Pharmacy',
        location: 'Vijayawada',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1584515933487-779824d27929?q=80&w=600&auto=format&fit=crop',
        patients: '4,000+',
        experience: '10+',
        reviews: 180,
        contact: '+91 9876543218',
        about: 'Apollo Pharmacy offers a wide range of pharmaceutical products and healthcare services.',
        distance: '1.5 km away'
    },
    {
        id: 10,
        name: 'Family Care Clinic',
        specialty: 'Clinic',
        location: 'Guntur',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1579684385127-6ab18a5d7814?q=80&w=600&auto=format&fit=crop',
        patients: '1,600+',
        experience: '9+',
        reviews: 190,
        contact: '+91 9876543219',
        about: 'Family Care Clinic provides comprehensive family healthcare with a patient-centered approach.',
        distance: '2.8 km away'
    },
    {
        id: 11,
        name: 'Patanjali Ayurvedic Center',
        specialty: 'Ayurvedic',
        location: 'Tenali',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1584362352829-b6131b782b13?q=80&w=600&auto=format&fit=crop',
        patients: '2,000+',
        experience: '14+',
        reviews: 250,
        contact: '+91 9876543220',
        about: 'Patanjali Ayurvedic Center offers traditional Ayurvedic treatments and natural healing.',
        distance: '6.3 km away'
    },
    {
        id: 12,
        name: 'Dental World',
        specialty: 'Dental',
        location: 'Vijayawada',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1594495893623-2321ea3a35d7?q=80&w=600&auto=format&fit=crop',
        patients: '1,200+',
        experience: '11+',
        reviews: 150,
        contact: '+91 9876543221',
        about: 'Dental World provides modern dental care with state-of-the-art equipment and experienced dentists.',
        distance: '3.9 km away'
    },
    {
        id: 13,
        name: 'Metro General',
        specialty: 'Hospital',
        location: 'Guntur',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
        patients: '4,000+',
        experience: '30+',
        reviews: 500,
        contact: '+91 9876543222',
        about: 'Metro General Hospital is a comprehensive healthcare facility serving the community with excellence.',
        distance: '9.5 km away'
    },
    {
        id: 14,
        name: 'Wellness Meds',
        specialty: 'Pharmacy',
        location: 'Tenali',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1622325994800-482436e32d2d?q=80&w=600&auto=format&fit=crop',
        patients: '2,500+',
        experience: '6+',
        reviews: 110,
        contact: '+91 9876543223',
        about: 'Wellness Meds provides quality pharmaceutical products and healthcare consultation.',
        distance: '2.1 km away'
    },
    {
        id: 15,
        name: 'Community Clinic',
        specialty: 'Clinic',
        location: 'Vijayawada',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop',
        patients: '1,400+',
        experience: '5+',
        reviews: 130,
        contact: '+91 9876543224',
        about: 'Community Clinic serves the local community with accessible and affordable healthcare services.',
        distance: '4.5 km away'
    }
];

// Import the doctors data from Cards-data with correct field names
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
        about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in interventional cardiology and has performed over 300 successful procedures.',
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
        about: 'Dr. Michael Chen is a renowned dermatologist specializing in cosmetic dermatology and skin cancer treatment. He has helped thousands of patients achieve healthy, beautiful skin.',
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
        about: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She believes in building lasting relationships with families.',
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
        about: 'Dr. David Kim is a leading neurologist specializing in stroke treatment and neurological disorders. His research has contributed to several breakthrough treatments.',
        distance: '4.2 km away'
    },
    {
        id: 105,
        name: 'Dr. Lisa Thompson',
        specialty: 'Orthopedic',
        location: 'Guntur',
        rating: 4.6,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,100+',
        experience: '14+',
        reviews: 112,
        contact: '+91 9876543005',
        about: 'Dr. Lisa Thompson is an orthopedic specialist with expertise in joint replacement and sports medicine. She has helped numerous athletes return to their peak performance.',
        distance: '2.7 km away'
    },
    {
        id: 106,
        name: 'Dr. James Wilson',
        specialty: 'Psychiatrist',
        location: 'Tenali',
        rating: 4.8,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '600+',
        experience: '16+',
        reviews: 145,
        contact: '+91 9876543006',
        about: 'Dr. James Wilson is a psychiatrist focused on providing mental health care with compassion and understanding. He specializes in anxiety, depression, and mood disorders.',
        distance: '3.8 km away'
    },
    {
        id: 107,
        name: 'Dr. Maria Garcia',
        specialty: 'Gynecologist',
        location: 'Vijayawada',
        rating: 4.9,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,800+',
        experience: '20+',
        reviews: 203,
        contact: '+91 9876543007',
        about: 'Dr. Maria Garcia is a senior gynecologist with extensive experience in women\'s health. She provides comprehensive care for women at all stages of life.',
        distance: '1.5 km away'
    },
    {
        id: 108,
        name: 'Dr. Robert Brown',
        specialty: 'Urologist',
        location: 'Guntur',
        rating: 4.7,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '700+',
        experience: '11+',
        reviews: 89,
        contact: '+91 9876543008',
        about: 'Dr. Robert Brown is a urologist specializing in the treatment of urinary tract and male reproductive system disorders.',
        distance: '2.9 km away'
    },
    {
        id: 109,
        name: 'Dr. Jennifer Lee',
        specialty: 'Endocrinologist',
        location: 'Tenali',
        rating: 4.8,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '950+',
        experience: '13+',
        reviews: 167,
        contact: '+91 9876543009',
        about: 'Dr. Jennifer Lee is an endocrinologist specializing in diabetes management and hormonal disorders. She helps patients achieve optimal metabolic health.',
        distance: '3.5 km away'
    },
    {
        id: 110,
        name: 'Dr. Thomas Anderson',
        specialty: 'Oncologist',
        location: 'Vijayawada',
        rating: 4.9,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '500+',
        experience: '22+',
        reviews: 234,
        contact: '+91 9876543010',
        about: 'Dr. Thomas Anderson is an oncologist committed to providing compassionate care to cancer patients. He specializes in breast and lung cancer treatment.',
        distance: '4.8 km away'
    },
    {
        id: 111,
        name: 'Dr. Amanda White',
        specialty: 'Dentist',
        location: 'Guntur',
        rating: 4.6,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '2,100+',
        experience: '9+',
        reviews: 178,
        contact: '+91 9876543011',
        about: 'Dr. Amanda White provides comprehensive dental care with modern technology and a gentle approach. She specializes in cosmetic dentistry and preventive care.',
        distance: '1.2 km away'
    },
    {
        id: 112,
        name: 'Dr. Christopher Martinez',
        specialty: 'Ophthalmologist',
        location: 'Tenali',
        rating: 4.7,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,300+',
        experience: '17+',
        reviews: 123,
        contact: '+91 9876543012',
        about: 'Dr. Christopher Martinez is an ophthalmologist specializing in cataract surgery and retinal disorders. He uses the latest technology for precise eye care.',
        distance: '2.1 km away'
    },
    {
        id: 113,
        name: 'Dr. Rachel Green',
        specialty: 'ENT Specialist',
        location: 'Vijayawada',
        rating: 4.8,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '850+',
        experience: '12+',
        reviews: 156,
        contact: '+91 9876543013',
        about: 'Dr. Rachel Green is an ENT specialist providing comprehensive care for ear, nose, and throat conditions. She has expertise in both medical and surgical treatments.',
        distance: '3.3 km away'
    },
    {
        id: 114,
        name: 'Dr. Kevin Taylor',
        specialty: 'Pulmonologist',
        location: 'Guntur',
        rating: 4.9,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,100+',
        experience: '19+',
        reviews: 198,
        contact: '+91 9876543014',
        about: 'Dr. Kevin Taylor is a pulmonologist specializing in respiratory disorders and sleep medicine. He provides comprehensive care for lung health.',
        distance: '2.8 km away'
    },
    {
        id: 115,
        name: 'Dr. Nicole Davis',
        specialty: 'Rheumatologist',
        location: 'Tenali',
        rating: 4.7,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '600+',
        experience: '15+',
        reviews: 87,
        contact: '+91 9876543015',
        about: 'Dr. Nicole Davis is a rheumatologist specializing in autoimmune diseases and joint disorders. She helps patients manage chronic conditions effectively.',
        distance: '4.1 km away'
    },
    {
        id: 116,
        name: 'Dr. Daniel Clark',
        specialty: 'Gastroenterologist',
        location: 'Vijayawada',
        rating: 4.8,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,400+',
        experience: '16+',
        reviews: 167,
        contact: '+91 9876543016',
        about: 'Dr. Daniel Clark is a gastroenterologist specializing in digestive disorders and liver diseases. He provides comprehensive gastrointestinal care.',
        distance: '1.9 km away'
    },
    {
        id: 117,
        name: 'Dr. Stephanie Moore',
        specialty: 'Hematologist',
        location: 'Guntur',
        rating: 4.9,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '750+',
        experience: '18+',
        reviews: 145,
        contact: '+91 9876543017',
        about: 'Dr. Stephanie Moore is a hematologist specializing in blood disorders and cancers. She provides expert care for complex hematological conditions.',
        distance: '3.7 km away'
    },
    {
        id: 118,
        name: 'Dr. Matthew Hall',
        specialty: 'Nephrologist',
        location: 'Tenali',
        rating: 4.6,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '800+',
        experience: '14+',
        reviews: 112,
        contact: '+91 9876543018',
        about: 'Dr. Matthew Hall is a nephrologist specializing in kidney diseases and hypertension. He provides comprehensive renal care.',
        distance: '2.4 km away'
    },
    {
        id: 119,
        name: 'Dr. Jessica Turner',
        specialty: 'Dermatologist',
        location: 'Vijayawada',
        rating: 4.7,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,600+',
        experience: '11+',
        reviews: 189,
        contact: '+91 9876543019',
        about: 'Dr. Jessica Turner is a dermatologist specializing in medical and cosmetic dermatology. She helps patients achieve healthy, beautiful skin.',
        distance: '1.7 km away'
    },
    {
        id: 120,
        name: 'Dr. Ryan Phillips',
        specialty: 'Cardiologist',
        location: 'Guntur',
        rating: 4.8,
        image: 'https://www.shutterstock.com/image-photo/portrait-handsome-male-doctor-stethoscope-600nw-2480850611.jpg',
        patients: '1,300+',
        experience: '20+',
        reviews: 223,
        contact: '+91 9876543020',
        about: 'Dr. Ryan Phillips is a cardiologist with expertise in preventive cardiology and heart disease management. He emphasizes lifestyle modifications alongside medical treatment.',
        distance: '3.9 km away'
    }
];

// Combine all data sources for easier lookup
const allData = [...doctorsData, ...hospitalsData, ...allHospitalsData, ...allDoctorsData];

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
            <header className="p-6 flex justify-between bg-gray-50 shadow-sm">
                <button onClick={() => navigate(-1)} className="text-2xl text-gray-700">
                    <ChevronLeft className="fas fa-arrow-left"/>
                </button>
                <h1 className="text-xl flex-col justify-items-start font-bold text-gray-800">
                    <h1>{item.specialty.includes('Clinic') || item.specialty.includes('Hospital') || item.specialty.includes('Pharmacy') || item.specialty.includes('Dental') || item.specialty.includes('Ayurvedic') ? 'Hospital Details' : 'Doctor Details'}</h1>
                </h1>
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
                        <p className="text-gray-700">Hospital Contact Details: {item.contact}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">About {item.specialty.includes('Clinic') || item.specialty.includes('Hospital') || item.specialty.includes('Pharmacy') || item.specialty.includes('Dental') || item.specialty.includes('Ayurvedic') ? 'Hospital' : 'Doctor'}</h3>
                        <p className="text-gray-700 leading-relaxed">{item.about}</p>
                    </div>
                </div>
            </main>

            {/* Fixed Footer Button */}
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <button className="w-full max-w-md mx-auto block bg-[#0c4d6b] text-white text-lg font-bold py-3 rounded-full hover:bg-[#0c4d6b] transition-colors">
                    <Link to="/patient/appointments/datetime">
                        Book Appointment
                    </Link>
                </button>
            </footer>
        </div>
    );
};

export default DetailPage;