import React, { useRef, useEffect, useState } from 'react';
import { Download, ImagePlus, Loader2 } from 'lucide-react';

const StoryGenerator = ({ userName, ticketType }) => {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [userBgImage, setUserBgImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [storyImageUrl, setStoryImageUrl] = useState(null);

    // Génération de la story
    const generateStory = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        setIsProcessing(true);

        // Taille Story standard
        canvas.width = 1080;
        canvas.height = 1920;

        // --- 1. Dessiner le fond ---
        if (userBgImage) {
            // Si l'utilisateur a mis une photo, on la dessine en "Cover"
            const imgRatio = userBgImage.width / userBgImage.height;
            const canvasRatio = canvas.width / canvas.height;
            let dWidth, dHeight, dX, dY;

            if (imgRatio > canvasRatio) {
                dHeight = canvas.height;
                dWidth = canvas.height * imgRatio;
                dX = (canvas.width - dWidth) / 2;
                dY = 0;
            } else {
                dWidth = canvas.width;
                dHeight = canvas.width / imgRatio;
                dX = 0;
                dY = (canvas.height - dHeight) / 2;
            }
            ctx.drawImage(userBgImage, dX, dY, dWidth, dHeight);
        } else {
            // Sinon, fond gris anthracite par défaut
            ctx.fillStyle = '#1A1A1A';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // --- 2. Appliquer le Filtre / Overlay ---
        // Un dégradé sombre en bas pour que les textes blancs restent lisibles
        const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // --- 3. Bordure Dorée Premium (par-dessus tout) ---
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 30;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        // --- 4. Textes ---
        ctx.textAlign = 'center';

        // Titre Événement
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 60px Helvetica';
        ctx.fillText('VINTAGE 90 • ÉDITION LIMITÉE', canvas.width / 2, 250);

        // Phrase Clé
        ctx.fillStyle = 'white';
        ctx.font = '50px Helvetica';
        ctx.fillText('JE CONFIRME MA PRÉSENCE', canvas.width / 2, 400);

        // Nom (Sécurisé)
        ctx.fillStyle = '#D4AF37';
        ctx.font = '900 italic 150px Impact'; // Une typo vintage puissante
        const safeName = (userName || "INVITÉ VIP").toUpperCase();
        ctx.fillText(safeName, canvas.width / 2, canvas.height / 2 + 100);

        // Rappel Outfit
        ctx.fillStyle = 'white';
        ctx.font = 'bold 45px Helvetica';
        ctx.fillText('OUTFIT 90s REQUIS', canvas.width / 2, canvas.height - 200);

        // ID ou type de ticket (discret)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '25px Monospace';
        const safeType = (ticketType || "PASS CONFIRMÉ").toUpperCase();
        ctx.fillText(`STATUS: ${safeType}`, canvas.width / 2, canvas.height - 100);

        // --- 5. Finaliser l'image ---
        setStoryImageUrl(canvas.toDataURL('image/png'));
        setIsProcessing(false);
    };

    // Gestion du chargement de fichier
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setIsProcessing(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUserBgImage(img);
                    // On génère la story dès que l'image est chargée
                    setTimeout(generateStory, 100);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Veuillez sélectionner une image valide (jpg, png).");
        }
    };

    // Générer par défaut quand le nom change (sans image de fond)
    useEffect(() => {
        generateStory();
    }, [userName, ticketType]);

    const downloadStory = () => {
        if (!storyImageUrl) return;
        const link = document.createElement('a');
        link.download = `story-vintage90-${userName || 'invité'}.png`;
        link.href = storyImageUrl;
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-10">
            {/* Canvas masqué pour la génération technique */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Input de fichier caché */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Prévisualisation de la Story */}
            <div className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-[#222]">
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                        <Loader2 className="animate-spin text-[#D4AF37] mb-3" size={30} />
                        <p className="text-gray-400 text-xs italic">Application du filtre Vintage...</p>
                    </div>
                )}
                {storyImageUrl ? (
                    <img src={storyImageUrl} alt="Prévisualisation de ta Story" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                        <ImagePlus className="text-gray-700 mb-4" size={48} />
                        <p className="text-gray-600 text-sm">Génération de la story...</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                {/* BOUTON 1 : AJOUTER SA PHOTO */}
                <button
                    onClick={() => fileInputRef.current.click()}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-3 bg-white/10 text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-white/20 transition disabled:opacity-50"
                >
                    <ImagePlus size={18} />
                    {userBgImage ? "CHANGER MA PHOTO" : "AJOUTER MON OUTFIT"}
                </button>

                {/* BOUTON 2 : TÉLÉCHARGER */}
                {storyImageUrl && (
                    <button
                        onClick={downloadStory}
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center gap-3 bg-[#D4AF37] text-black px-6 py-4 rounded-xl font-black uppercase text-sm hover:scale-105 transition shadow-lg disabled:opacity-50"
                    >
                        <Download size={18} /> TÉLÉCHARGER
                    </button>
                )}
            </div>

            <p className="text-[11px] text-gray-600 max-w-xs text-center mt-2">
                Ajoute une photo de ton outfit, télécharge l'image finale et partage-la en Story WhatsApp !
            </p>
        </div>
    );
};

export default StoryGenerator;