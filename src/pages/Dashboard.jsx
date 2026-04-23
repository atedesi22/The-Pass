import React from 'react';
import { Users, DollarSign, Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Pass Classic', total: 45 },
    { name: 'Full Conso', total: 25 }
];

const Dashboard = () => {
    return (
        <div className="p-8 text-white max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-black italic">VINTAGE <span className="text-[#D4AF37]">70</span></h1>

                {/* BOUTON ACTIVER SCANNER */}
                <button
                    onClick={() => { setIsScanning(true); setScanResult(null); }}
                    className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"
                >
                    <Camera size={20} /> SCANNER UN BILLET
                </button>
            </div>
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