
import React, { useState, useEffect } from 'react';
import { SmartHomeState } from '../types';
import { getSmartHomeAdvice } from '../services/geminiService';

const SmartHome: React.FC = () => {
  const [state, setState] = useState<SmartHomeState>({
    lights: false,
    temperature: 22,
    ac: false,
    security: true,
    curtains: true,
    fridge: true,
    garage: false,
    entertainment: false,
    camera: true,
    heater: false,
    doorLock: true,
  });
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const toggle = (key: keyof SmartHomeState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] as any }));
  };

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAdvice(true);
      const advice = await getSmartHomeAdvice(state);
      setAiAdvice(advice || '');
      setLoadingAdvice(false);
    };
    const timer = setTimeout(fetchAdvice, 2500);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative bg-slate-900/40 p-12 lg:p-20 rounded-[4rem] border border-slate-800 shadow-2xl overflow-hidden min-h-[750px] flex items-center justify-center">
        {/* Animated Cyber Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:40px_40px]"></div>

        <div className="relative z-10 w-full max-w-[750px]">
          <svg viewBox="0 0 800 550" className="w-full h-full drop-shadow-2xl">
            {/* Ground */}
            <line x1="50" y1="500" x2="750" y2="500" stroke="#1e293b" strokeWidth="4" />
            
            {/* House Structure */}
            <path d="M100,240 L400,80 L700,240" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinejoin="round" />
            
            {/* HOUSE INTERIOR - LIGHTS FIX */}
            <rect 
              x="150" y="240" width="500" height="260" 
              fill={state.lights ? "rgba(253, 224, 71, 0.1)" : "rgba(15, 23, 42, 0.8)"} 
              stroke="#334155" strokeWidth="2" 
              className="transition-colors duration-700"
            />
            {state.lights && (
              <rect x="150" y="240" width="500" height="260" fill="url(#lightGlow)" className="animate-pulse" />
            )}

            <line x1="150" y1="370" x2="650" y2="370" stroke="#334155" strokeWidth="2" />
            <line x1="400" y1="240" x2="400" y2="500" stroke="#334155" strokeWidth="2" />

            {/* --- ANIMATION: AC (Konditsioner) --- */}
            <g transform="translate(420, 260)">
               <rect x="0" y="0" width="100" height="30" fill="#f8fafc" rx="4" />
               <rect x="10" y="22" width="80" height="2" fill="#cbd5e1" />
               {state.ac && (
                 <g className="animate-in fade-in duration-500">
                    <path d="M20,35 Q30,55 20,75" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-[wind_1.5s_infinite_ease-in-out]" />
                    <path d="M50,35 Q60,55 50,75" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-[wind_1.5s_infinite_ease-in-out_0.2s]" />
                    <path d="M80,35 Q90,55 80,75" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-[wind_1.5s_infinite_ease-in-out_0.4s]" />
                    <rect x="0" y="0" width="100" height="30" fill="#22d3ee" className="opacity-10 animate-pulse" />
                 </g>
               )}
            </g>

            {/* --- ANIMATION: CURTAINS (Parda) --- */}
            <g transform="translate(180, 270)">
               <rect x="0" y="0" width="80" height="60" fill="#0f172a" />
               <rect 
                  x="0" y="0" 
                  width={state.curtains ? 40 : 10} 
                  height="60" 
                  fill="#475569" 
                  className="transition-all duration-1000 ease-in-out" 
               />
               <rect 
                  x={state.curtains ? 40 : 70} 
                  y="0" 
                  width={state.curtains ? 40 : 10} 
                  height="60" 
                  fill="#475569" 
                  className="transition-all duration-1000 ease-in-out" 
               />
            </g>

            {/* --- ANIMATION: FRIDGE (Muzlatgich Glow) --- */}
            <g transform="translate(180, 400)">
               <rect x="0" y="0" width="50" height="85" fill="#1e293b" stroke="#444" strokeWidth="2" />
               <rect x="5" y="40" width="40" height="1" fill="#444" />
               {state.fridge && (
                  <rect x="2" y="2" width="46" height="81" fill="#22d3ee" className="animate-pulse opacity-20" />
               )}
            </g>

            {/* --- ANIMATION: TV / ENTERTAINMENT --- */}
            <g transform="translate(480, 400)">
               <rect x="0" y="0" width="100" height="60" fill="#000" rx="4" stroke="#334155" strokeWidth="3" />
               {state.entertainment && (
                  <g>
                    <rect x="5" y="5" width="90" height="50" fill="url(#tvGlow)" className="animate-pulse" />
                    <circle cx="50" cy="30" r="10" fill="rgba(34,211,238,0.2)" className="animate-ping" />
                  </g>
               )}
            </g>

            {/* Garage Door */}
            <rect x="660" y={state.garage ? 400 : 440} width="80" height={state.garage ? 10 : 60} fill="#475569" className="transition-all duration-1000" />
            
            {/* Entrance Door (Animated) */}
            <g transform="translate(365, 420)">
              <rect x="0" y="0" width="45" height="80" fill="#0f172a" stroke="#475569" strokeWidth="2" />
              <rect 
                x={state.doorLock ? 0 : 38} 
                y="0" 
                width={state.doorLock ? 45 : 7} 
                height="80" 
                fill={state.doorLock ? "#1e293b" : "#10b981"} 
                className="transition-all duration-700 ease-in-out" 
              />
              <circle cx={state.doorLock ? 35 : 42} cy="40" r="3" fill={state.doorLock ? "#ef4444" : "#ffffff"} />
            </g>

            {/* SVG Gradients & Filters */}
            <defs>
              <radialGradient id="tvGlow">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lightGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Controls Cluster */}
          <CircleNode icon="fa-window-maximize" active={state.curtains} onClick={() => toggle('curtains')} pos="top-[-60px] left-[15%]" label="Pardalar" />
          <CircleNode icon="fa-snowflake" active={state.ac} onClick={() => toggle('ac')} pos="top-[-60px] left-[40%]" label="Konditsioner" />
          <CircleNode icon="fa-tv" active={state.entertainment} onClick={() => toggle('entertainment')} pos="top-[-60px] left-[65%]" label="Televizor" />
          <CircleNode icon="fa-door-open" active={!state.doorLock} onClick={() => toggle('doorLock')} pos="top-[-60px] left-[90%]" label="Eshik" />
          
          <CircleNode icon="fa-lightbulb" active={state.lights} onClick={() => toggle('lights')} pos="top-[45%] left-[-110px]" label="Chiroq" />
          <CircleNode icon="fa-refrigerator" active={state.fridge} onClick={() => toggle('fridge')} pos="top-[85%] left-[-110px]" label="Muzlatgich" />
          
          <CircleNode icon="fa-camera-cctv" active={state.camera} onClick={() => toggle('camera')} pos="top-[30%] right-[-110px]" label="Kamera" />
          <CircleNode icon="fa-warehouse" active={state.garage} onClick={() => toggle('garage')} pos="top-[75%] right-[-110px]" label="Garaj" />
        </div>

        {/* --- Remote Smartphone Display --- */}
        <div className="absolute top-10 right-10 hidden 2xl:flex flex-col items-center w-64 h-[480px] bg-[#020617] border-[10px] border-[#0f172a] rounded-[3.5rem] shadow-2xl p-6">
           <div className="w-16 h-1 bg-slate-800 rounded-full mb-10"></div>
           <div className="w-full flex justify-end mb-8"><span className="text-[10px] font-black text-cyan-400">5G SECURE</span></div>

           <div className="w-full bg-[#0f172a] rounded-[2rem] p-8 text-center border border-white/5 mb-8 shadow-xl">
             <div className="text-5xl font-black text-white mb-2">{state.temperature}°C</div>
             <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Havo Harorati</div>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <button 
                onClick={() => toggle('lights')} 
                className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${state.lights ? 'bg-[#3b2b0c]' : 'bg-[#1e293b]'}`}
              >
                <i className={`fas fa-lightbulb text-2xl ${state.lights ? 'text-amber-500' : 'text-slate-600'}`}></i>
              </button>
              <button 
                onClick={() => toggle('doorLock')} 
                className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${!state.doorLock ? 'bg-emerald-500/20' : 'bg-[#1e293b]'}`}
              >
                <i className={`fas ${state.doorLock ? 'fa-lock' : 'fa-lock-open'} text-2xl ${!state.doorLock ? 'text-emerald-500' : 'text-slate-600'}`}></i>
              </button>
           </div>

           <div className="text-center">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">STATUS</div>
              <div className={`text-sm font-black uppercase tracking-wider ${state.security ? 'text-emerald-500' : 'text-amber-500'}`}>
                {state.security ? 'TIZIM HIMOYADA' : 'TIZIM OCHIQ'}
              </div>
           </div>
        </div>
      </div>

      <div className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800">
         <div className="flex items-center gap-4 mb-4">
            <i className="fas fa-microchip text-indigo-400"></i>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">AI Tizim Operatori</h4>
         </div>
         <p className="text-slate-300 text-sm italic">"{aiAdvice || "Tizim holati tahlil qilinmoqda..."}"</p>
      </div>

      <style>{`
        @keyframes wind {
          0% { stroke-dashoffset: 20; opacity: 0; transform: translateY(0); }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
};

const CircleNode: React.FC<{ icon: string; active: boolean; onClick: () => void; pos: string; label: string }> = ({ icon, active, onClick, pos, label }) => (
  <div className={`absolute ${pos} flex flex-col items-center gap-2 group cursor-pointer z-20`}>
    <button
      onClick={onClick}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 shadow-2xl active:scale-90 ${
        active ? 'bg-[#8ec63f] border-white shadow-[0_0_35px_rgba(142,198,63,0.6)]' : 'bg-slate-900 border-slate-800'
      }`}
    >
      <i className={`fas ${icon} text-xl md:text-2xl transition-all ${active ? 'text-white' : 'text-slate-600'}`}></i>
    </button>
    <div className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${active ? 'text-[#8ec63f]' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`}>
      {label}
    </div>
  </div>
);

export default SmartHome;
