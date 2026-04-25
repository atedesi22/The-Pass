import React, { useRef, useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { Download, Share2 } from 'lucide-react';

const FinalTicketGenerator = ({ userName, ticketType, ticketId }) => {
    const canvasRef = useRef(null);
    const [ticketImageUrl, setTicketImageUrl] = useState(null);

    // URL DE L'IMAGE DE FOND (À CHANGER ICI PLUS TARD)
    const backgroundUrl = "https://images.unsplash.com/photo-1599313936611-6c2e39b94098?q=80&w=600&auto=format&fit=crop";

    useEffect(() => {
        const generateTicket = async () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // 1. Charger l'image de fond
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Crucial pour éviter les erreurs CORS
            img.src = backgroundUrl;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Dessiner le fond (on l'adapte à la taille du canvas)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 2. Ajouter un overlay sombre pour la lisibilité
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 3. Bordure Dorée Premium
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 20;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

            // 4. Textes - En-tête
            ctx.fillStyle = '#D4AF37';
            ctx.font = 'bold 40px Helvetica';
            ctx.textAlign = 'center';
            ctx.fillText('VINTAGE 70 - OFFICIAL PASS', canvas.width / 2, 90);

            // 5. Nom de l'acheteur (Récupéré dynamiquement)
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '900 80px Impact'; // Une typo qui claque
            ctx.fillText(userName.toUpperCase(), canvas.width / 2, 250);

            // 6. Type de Ticket
            ctx.fillStyle = '#D4AF37';
            ctx.font = 'italic 50px Helvetica';
            ctx.fillText(ticketType, canvas.width / 2, 330);

            // 7. Générer et dessiner le QR Code (Simulation d'URL de validation)
            const qrValue = `https://vintage70.cm/validate/${ticketId}`;
            const qrCodeDataUrl = await QRCode.toDataURL(qrValue, {
                margin: 1,
                color: {
                    dark: '#000000',  // QR Code Noir
                    light: '#FFFFFF' // Fond Blanc (Obligatoire pour un scan facile)
                }
            });

            const qrImg = new Image();
            qrImg.src = qrCodeDataUrl;
            await new Promise((resolve) => {
                qrImg.onload = resolve;
            });

            // Dessiner le QR Code centré en bas
            const qrSize = 300;
            ctx.drawImage(qrImg, (canvas.width - qrSize) / 2, 450, qrSize, qrSize);

            // 8. ID du Ticket
            ctx.fillStyle = '#666666';
            ctx.font = '20px Monospace';
            ctx.fillText(`ID: ${ticketId}`, canvas.width / 2, 820);

            // Convertir le canvas en URL d'image pour l'affichage/téléchargement
            setTicketImageUrl(canvas.toDataURL('image/png'));
        };

        generateTicket();
    }, [userName, ticketType, ticketId]);

    const downloadTicket = () => {
        const link = document.createElement('a');
        link.download = `ticket-vintage70-${userName}.png`;
        link.href = ticketImageUrl;
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-10">
            {/* Canvas caché (sert juste à la génération) */}
            <canvas ref={canvasRef} width="600" height="900" className="hidden" />

            {/* Affichage du ticket finalisé */}
            {ticketImageUrl ? (
                <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    src={ticketImageUrl}
                    alt="Ton Ticket Vintage 70"
                    className="w-full max-w-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-800"
                />
            ) : (
                <div className="text-gray-500 animate-pulse text-sm">Génération de ton pass premium...</div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={downloadTicket}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition"
                >
                    <Download size={18} /> TÉLÉCHARGER MON PASS
                </button>
            </div>
        </div>
    );
};

export default FinalTicketGenerator;