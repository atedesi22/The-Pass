import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera, XCircle, CheckCircle, Utensils } from 'lucide-react';

const data = [
    { name: 'Pass Classic', total: 45 },
    { name: 'Full Conso', total: 25 }

];



const Dashboard = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    // --- CONFIGURATION DU USEEFFECT ICI ---
    useEffect(() => {
        let scanner = null;

        if (isScanning) {
            // On attend que le DOM soit prêt pour l'élément #reader
            setTimeout(() => {
                scanner = new Html5QrcodeScanner("reader", {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    // Optionnel : force la caméra arrière sur mobile
                    videoConstraints: { facingMode: "environment" }
                });

                scanner.render(
                    (decodedText) => {
                        // Action en cas de succès
                        handleScanSuccess(decodedText);
                        scanner.clear(); // Arrête la caméra
                    },
                    (error) => {
                        // On ne met rien ici pour éviter de polluer la console
                    }
                );
            }, 100); // Petit délai pour laisser React afficher la div #reader
        }

        // Nettoyage : s'exécute si on ferme le scanner ou si on quitte la page
        return () => {
            if (scanner) {
                scanner.clear().catch(error => console.error("Erreur arrêt scanner", error));
            }
        };
    }, [isScanning]); // Le scanner se relance dès que isScanning change
    // ---------------------------------------

    const handleScanSuccess = (data) => {
        setIsScanning(false);
        // Simuler une réponse backend pour le test
        setScanResult({ name: "Invité 90s", status: "VALID" });
        console.log("Code détecté :", data);
    };


    return (
        <div className="p-8 text-white max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black italic">VINTAGE <span className="text-[#D4AF37]">90'S PARTY</span></h1>

                {/* BOUTON ACTIVER SCANNER */}
                <button
                    onClick={() => { setIsScanning(true); setScanResult(null); }}
                    className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"
                >
                    <Camera size={20} /> SCANNER UN BILLET
                </button>
            </div>

            {/* OVERLAY DU SCANNER */}
            {isScanning && (
                <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6">
                    <button onClick={() => setIsScanning(false)} className="absolute top-6 right-6 text-gray-400">
                        <XCircle size={32} />
                    </button>
                    <h2 className="text-[#D4AF37] font-bold mb-6 italic">ALIGNER LE QR CODE</h2>
                    <div id="reader" className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-[#D4AF37]"></div>
                </div>
            )}

            {/* RÉSULTAT DU SCAN (MODAL) */}
            {scanResult && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
                    <div className={`w-full max-w-md p-8 rounded-3xl border-2 ${scanResult.status === 'VALID' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <div className="text-center">
                            {scanResult.status === 'VALID' ? (
                                <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                            ) : (
                                <XCircle size={64} className="mx-auto text-red-500 mb-4" />
                            )}

                            <h2 className="text-3xl font-black mb-1">{scanResult.name}</h2>
                            <p className="text-[#D4AF37] font-bold tracking-widest mb-6">{scanResult.type}</p>

                            {scanResult.hasFood && (
                                <div className="flex items-center justify-center gap-2 bg-white/10 p-4 rounded-xl mb-6">
                                    <Utensils size={20} className="text-[#D4AF37]" />
                                    <span className="font-bold">DONNER LE REPAS + 2 CONSO</span>
                                </div>
                            )}

                            <button
                                onClick={() => setScanResult(null)}
                                className="w-full py-4 bg-white text-black font-black rounded-xl"
                            >
                                TICKET SUIVANT
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-black mb-10 flex items-center gap-4">
                STATS <span className="text-[#D4AF37]">90'S PARTY</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#242424] p-6 rounded-3xl border border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <Users className="text-blue-500" />
                        <span className="text-xs text-green-500 font-bold">+12%</span>
                    </div>
                    <p className="text-gray-400 text-sm">Ventes Totales</p>
                    <p className="text-3xl font-black text-white">45 / 70</p>
                </div>
                <div className="bg-[#242424] p-6 rounded-3xl border border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <DollarSign className="text-[#D4AF37]" />
                        <ArrowUpRight className="text-gray-600" size={16} />
                    </div>
                    <p className="text-gray-400 text-sm">Encaissements</p>
                    <p className="text-3xl font-black text-[#D4AF37]">345 000 FCFA</p>
                </div>
                <div className="bg-[#242424] p-6 rounded-3xl border border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <Activity className="text-purple-500" />
                    </div>
                    <p className="text-gray-400 text-sm">Visites Site</p>
                    <p className="text-3xl font-black text-white">1 240</p>
                </div>
            </div>

            <div className="bg-[#242424] p-8 rounded-3xl border border-gray-800">
                <h2 className="text-xl font-bold mb-8 italic uppercase tracking-widest">Répartition des ventes</h2>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }} />
                            <Bar dataKey="total" radius={[10, 10, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 1 ? '#D4AF37' : '#444'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;