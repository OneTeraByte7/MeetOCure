import React, { useState } from 'react';

const Card = ({ image, name, specialty, location, rating }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevent card click when clicking favorite
        setIsFavorite(!isFavorite);
    };

    // Helper to generate star ratings
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={image} alt={name} />
                <button
                    onClick={toggleFavorite}
                    className="absolute top-3 right-3 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-red-500 transition-colors hover:bg-white"
                >
                    {isFavorite ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                <p className="text-gray-600 text-sm mb-1">{specialty}</p>
                <p className="text-gray-500 text-sm mb-3">{location}</p>
                <div className="flex items-center gap-1">
                    {renderStars()}
                    <span className="text-sm text-gray-600 ml-1">({rating})</span>
                </div>
            </div>
        </div>
    );
};

export default Card;