
import React from 'react';
import { FaCoins } from 'react-icons/fa';
// import { User } from '../types';



const BalanceCard= ({ user }) => {
  return (
    <div className="relative bg-[#0a4d67] text-white rounded-2xl shadow-lg p-6  overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 opacity-10">
            <img src="https://meetocure.com/assets/images/logo-transparent.png" alt="Meetocure Logo" className="w-full h-full object-contain" />
        </div>
        <div className="relative z-10">
            <div className="mb-4">
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="text-[#0a4d67]">{user.phone}</p>
            </div>
            <div className="border-t border-[#0a4d67]/50 pt-4">
                <p className="text-sm text-[#0a4d67] uppercase font-semibold">MC-WalleT Balance</p>
                <div className="flex justify-between items-end mt-1">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-amber-900 text-xl">
                            <FaCoins />
                        </div>
                        <span className="text-4xl font-bold">{user.balance.toLocaleString()}</span>
                        <span className="text-xl font-semibold text-[#0a4d67] -mb-0.5">Points</span>
                    </div>
                    {/* <a href="#" className="text-sm font-semibold text-white border-b border-dashed border-white/50 hover:border-white transition-colors">
                        Points history
                    </a> */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default BalanceCard;
