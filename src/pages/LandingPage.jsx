import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Star, ShieldAlert, Share2, Download } from 'lucide-react';
import StoryGenerator from '../components/StoryGenerator';

const LandingPage = () => {
    const [name, setName] = useState("");
    const [showStory, setShowStory] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [step, setStep] = useState('selection'); // selection, checkout, success

    return (
        <div className="text-white">
            {/* SECTION HERO */}
            <header className="relative h-screen flex items-center justify-center text-center px-6">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="relative z-10">
                    <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[#D4AF37] font-bold tracking-[0.4em] text-sm uppercase"
                    >
                        Samedi 11 Juillet 2026 • Douala
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-7xl md:text-9xl font-black italic mt-4 mb-6 leading-none"
                    >
                        BACK TO <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">90'S</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8 uppercase tracking-widest text-sm">
                        L'édition de luxe limitée à 70 élus.
                    </p>
                    <a href="#tickets" className="bg-[#D4AF37] text-black px-10 py-4 rounded-full font-black hover:scale-110 transition-transform inline-block shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                        RESERVER MAINTENANT
                    </a>
                </div>
            </header>

            {/* SECTION BILLETTERIE */}
            <section id="tickets" className="py-24 bg-[#141414] px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center underline decoration-[#D4AF37]">CHOISIS TON PASS</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* PASS CLASSIC */}
                        <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-gray-800 hover:border-[#D4AF37] transition">
                            <h3 className="text-2xl font-bold mb-2">PASS CLASSIC</h3>
                            <p className="text-[#D4AF37] text-4xl font-black mb-6">5 000 <span className="text-sm">FCFA</span></p>
                            <ul className="space-y-4 mb-8 text-gray-400">
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> Entrée + 1 Boisson offerte</li>
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> Accès aux concours (Twerk, Blind Test)</li>
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> 7 000 FCFA sur place</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-gray-800 font-bold hover:bg-[#D4AF37] hover:text-black transition">ACHETER</button>
                        </div>

                        {/* PASS FULL CONSO */}
                        <div className="bg-[#1F1F1F] p-8 rounded-3xl border-2 border-[#D4AF37] relative overflow-hidden">
                            <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-[10px] px-2 py-1 font-bold rounded">BEST-SELLER</div>
                            <h3 className="text-2xl font-bold mb-2">FULL CONSO</h3>
                            <p className="text-[#D4AF37] text-4xl font-black mb-6">8 000 <span className="text-sm">FCFA</span></p>
                            <ul className="space-y-4 mb-8 text-gray-400">
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> Entrée + 2 Boissons + Nourriture</li>
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> Place assise réservée</li>
                                <li className="flex items-center gap-2"><Star size={16} className="text-[#D4AF37]" /> 10 000 FCFA sur place</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-bold">ACHETER</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION STORY & OUTFIT */}
            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-2xl mx-auto border-2 border-dashed border-red-600 p-8 rounded-3xl mb-12">
                    <ShieldAlert className="mx-auto text-red-600 mb-4" size={48} />
                    <h2 className="text-2xl font-bold text-white mb-2 italic uppercase">Rappel de la règle d'or</h2>
                    <p className="text-gray-400">Le thème est strictement "Années 90". Pas d'outfit = 2 000 FCFA d'amende à l'entrée sans discussion.</p>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">GÉNÈRE TA STORY PERSO</h2>
                    <input
                        type="text"
                        placeholder="Entre ton nom pour la Story..."
                        className="bg-transparent border-b-2 border-[#D4AF37] text-xl text-center py-2 mb-8 focus:outline-none w-full max-w-md"
                        onChange={(e) => { setName(e.target.value); setShowStory(true); }}
                    />
                    {showStory && name.length > 2 && <StoryGenerator userName={name} ticketType="90s LEGEND" />}
                </div>
            </section>

            <div>
                {step === 'selection' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <TicketCard
                            title="PASS CLASSIC"
                            price="5000"
                            onSelect={() => { setSelectedTicket({ title: 'PASS CLASSIC', price: 5000 }); setStep('checkout'); }}
                        />
                        {/* ... Idem pour Full Conso ... */}
                    </div>
                )}

                {step === 'checkout' && (
                    <TicketForm
                        selectedTicket={selectedTicket}
                        onPurchaseComplete={() => setStep('success')}
                    />
                )}

                {step === 'success' && (
                    <div className="text-center p-10 bg-green-500/10 border border-green-500/50 rounded-3xl">
                        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
                        <h2 className="text-3xl font-black text-white mb-4 italic uppercase">C'est validé !</h2>
                        <p className="text-gray-400 mb-8">Ton pass a été envoyé par WhatsApp. Prépare ton outfit !</p>
                        <StoryGenerator userName={name} ticketType={selectedTicket.title} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;