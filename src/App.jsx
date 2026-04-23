import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  // Simple toggle pour la démo, à remplacer par un système de routes (react-router)
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="bg-[#1A1A1A] min-h-screen selection:bg-[#D4AF37] selection:text-black">
      {/* Bouton de switch temporaire pour naviguer entre les vues */}
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className="fixed bottom-4 left-4 z-50 text-[10px] text-gray-600 bg-black/50 p-2 rounded"
      >
        {isAdmin ? "Vers Site Public" : "Vers Dashboard Organisateur"}
      </button>

      {isAdmin ? <Dashboard /> : <LandingPage />}
    </div>
  );
}

export default App;