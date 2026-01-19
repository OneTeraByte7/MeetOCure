
import React, { useState } from 'react';
import { HeartIcon, HospitalIcon, LocationPinIcon, RouteIcon, StarIcon } from './Icons';


const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex items-center">
            {Array.from({ length: totalStars }, (_, index) => (
                <StarIcon key={index} className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};




const HospitalCard= ({ hospital, onToggleFavorite }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex p-4 space-x-4 h-full">
            <div className="relative w-24 h-24 flex-shrink-0">
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"></div>
                )}
                <img 
                    src={hospital.image || hospital.imageUrl} 
                    alt={hospital.name} 
                    className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    loading="lazy"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start space-x-2">
                    <h3 className="font-bold text-gray-800 text-lg truncate">{hospital.name}</h3>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(hospital.id);
                        }} 
                        className="transition-colors flex-shrink-0"
                        aria-label={hospital.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <HeartIcon className={`w-6 h-6 ${hospital.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} isFilled={hospital.isFavorite} />
                    </button>
                </div>

                <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <RouteIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{hospital.distance.toFixed(1)} km / {hospital.time}min</span>
                         <div className="ml-auto flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs flex-shrink-0">
                            <HospitalIcon className="w-3 h-3 mr-1" />
                            <span>{hospital.specialty || hospital.type}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <LocationPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{hospital.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{hospital.rating.toFixed(1)}</span>
                        <StarRating rating={hospital.rating} />
                        <span className="text-gray-500 truncate">({hospital.reviews} Reviews)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;
