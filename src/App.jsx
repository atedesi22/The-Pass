import React, { useState } from 'react';
import Hero from './components/Hero';
import TicketCard from './components/TicketCard';
import TicketForm from './components/TicketForm';
import FinalTicketGenerator from './components/FinalTicketGenerator';
import StoryGenerator from './components/StoryGenerator';
import Dashboard from './pages/Dashboard';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const App = () => {
  // Navigation principale
  const [view, setView] = useState('home'); // 'home' ou 'dashboard'
  const [step, setStep] = useState('selection'); // 'selection', 'checkout', 'success'

  // Données partagées
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userName, setUserName] = useState("");

  const tickets = [
    {
      id: 'classic',
      title: 'PASS CLASSIC',
      price: '5000',
      features: ['Entrée + 1 Boisson offerte', 'Accès concours 90s', 'QR Code immédiat'],
      isPremium: false
    },
    {
      id: 'full',
      title: 'FULL CONSO',
      price: '8000',
      features: ['Entrée + 2 Boissons + Repas', 'Place assise réservée', 'Accès VIP'],
      isPremium: true
    }
  ];

  // Rendu du Dashboard (Staff)
  if (view === 'dashboard') {
    return (
      <div className="bg-[#1A1A1A] min-h-screen text-white">
        <Dashboard />
        <button
          onClick={() => setView('home')}
          className="fixed bottom-6 left-6 bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold shadow-lg z-50"
        >
          QUITTER LE DASHBOARD
        </button>
      </div>
    );
  }

  // Rendu de la Landing Page (Public)
  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-sans">

      {/* HEADER FIXE */}
      <nav className="flex justify-between items-center p-6 border-b border-white/5 bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-40">
        <h2 className="text-xl font-black italic tracking-tighter cursor-pointer" onClick={() => setStep('selection')}>
          VINTAGE <span className="text-[#D4AF37]">90</span>
        </h2>
        <button
          onClick={() => setView('dashboard')}
          className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#D4AF37] transition font-bold"
        >
          Staff Only
        </button>
      </nav>

      <main>
        {/* ÉTAPE 1 : ACCUEIL ET SÉLECTION */}
        {step === 'selection' && (
          <div>
            <Hero />
            <section className="py-20 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black italic mb-2 uppercase">Réserve ton Pass</h2>
                <p className="text-gray-500 text-sm">Édition limitée à 70 personnes</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {tickets.map((t) => (
                  <div key={t.id} onClick={() => { setSelectedTicket(t); setStep('checkout'); }}>
                    <TicketCard {...t} />
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-red-600/30 p-8 rounded-[2rem] bg-red-600/5 flex items-center gap-6">
                <ShieldAlert size={40} className="text-red-600 shrink-0" />
                <p className="text-gray-400 text-sm">
                  <span className="text-white font-bold block uppercase mb-1">Règle de l'Outfit :</span>
                  Tenue 90s obligatoire. Amende de <span className="text-white font-bold">2 000 FCFA</span> si le dress code n'est pas respecté.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ÉTAPE 2 : PAIEMENT (CHECKOUT) */}
        {step === 'checkout' && selectedTicket && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
            <button
              onClick={() => setStep('selection')}
              className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition"
            >
              <ArrowLeft size={18} /> Retour au choix du pass
            </button>
            <TicketForm
              selectedTicket={selectedTicket}
              onPurchaseComplete={(name) => {
                setUserName(name);
                setStep('success');
              }}
            />
          </div>
        )}

        {/* ÉTAPE 3 : SUCCÈS ET TÉLÉCHARGEMENT */}
        {step === 'success' && selectedTicket && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-[#242424] p-8 md:p-12 rounded-[3rem] border border-[#D4AF37]/30 max-w-2xl w-full shadow-2xl">
              <h2 className="text-4xl font-black text-white italic mb-2">PASS CONFIRMÉ !</h2>
              <p className="text-gray-400 mb-8">Télécharge ton ticket officiel ci-dessous.</p>

              <FinalTicketGenerator
                userName={userName || "INVITÉ VIP"}
                ticketType={selectedTicket.title}
                ticketId={`V70-${Math.floor(1000 + Math.random() * 9000)}`}
              />

              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Partage ta présence</p>
                <StoryGenerator userName={userName} ticketType={selectedTicket.title} />
              </div>

              <button
                onClick={() => { setStep('selection'); setSelectedTicket(null); }}
                className="mt-10 text-sm text-gray-600 hover:text-[#D4AF37] underline"
              >
                Prendre une autre place
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 text-center text-gray-700 text-[10px] tracking-[0.4em] uppercase">
        VINTAGE 90 • Douala 2026 • NovaVerse Ecosystem
      </footer>
    </div>
  );
};

export default App;