import React from 'react';
import { UserState } from '../types';
import { MOCK_ASSETS } from '../constants';
import PokemonCard from '../components/PokemonCard';
import { Wallet, Package, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileProps {
  user: UserState;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user.isConnected) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
          <p className="text-slate-400 mb-6">Please connect your Solana wallet to view your inventory and trading history.</p>
        </div>
      </div>
    );
  }

  const myAssets = MOCK_ASSETS.filter(asset => user.inventoryIds.includes(asset.id));

  return (
    <div className="min-h-screen bg-[#0f172a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] p-1">
                 <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="font-retro text-2xl text-white">You</span>
                 </div>
              </div>
              <div>
                 <h1 className="text-2xl font-bold text-white mb-1">Trainer Inventory</h1>
                 <p className="font-mono text-slate-400 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    {user.address}
                 </p>
              </div>
           </div>

           <div className="flex gap-8 bg-slate-900/50 p-6 rounded-xl border border-white/5">
              <div className="text-center">
                 <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Balance</p>
                 <p className="text-2xl font-mono font-bold text-[#14F195]">{user.balance.toFixed(2)} SOL</p>
              </div>
              <div className="w-px bg-slate-700"></div>
              <div className="text-center">
                 <p className="text-xs text-slate-500 uppercase font-bold mb-1">Assets Owned</p>
                 <p className="text-2xl font-mono font-bold text-white">{user.inventoryIds.length}</p>
              </div>
           </div>
        </div>

        {/* Content Tabs (Visual only for now) */}
        <div className="border-b border-slate-800 mb-8">
           <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-[#9945FF] text-white font-medium">My Assets</button>
              <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition">Active Bids</button>
              <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition">History</button>
           </div>
        </div>

        {/* Inventory Grid */}
        {myAssets.length > 0 ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myAssets.map(asset => (
                 <PokemonCard key={asset.id} asset={asset} />
              ))}
           </div>
        ) : (
           <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
              <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Your inventory is empty</h3>
              <p className="text-slate-400 mb-6">Start collecting rare Pokémon NFTs today!</p>
              <Link to="/" className="inline-block px-6 py-3 bg-[#9945FF] text-white rounded-lg font-bold hover:bg-[#8035e0] transition">
                 Browse Marketplace
              </Link>
           </div>
        )}
      </div>
    </div>
  );
};

export default Profile;