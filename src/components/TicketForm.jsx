import React, { useState } from 'react';
import { User, Phone, CheckCircle2 } from 'lucide-react';
import PaymentSpinner from './PaymentSpinner';

const TicketForm = ({ selectedTicket, onPurchaseComplete }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulation de l'appel API vers ton Laravel
        setTimeout(() => {
            setLoading(false);
            onPurchaseComplete();
        }, 4000); // On simule 4 secondes pour le Mobile Money
    };

    if (loading) return <PaymentSpinner />;

    return (
        <div className="bg-[#242424] p-8 rounded-[2rem] border border-[#D4AF37]/30 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-white mb-2 italic">RÉSERVER MON PASS</h3>
            <p className="text-gray-400 text-sm mb-6">Tu as choisi : <span className="text-[#D4AF37] font-bold">{selectedTicket.title}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        required
                        type="text"
                        placeholder="Nom complet"
                        className="w-full bg-black/50 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#D4AF37] outline-none transition"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        required
                        type="tel"
                        placeholder="Numéro WhatsApp (6...)"
                        className="w-full bg-black/50 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#D4AF37] outline-none transition"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="p-4 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/20 mb-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total à payer</p>
                    <p className="text-2xl font-black text-[#D4AF37]">{selectedTicket.price} FCFA</p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl hover:scale-105 transition shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                >
                    PAYER VIA MOBILE MONEY
                </button>
            </form>
        </div>
    );
};

export default TicketForm;