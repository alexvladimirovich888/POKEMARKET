import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Trading from './pages/Trading';
import { UserState } from './types';
import { getStoredUser, connectWalletMock, disconnectWalletMock } from './services/mockSolana';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    isConnected: false,
    address: null,
    balance: 0,
    inventoryIds: [],
  });
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Load persisted user session simulation
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const updatedUser = await connectWalletMock();
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to connect", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    try {
        const updatedUser = await disconnectWalletMock();
        setUser(updatedUser);
    } finally {
        setIsConnecting(false);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-slate-100 bg-[#0f172a]">
        <Navbar 
          user={user} 
          onConnect={handleConnect} 
          onDisconnect={handleDisconnect}
          isConnecting={isConnecting}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/asset/:id" element={<Details user={user} onConnect={handleConnect} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                     <img 
                        src="https://i.postimg.cc/VvjzRGgx/ADS-2025-12-02T195453-414.png" 
                        alt="PokeMarket Logo" 
                        className="w-8 h-8 object-contain opacity-80"
                      />
                     <span className="font-retro text-lg text-white">PokeMarket</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    A simulated NFT marketplace project. Not affiliated with Pokémon (Nintendo/Creatures Inc./GAME FREAK) or Solana Labs. For educational and demonstration purposes only.
                </p>
                <div className="flex justify-center gap-6 text-slate-400 text-sm">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                    <a href="#" className="hover:text-white">Help Center</a>
                </div>
                <p className="text-slate-600 text-xs mt-8">
                    &copy; 2023 PokeMarket Demo. All rights reserved.
                </p>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;