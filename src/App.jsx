import React, { useState } from 'react';
import Hero from './components/Hero';
import TicketCard from './components/TicketCard';
import TicketForm from './components/TicketForm';
import StoryGenerator from './components/StoryGenerator';
import Dashboard from './pages/Dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const App = () => {
  // Gestion de la navigation : 'home', 'dashboard'
  const [view, setView] = useState('home');

  // Gestion du tunnel d'achat : 'selection', 'checkout', 'success'
  const [step, setStep] = useState('selection');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userName, setUserName] = useState("");

  // Données des tickets (basées sur tes instructions)
  const tickets = [
    {
      id: 'classic',
      title: 'PASS CLASSIC',
      price: '5000',
      features: ['Entrée + 1 Boisson offerte', 'Accès aux concours (Twerk, Blind Test)', 'QR Code immédiat'],
      isPremium: false
    },
    {
      id: 'full',
      title: 'FULL CONSO',
      price: '8000',
      features: ['Entrée + 2 Boissons + Repas', 'Place assise réservée', 'Accès Cash Prize VIP'],
      isPremium: true
    }
  ];

  // Si on est sur le Dashboard (Vue Organisateur)
  if (view === 'dashboard') {
    return (
      <>
        <div className="bg-[#1A1A1A] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">

          <Dashboard />
          <button
            onClick={() => setView('home')}
            className="fixed bottom-4 left-4 z-50 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/20"
          >
            RETOURNER AU SITE
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">

      {/* HEADER / NAV MINIMALISTE */}
      <nav className="flex justify-between items-center p-6 absolute top-0 w-full z-50">
        <h2 className="text-xl font-black italic tracking-tighter">
          VINTAGE <span className="text-[#D4AF37]">90</span>
        </h2>
        <button
          onClick={() => setView('dashboard')}
          className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#D4AF37] transition"
        >
          Accès Staff
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {step === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <Hero />

            {/* SECTION BILLETS */}
            <section id="tickets" className="py-20 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black italic mb-4 uppercase">Prends ta place</h2>
                <div className="h-1 w-20 bg-[#D4AF37] mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {tickets.map((t) => (
                  <div key={t.id} onClick={() => { setSelectedTicket(t); setStep('checkout'); }}>
                    <TicketCard {...t} />
                  </div>
                ))}
              </div>

              {/* RAPPEL OUTFIT */}
              <div className="mt-20 border-2 border-dashed border-red-600/30 p-8 rounded-[2rem] bg-red-600/5 flex flex-col md:flex-row items-center gap-6">
                <ShieldAlert size={48} className="text-red-600 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white uppercase italic">Alerte Dress Code</h4>
                  <p className="text-gray-400 text-sm">
                    Le thème des années 90 est obligatoire. En cas de non-respect, une amende de <span className="text-white font-bold">2 000 FCFA</span> sera perçue à l'entrée. Tout le monde doit jouer le jeu !
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {step === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setStep('selection')}
              className="mb-8 flex items-center gap-2 text-gray-500 hover:text-white transition"
            >
              <ArrowLeft size={18} /> Retour aux billets
            </button>
            <TicketForm
              selectedTicket={selectedTicket}
              onPurchaseComplete={(name) => { setUserName(name); setStep('success'); }}
            />
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="bg-[#242424] p-10 rounded-[3rem] border border-green-500/30 max-w-2xl w-full">
              <h2 className="text-5xl font-black text-white italic mb-4 uppercase">Félicitations !</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Ton pass <span className="text-[#D4AF37] font-bold">{selectedTicket?.title}</span> est réservé.
                Télécharge ta story et partage-la sur WhatsApp pour valider ton entrée !
              </p>

              <StoryGenerator userName={userName || "INVITÉ VIP"} ticketType={selectedTicket?.title} />

              <button
                onClick={() => setStep('selection')}
                className="mt-12 text-sm text-gray-600 underline hover:text-[#D4AF37]"
              >
                Prendre un autre billet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-[10px] tracking-[0.3em] uppercase">
        © 2026 Vintage 70 — Powered by NovaVerse
      </footer>
    </div>
  );
};

export default App;