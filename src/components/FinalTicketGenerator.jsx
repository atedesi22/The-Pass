import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode'; // Pour GÉNÉRER le QR Code
import { Download, Share2, Loader2 } from 'lucide-react';

const FinalTicketGenerator = ({ userName, ticketType, ticketId }) => {
    const canvasRef = useRef(null);
    const [ticketImageUrl, setTicketImageUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(true);

    // Image de fond stylée (Néons/Retro)
    const backgroundUrl = "flyer.JPG";

    useEffect(() => {
        const generateTicket = async () => {
            try {
                setIsGenerating(true);
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');

                // 1. Charger l'image de fond
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = backgroundUrl;

                img.onload = async () => {
                    // Dessiner le fond
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // 2. Overlay sombre pour le contraste
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // 3. Bordure Dorée
                    ctx.strokeStyle = '#D4AF37';
                    ctx.lineWidth = 20;
                    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

                    // 4. Textes
                    ctx.textAlign = 'center';

                    // En-tête
                    ctx.fillStyle = '#D4AF37';
                    ctx.font = 'bold 30px Arial';
                    ctx.fillText('VINTAGE 90 • OFFICIAL PASS', canvas.width / 2, 80);

                    // Nom de l'acheteur
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 70px Impact';
                    const name = (userName || "INVITÉ VIP").toUpperCase();
                    ctx.fillText(name, canvas.width / 2, 220);

                    // Type de ticket
                    ctx.fillStyle = '#D4AF37';
                    ctx.font = 'italic 40px Arial';
                    ctx.fillText(ticketType || "PASS ÉVÉNEMENT", canvas.width / 2, 300);

                    // 5. Génération du QR Code
                    // On génère une URL de données pour le QR Code
                    const qrDataUrl = await QRCode.toDataURL(ticketId || "V70-VALID", {
                        margin: 1,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF'
                        }
                    });

                    const qrImg = new Image();
                    qrImg.src = qrDataUrl;
                    qrImg.onload = () => {
                        // Dessiner le QR Code sur le ticket
                        const qrSize = 280;
                        ctx.drawImage(qrImg, (canvas.width - qrSize) / 2, 420, qrSize, qrSize);

                        // ID du ticket en bas
                        ctx.fillStyle = '#555555';
                        ctx.font = '18px Monospace';
                        ctx.fillText(`TICKET ID: ${ticketId}`, canvas.width / 2, 850);

                        // --- CORRECTION ICI ---
                        // On récupère l'image du CANVAS, pas de la librairie de scan
                        setTicketImageUrl(canvas.toDataURL('image/png'));
                        setIsGenerating(false);
                    };
                };
            } catch (err) {
                console.error("Erreur lors de la génération du ticket:", err);
                setIsGenerating(false);
            }
        };

        generateTicket();
    }, [userName, ticketType, ticketId]);

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Canvas masqué servant uniquement à la génération */}
            <canvas ref={canvasRef} width="600" height="900" className="hidden" />

            {isGenerating ? (
                <div className="flex flex-col items-center py-12">
                    <Loader2 className="animate-spin text-[#D4AF37] mb-4" size={40} />
                    <p className="text-gray-500 italic">Création de ton pass de luxe...</p>
                </div>
            ) : (
                <>
                    {ticketImageUrl && (
                        <img
                            src={ticketImageUrl}
                            alt="Ticket Final"
                            className="w-full max-w-sm rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
                        />
                    )}

                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.download = `V70-Ticket-${userName}.png`;
                            link.href = ticketImageUrl;
                            link.click();
                        }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition shadow-lg"
                    >
                        <Download size={20} /> Télécharger mon pass
                    </button>
                </>
            )}
        </div>
    );
};

export default FinalTicketGenerator;