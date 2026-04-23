import React from 'react';
import { Check, Info } from 'lucide-react';

const TicketCard = ({ title, price, features, isPremium, soldOut }) => {
    return (
        <div className={`relative p-8 rounded-[2rem] transition-all border-2 ${isPremium
                ? 'bg-gradient-to-b from-[#242424] to-[#1A1A1A] border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.1)] scale-105 z-10'
                : 'bg-[#222] border-gray-800'
            }`}>
            {isPremium && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">
                    Recommandé
                </span>
            )}

            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{title}</h3>
            <div className="flex items-baseline gap-1 mb-6 text-[#D4AF37]">
                <span className="text-4xl font-black italic">{price}</span>
                <span className="text-sm font-bold uppercase tracking-tighter">FCFA</span>
            </div>

            <ul className="space-y-4 mb-10">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="bg-[#D4AF37]/20 p-1 rounded-full">
                            <Check size={12} className="text-[#D4AF37]" />
                        </div>
                        {f}
                    </li>
                ))}
            </ul>

            <button
                disabled={soldOut}
                className={`w-full py-4 rounded-2xl font-black transition ${soldOut
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : isPremium
                            ? 'bg-[#D4AF37] text-black hover:bg-white'
                            : 'bg-white text-black hover:bg-[#D4AF37]'
                    }`}
            >
                {soldOut ? 'SOLD OUT' : 'SÉLECTIONNER'}
            </button>
        </div>
    );
};

export default TicketCard;