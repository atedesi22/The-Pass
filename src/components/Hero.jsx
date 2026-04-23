import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Calendar } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
            {/* Overlay de texture retro */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] mb-8">
                        <Calendar size={14} />
                        <span className="text-xs font-bold tracking-widest uppercase">11 Juillet 2026</span>
                    </div>

                    <h1 className="text-6xl md:text-[120px] font-black italic leading-none text-white tracking-tighter">
                        VINTAGE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-2xl">
                            SEVENTY
                        </span>
                    </h1>

                    <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                        L'événement exclusif au thème des années 90. <br />
                        <span className="text-white font-semibold">70 places disponibles en ligne.</span> Pas une de plus.
                    </p>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="group relative px-10 py-4 bg-[#D4AF37] text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                            <span className="relative z-10 flex items-center gap-2">
                                <Ticket size={20} /> PRENDRE MON PASS
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;