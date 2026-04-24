import React from 'react';
import { motion } from 'framer-motion';

const PaymentSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="relative w-24 h-24 mb-8">
                {/* Cercle extérieur rotatif */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37]/10 border-l-transparent rounded-full"
                />
                {/* Cercle intérieur pulsant */}
                <motion.div
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-4 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center"
                >
                    <span className="text-black font-black text-[10px]">90s</span>
                </motion.div>
            </div>

            <motion.h3
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xl font-bold text-white mb-2 italic"
            >
                TRAITEMENT SÉCURISÉ...
            </motion.h3>
            <p className="text-gray-500 text-sm max-w-[200px]">
                Veuillez valider la transaction sur votre téléphone.
            </p>
        </div>
    );
};

export default PaymentSpinner;