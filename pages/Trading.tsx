import React from 'react';
import { ArrowRightLeft, TrendingUp, Clock } from 'lucide-react';

const Trading: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] py-16 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-retro text-white mb-4">Trading Center</h1>
                <p className="text-slate-400 mb-12">Manage your active auctions, make offers, and view global trade volume.</p>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                        <TrendingUp className="w-10 h-10 text-[#14F195] mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-white mb-2">Market Volume</h3>
                        <p className="text-3xl font-mono text-white">45,230 SOL</p>
                        <p className="text-slate-500 text-sm mt-2">+12% this week</p>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                        <ArrowRightLeft className="w-10 h-10 text-[#9945FF] mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-white mb-2">Recent Trades</h3>
                        <div className="space-y-3 mt-4 text-left">
                             {[1,2,3].map(i => (
                                 <div key={i} className="flex justify-between text-sm border-b border-slate-700 pb-2">
                                     <span className="text-slate-300">Pikachu #00{i}</span>
                                     <span className="text-[#14F195] font-mono">{(Math.random() * 10).toFixed(2)} SOL</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
                        <Clock className="w-10 h-10 text-orange-500 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold text-white mb-2">Live Auctions</h3>
                        <p className="text-3xl font-mono text-white">12</p>
                         <button className="mt-4 text-orange-500 hover:text-white text-sm font-bold">View All</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trading;