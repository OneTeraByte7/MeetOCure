import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaUser, FaCalendarAlt, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { allDoctorsData } from './doctorspages/DoctorsData';
import { allHospitalsData } from './hospitalpages/HospitalsData';
import PatientTopIcons from '../../components/PatientTopIcons';

const DetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the data based on type and id
  const data = type === 'doctor'
    ? allDoctorsData.find(item => item.id === id)
    : allHospitalsData.find(item => item.id === id);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Found</h2>
          <p className="text-gray-600 mb-6">The requested {type} could not be found.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-cyan-800 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Sample review data
  const sampleReview = {
    name: "Emily Anderson",
    rating: 5.0,
    text: `${data.name} is a true professional who genuinely cares about his patients. I highly recommend ${data.name.split(' ')[1]} to anyone seeking exceptional care.`,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-5 shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between gap-2">
            <div className="flex items-row">
            <button
              onClick={() => navigate(-1)}
              className="flex gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
            </button>
            <h1 className=" flex text-xl font-semibold text-gray-800 mr-90 ml-6 -mt-1.5">
              {type === 'doctor' ? 'Doctor Details' : 'Hospital Details'}
            </h1>
            </div>
            <div className="w-28">
            <PatientTopIcons />
            </div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Doctor's Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            {/* Doctor Image */}
            <div className="relative">
              <img
                src={data.imageUrl}
                alt={data.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 mb-1">{data.name}</h1>
                  <p className="text-gray-600 mb-2">{data.specialty || data.type}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{data.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                >
                  <FaHeart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaUser className="w-6 h-6 text-cyan-800" />
              </div>
              <div className="text-lg font-bold text-gray-800">{data.patients}+</div>
              <div className="text-xs text-gray-500">patients</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaCalendarAlt className="w-6 h-6 text-cyan-800" />
              </div>
              <div className="text-lg font-bold text-gray-800">{data.experience}</div>
              <div className="text-xs text-gray-500">experience</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaStar className="w-6 h-6 text-cyan-800" />
              </div>
              <div className="text-lg font-bold text-gray-800">{data.rating}</div>
              <div className="text-xs text-gray-500">rating</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-cyan-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-800">{data.reviews}</div>
              <div className="text-xs text-gray-500">reviews</div>
            </div>
          </div>
        </div>

        {/* About me Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">About me</h2>
          <p className="text-gray-600 leading-relaxed">
            {data.about}
          </p>
        </div>

        {/* Working Time Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Working Time</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="w-4 h-4" />
            <span>{data.workingHours}</span>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Reviews</h2>
            <button className="text-cyan-800 text-sm font-medium">See All</button>
          </div>

          {/* Sample Review */}
          <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <img
                src={sampleReview.avatar}
                alt={sampleReview.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{sampleReview.name}</span>
                  <span className="text-sm text-gray-500">{sampleReview.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(sampleReview.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {sampleReview.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaPhone className="text-cyan-800 w-4 h-4" />
              <span className="text-gray-600">{data.contact}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-cyan-800 w-4 h-4" />
              <span className="text-gray-600">{data.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-cyan-800 w-4 h-4" />
              <span className="text-gray-600">{data.distanceText}</span>
            </div>
          </div>
        </div>

        {/* Services/Specialties */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            {type === 'doctor' ? 'Specialties' : 'Services'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {type === 'hospital' && data.category && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {data.category}
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {data.specialty || data.type}
            </span>
            {type === 'doctor' && data.type !== data.specialty && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {data.type}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar - Consultation/Booking */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-700 text-white p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-300">Consultation Fee</div>
            <div className="text-xl font-bold">₹ 250</div>
          </div>

          <div className="flex items-center gap-2 mx-4">
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          </div>

          <button
            onClick={() => navigate('/patient/appointments/datetime')}
            className="bg-cyan-800 text-white px-12 py-4 rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center gap-3 text-lg"
          >
            <FaCalendarAlt className="w-5 h-5" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage; 