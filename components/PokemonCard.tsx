import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonAsset, Rarity, PokeType } from '../types';
import { Sparkles, Timer } from 'lucide-react';

interface PokemonCardProps {
  asset: PokemonAsset;
}

const typeColors: Record<PokeType, string> = {
  [PokeType.FIRE]: 'bg-red-500',
  [PokeType.WATER]: 'bg-blue-500',
  [PokeType.GRASS]: 'bg-green-500',
  [PokeType.ELECTRIC]: 'bg-yellow-400',
  [PokeType.PSYCHIC]: 'bg-pink-500',
  [PokeType.DRAGON]: 'bg-purple-600',
  [PokeType.GHOST]: 'bg-indigo-700',
  [PokeType.NORMAL]: 'bg-slate-400',
};

const rarityBorders: Record<Rarity, string> = {
  [Rarity.COMMON]: 'border-slate-700',
  [Rarity.RARE]: 'border-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]',
  [Rarity.EPIC]: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
  [Rarity.LEGENDARY]: 'border-[#14F195] shadow-[0_0_20px_rgba(20,241,149,0.5)]',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ asset }) => {
  return (
    <Link to={`/asset/${asset.id}`} className="block h-full">
      <div className={`
        relative group rounded-xl overflow-hidden bg-slate-800 border-2 h-full flex flex-col
        transition-all duration-300 hover:-translate-y-2 holo-card
        ${rarityBorders[asset.rarity]}
      `}>
        {/* Holographic Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 holo-gradient pointer-events-none z-10 transition-opacity duration-300" />

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-900 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
          {/* Real Pokemon Image */}
          <img 
            src={asset.image} 
            alt={asset.name}
            loading="lazy"
            className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
             <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${typeColors[asset.type]}`}>
                {asset.type}
             </span>
             {asset.isAuction && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-orange-500 shadow-sm">
                   <Timer className="w-3 h-3" /> Auction
                </span>
             )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between relative z-20 bg-slate-800">
           <div>
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-white text-lg truncate pr-2">{asset.name}</h3>
                 <span className="text-slate-400 text-xs font-mono">#{asset.id.split('-')[1].padStart(3, '0')}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                 <Sparkles className={`w-3 h-3 ${asset.rarity === Rarity.LEGENDARY ? 'text-yellow-400' : 'text-slate-400'}`} />
                 <span className={`text-xs font-medium ${asset.rarity === Rarity.LEGENDARY ? 'text-yellow-400' : 'text-slate-400'}`}>
                    {asset.rarity}
                 </span>
              </div>
           </div>

           <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <div className="flex flex-col">
                 <span className="text-[10px] uppercase text-slate-500 font-bold">Price</span>
                 <div className="flex items-center gap-1">
                    <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=025" alt="SOL" className="w-4 h-4" />
                    <span className="font-mono font-bold text-white">{asset.price.toFixed(2)}</span>
                 </div>
              </div>
              <button className="bg-slate-700 hover:bg-[#9945FF] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors duration-200">
                 View
              </button>
           </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;