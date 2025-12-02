import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ASSETS } from '../constants';
import { purchaseAssetMock } from '../services/mockSolana';
import { UserState } from '../types';
import { ArrowLeft, Share2, Heart, ShieldCheck, Clock, User, Activity } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DetailsProps {
  user: UserState;
  onConnect: () => void;
}

const Details: React.FC<DetailsProps> = ({ user, onConnect }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(MOCK_ASSETS.find(a => a.id === id));
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    if (!asset) return;
    
    // Simulate finding asset
    setAsset(MOCK_ASSETS.find(a => a.id === id));
    
    if (asset.isAuction && asset.auctionEndsAt) {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = asset.auctionEndsAt! - now;
            
            if (diff <= 0) {
                setCountdown('Ended');
                clearInterval(interval);
            } else {
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setCountdown(`${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [id, asset]);

  const handleBuy = async () => {
    if (!user.isConnected) {
      onConnect();
      return;
    }
    
    if (!asset) return;

    setIsProcessing(true);
    setPurchaseStatus('idle');

    const result = await purchaseAssetMock(asset.id, asset.price);
    
    setIsProcessing(false);
    if (result.success) {
        setPurchaseStatus('success');
        setStatusMessage(result.message);
    } else {
        setPurchaseStatus('error');
        setStatusMessage(result.message);
    }
  };

  if (!asset) {
    return <div className="p-20 text-center text-white">Asset not found</div>;
  }

  const isOwner = user.inventoryIds.includes(asset.id);

  return (
    <div className="min-h-screen bg-[#0f172a] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Image & Stats */}
          <div className="space-y-8">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
              <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                 <button className="p-2 bg-slate-900/50 backdrop-blur-md rounded-full text-white hover:bg-slate-900 transition"><Share2 className="w-5 h-5"/></button>
                 <button className="p-2 bg-slate-900/50 backdrop-blur-md rounded-full text-pink-500 hover:bg-slate-900 transition"><Heart className="w-5 h-5"/></button>
              </div>
            </div>

            {/* Stats Chart */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#9945FF]"/> Base Stats
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={asset.stats}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar name={asset.name} dataKey="value" stroke="#14F195" fill="#14F195" fillOpacity={0.3} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>

          {/* Right: Info & Action */}
          <div className="space-y-8">
             <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#9945FF] font-bold tracking-widest uppercase text-sm">{asset.rarity}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="text-slate-400 text-sm">{asset.type} Type</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-retro text-white mb-4">{asset.name}</h1>
                <p className="text-slate-400 leading-relaxed text-lg">{asset.description}</p>
             </div>

             {/* Owner Strip */}
             <div className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase">Current Owner</p>
                    <p className="text-white font-mono">{asset.owner}</p>
                </div>
             </div>

             {/* Action Box */}
             <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#9945FF] blur-[100px] opacity-10 pointer-events-none"></div>

                {asset.isAuction && (
                    <div className="mb-6 pb-6 border-b border-slate-700">
                        <p className="text-slate-400 text-sm mb-2">Auction ends in</p>
                        <div className="flex items-center gap-2 text-2xl font-mono font-bold text-white">
                            <Clock className="w-6 h-6 text-orange-500" />
                            {countdown}
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-slate-400 text-sm mb-1">{asset.isAuction ? 'Current Bid' : 'Current Price'}</p>
                    <div className="flex items-end gap-2">
                        <img src="https://cryptologos.cc/logos/solana-sol-logo.png?v=025" alt="SOL" className="w-8 h-8 mb-1" />
                        <span className="text-4xl font-bold text-white">{asset.price.toFixed(2)}</span>
                        <span className="text-slate-500 mb-2">SOL</span>
                    </div>
                </div>

                {purchaseStatus !== 'success' ? (
                   <div className="space-y-3">
                      {isOwner ? (
                          <button disabled className="w-full py-4 bg-slate-700 text-slate-300 rounded-xl font-bold cursor-not-allowed">
                              You own this asset
                          </button>
                      ) : (
                        <button 
                            onClick={handleBuy}
                            disabled={isProcessing}
                            className="w-full py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-slate-900 text-lg font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(20,241,149,0.3)]"
                        >
                            {isProcessing ? 'Processing Transaction...' : (asset.isAuction ? 'Place Bid' : 'Buy Now')}
                        </button>
                      )}
                      
                      {purchaseStatus === 'error' && (
                          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                              {statusMessage}
                          </div>
                      )}
                      
                      <div className="flex items-center justify-center gap-2 text-slate-500 text-xs mt-4">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Official PokeMarket Smart Contract</span>
                      </div>
                   </div>
                ) : (
                    <div className="text-center py-4 space-y-2 animate-fade-in">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                             <ShieldCheck className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Purchase Successful!</h3>
                        <p className="text-slate-400 text-sm">The asset has been transferred to your mock wallet.</p>
                        <button onClick={() => navigate('/profile')} className="text-[#14F195] hover:underline text-sm mt-2 block w-full">View in Inventory</button>
                    </div>
                )}
             </div>

             {/* History Table */}
             <div className="pt-8">
                 <h3 className="text-lg font-bold text-white mb-4">Transaction History</h3>
                 <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                         <thead>
                             <tr className="text-slate-500 border-b border-slate-800">
                                 <th className="pb-3 font-medium">Event</th>
                                 <th className="pb-3 font-medium">Price</th>
                                 <th className="pb-3 font-medium">From</th>
                                 <th className="pb-3 font-medium">To</th>
                                 <th className="pb-3 font-medium">Date</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-800">
                             {asset.history.map(tx => (
                                 <tr key={tx.id} className="text-slate-300">
                                     <td className="py-3 flex items-center gap-2">
                                         {tx.type === 'Sale' ? '🛒' : tx.type === 'List' ? '📜' : '✋'} {tx.type}
                                     </td>
                                     <td className="py-3 font-mono text-[#14F195]">{tx.price} SOL</td>
                                     <td className="py-3 font-mono text-slate-500">{tx.from}</td>
                                     <td className="py-3 font-mono text-slate-500">{tx.to}</td>
                                     <td className="py-3 text-slate-500">{tx.date}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;