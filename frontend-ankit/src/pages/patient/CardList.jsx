import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const CardList = ({ title, data, type, seeAllLink }) => {
    const initialVisibleCount = 4; // Show 4 cards initially for a better look
    const itemsToShow = data.slice(0, initialVisibleCount);

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1F2A37]">{title}</h2>
                <Link
                    to={type === "doctor" ? "/doctorspages/Cards-data" : "/hospitalpages/Cards-data"}
                    className="text-sm text-[#0A4D68] hover:underline font-medium"
                >
                    See All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {itemsToShow.map((item) => (
                    <Link to={`/details/${item.id}`} key={item.id}>
                        <Card
                            image={item.image}
                            name={item.name}
                            specialty={item.specialty}
                            location={item.location}
                            rating={item.rating}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardList;