import React, { useRef, useEffect } from 'react';
import { Download } from 'lucide-react';

const StoryGenerator = ({ userName, ticketType }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(0, 0, 1080, 1920);
        // Border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 40;
        ctx.strokeRect(40, 40, 1000, 1840);
        // Titles
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 70px Arial'; ctx.textAlign = 'center';
        ctx.fillText('90s PARTY - ED. LUXE', 540, 300);
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('JE SERAI PRÉSENT(E)', 540, 450);
        // User Name
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'italic bold 130px Impact';
        ctx.fillText(userName.toUpperCase(), 540, 960);
        // Footer
        ctx.font = '40px Arial';
        ctx.fillText(`ID TICKET: #${Math.floor(Math.random() * 1000)}`, 540, 1600);
    }, [userName]);

    return (
        <div className="flex flex-col items-center mt-6">
            <canvas ref={canvasRef} width="1080" height="1920" className="hidden" />
            <div className="w-64 h-[450px] bg-gray-900 border-2 border-[#D4AF37] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center text-xs text-gray-600 italic">
                Aperçu de ta Story...
            </div>
            <button
                onClick={() => {
                    const link = document.createElement('a');
                    link.download = 'story-90s.png';
                    link.href = canvasRef.current.toDataURL();
                    link.click();
                }}
                className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-sm"
            >
                <Download size={18} /> Télécharger ma Story
            </button>
        </div>
    );
};

export default StoryGenerator;