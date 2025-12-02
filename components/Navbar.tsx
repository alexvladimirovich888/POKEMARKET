import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, Coins, Ghost, Shield } from 'lucide-react';
import { UserState } from '../types';

interface NavbarProps {
  user: UserState;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, onConnect, onDisconnect, isConnecting }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Marketplace', path: '/' },
    { name: 'Trading', path: '/trading' },
  ];

  const isActive = (path: string) => location.pathname === path ? 'text-[#14F195]' : 'text-slate-300 hover:text-white';

  const handleConnectClick = () => {
    if (user.isConnected) {
      onDisconnect();
    } else {
      setIsWalletModalOpen(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://i.postimg.cc/VvjzRGgx/ADS-2025-12-02T195453-414.png" 
                alt="PokeMarket Logo" 
                className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(153,69,255,0.5)]"
              />
              <span className="font-retro text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                PokeMarket
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path)}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user.isConnected && (
                   <Link to="/profile" className={`text-sm font-medium transition-colors duration-200 ${isActive('/profile')}`}>
                      My Assets
                   </Link>
              )}
            </div>

            {/* Wallet Button */}
            <div className="hidden md:flex items-center gap-4">
               {user.isConnected && (
                   <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                       <Coins className="w-4 h-4 text-[#14F195]" />
                       <span className="text-sm font-mono text-[#14F195]">{user.balance.toFixed(2)} SOL</span>
                   </div>
               )}
              
              <button
                onClick={handleConnectClick}
                disabled={isConnecting}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300
                  ${user.isConnected 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                    : 'bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-slate-900 shadow-[0_0_20px_rgba(20,241,149,0.3)]'}
                `}
              >
                {isConnecting ? (
                  <span className="animate-pulse">Connecting...</span>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    {user.isConnected ? `${user.address?.slice(0, 4)}...${user.address?.slice(-4)}` : 'Connect Wallet'}
                  </>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full pb-4 shadow-2xl">
            <div className="px-4 pt-2 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
               {user.isConnected && (
                   <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                      My Assets
                   </Link>
              )}
               <button
                onClick={() => {
                    handleConnectClick();
                    setIsMenuOpen(false);
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-[#9945FF] to-[#14F195] text-slate-900"
              >
                 <Wallet className="w-4 h-4" />
                 {user.isConnected ? 'Disconnect' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Selection Modal */}
      {isWalletModalOpen && !user.isConnected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-sm overflow-hidden shadow-2xl transform scale-100 transition-all">
              <div className="p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                    <button onClick={() => setIsWalletModalOpen(false)} className="text-slate-400 hover:text-white">
                       <X className="w-5 h-5" />
                    </button>
                 </div>
                 
                 <div className="space-y-3">
                    {/* Phantom Link Button - Does NOT Mock Connect */}
                    <a 
                      href="https://phantom.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsWalletModalOpen(false)}
                      className="w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 group transition-all duration-200"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#551BF9]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Ghost className="w-6 h-6 text-[#AB9FF2]" />
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-white text-lg block">Phantom</span>
                            <span className="text-xs text-slate-400">Connect to continue</span>
                          </div>
                       </div>
                       <ArrowUpRightMini />
                    </a>

                    <button 
                      disabled
                      className="w-full flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800 opacity-60 cursor-not-allowed"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                             <Shield className="w-6 h-6 text-orange-500" />
                          </div>
                          <span className="font-bold text-slate-400 text-lg">Solflare</span>
                       </div>
                    </button>
                 </div>

                 <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                    <p className="text-slate-400 text-sm mb-2">Don't have a wallet?</p>
                    <a 
                      href="https://phantom.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#AB9FF2] hover:text-white font-medium text-sm hover:underline flex items-center justify-center gap-1"
                    >
                       Get Phantom Wallet <ArrowUpRightMini />
                    </a>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

const ArrowUpRightMini = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

export default Navbar;