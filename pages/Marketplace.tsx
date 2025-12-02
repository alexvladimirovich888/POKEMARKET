import React, { useState, useMemo } from 'react';
import { MOCK_ASSETS } from '../constants';
import PokemonCard from '../components/PokemonCard';
import { Rarity, PokeType } from '../types';
import { Search, Filter, RefreshCw } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PokeType | 'All'>('All');
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');

  const filteredAssets = useMemo(() => {
    let result = [...MOCK_ASSETS];

    if (searchTerm) {
      result = result.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedType !== 'All') {
      result = result.filter(a => a.type === selectedType);
    }

    if (selectedRarity !== 'All') {
      result = result.filter(a => a.rarity === selectedRarity);
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }
    // Mock newest doesn't sort by date really since we gen mock data, so we leave it as default index order

    return result;
  }, [searchTerm, selectedType, selectedRarity, sortBy]);

  return (
    <div className="min-h-screen bg-[#0f172a] pb-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-white/5 py-16 px-4 sm:px-6 lg:px-8 mb-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9945FF] rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#14F195] rounded-full blur-[100px] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-retro text-white mb-6 leading-tight">
            Catch, Collect & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Trade 'Em All</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            The premium NFT marketplace for digital Pokémon collectibles on Solana. 
            Zero gas fees, instant finality, and rare holographic assets.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition">
              Explore Collection
            </button>
            <button className="px-8 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-700 transition">
              Create Auction
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-slate-800/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm sticky top-24 z-30">
           
           {/* Search */}
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Search Pokémon..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#9945FF] focus:ring-1 focus:ring-[#9945FF] transition-all"
             />
           </div>

           {/* Filters */}
           <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
             <select 
               value={selectedType} 
               onChange={(e) => setSelectedType(e.target.value as PokeType | 'All')}
               className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#9945FF]"
             >
               <option value="All">All Types</option>
               {Object.values(PokeType).map(t => <option key={t} value={t}>{t}</option>)}
             </select>

             <select 
               value={selectedRarity} 
               onChange={(e) => setSelectedRarity(e.target.value as Rarity | 'All')}
               className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#9945FF]"
             >
               <option value="All">All Rarities</option>
               {Object.values(Rarity).map(r => <option key={r} value={r}>{r}</option>)}
             </select>

             <select 
               value={sortBy} 
               onChange={(e) => setSortBy(e.target.value as any)}
               className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#9945FF]"
             >
               <option value="newest">Newest</option>
               <option value="price_asc">Price: Low to High</option>
               <option value="price_desc">Price: High to Low</option>
             </select>
             
             <button 
                onClick={() => {setSearchTerm(''); setSelectedRarity('All'); setSelectedType('All');}}
                className="bg-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white border border-slate-700"
                title="Reset Filters"
             >
                 <RefreshCw className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#14F195]" />
                Marketplace Results
                <span className="text-sm font-normal text-slate-500 ml-2">({filteredAssets.length} items)</span>
            </h2>
        </div>

        {/* Grid */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAssets.map(asset => (
              <PokemonCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl">
             <p className="text-slate-500 text-lg">No Pokémon found matching your criteria.</p>
             <button 
                onClick={() => {setSearchTerm(''); setSelectedRarity('All'); setSelectedType('All');}}
                className="mt-4 text-[#9945FF] hover:text-[#14F195] font-medium"
             >
                 Clear all filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;