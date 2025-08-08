import React from 'react';
// import { RedemptionOffer } from '../types';
import { BsGiftFill } from 'react-icons/bs';
import { FaStar, FaCoins } from 'react-icons/fa';



const RedemptionCard = ({ offer, onClick }) => {
  const handleRedeemClick = (e) => {
    e.stopPropagation(); // Prevent card's onClick from firing
    alert(`Redeem button for "${offer.description}" clicked!`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden  cursor-pointer transition-transform hover:scale-105 duration-300 flex-shrink-0 w-[260px] sm:w-auto flex flex-col h-full"
      onClick={onClick}
    >
  <div className="bg-[#0a4d67] text-white p-4 flex justify-between gap-10 items-start rounded-t-2xl">
        <div>
          <h3 className="font-bold text-lg">{offer.title}</h3>
        </div>
        <div className="flex gap-2">
           <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white" aria-label="Star Icon">
            <FaStar />
          </div>
          <div className="w-8 h-8 bg-[#0a4d67] rounded-lg flex items-center justify-center text-yellow-300" aria-label="Gift Icon">
            <BsGiftFill />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <div className="bg-amber-100 text-amber-800 font-bold text-sm px-3 py-1 rounded-full inline-flex items-center gap-2">
                <FaCoins className="text-amber-500" />
                <span>{offer.points.toLocaleString()} Points</span>
            </div>
            <p className="text-gray-700 font-semibold text-base mt-3">{offer.description}</p>
        </div>
        <button
          onClick={handleRedeemClick}
          className="w-full bg-[#0a4d67] text-white font-bold py-3 rounded-lg hover:bg-[#0a4d67] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a4d67] mt-4"
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default RedemptionCard;
