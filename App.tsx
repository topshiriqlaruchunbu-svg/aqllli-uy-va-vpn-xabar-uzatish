
import React, { useState } from 'react';
import VPNDashboard from './components/VPNDashboard';
import SmartHome from './components/SmartHome';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vpn' | 'home'>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-cyan-500/30">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(8,145,178,0.3)] border border-white/10">
              <i className="fas fa-house-shield text-white text-xl"></i>
            </div>
            <div>
              <h1 className="font-black text-xl leading-none tracking-tight">AQLLI-UY</h1>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em]">Boshqaruv Markazi</span>
            </div>
          </div>

          <nav className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <i className="fas fa-home"></i> UY
            </button>
            <button
              onClick={() => setActiveTab('vpn')}
              className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'vpn' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
              }`}
            >
              <i className="fas fa-vpn-lock"></i> VPN
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
               <span className="text-[10px] text-emerald-500 font-bold tracking-widest">SECURE NODE-ALPHA</span>
               <span className="text-[9px] text-slate-500 font-mono">192.168.1.100</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-10 relative">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          {activeTab === 'vpn' ? <VPNDashboard /> : <SmartHome />}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-10 bg-slate-950 text-center">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              © 2024 AQLLI-UY & KIBER-SHIFRLASH TIZIMI
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
