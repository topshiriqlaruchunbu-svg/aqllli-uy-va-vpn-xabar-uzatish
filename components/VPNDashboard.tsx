
import React, { useState, useEffect, useRef } from 'react';
import { encodeText } from '../utils/encoding';
import { explainEncoding } from '../services/geminiService';
import { EncodingType, VPNServer } from '../types';

const ENCODING_INFO: Record<EncodingType, { title: string, desc: string, use: string }> = {
  base64: {
    title: "Base64 Encoding",
    desc: "Binar ma'lumotlarni matn ko'rinishiga o'tkazish algoritmi. Bu shifrlash emas, balki ma'lumotni xavfsiz uzatish formatidir.",
    use: "Rasmlarni HTML ichida saqlash yoki email protokollarida qo'llaniladi."
  },
  hex: {
    title: "Hexadecimal (16-lik)",
    desc: "Har bir belgini uning 16-lik sanoq tizimidagi kodiga aylantiradi. Kompyuter xotirasidagi ma'lumotlarni o'qish uchun eng qulay usul.",
    use: "Past darajali dasturlash va rang kodlarida ishlatiladi."
  },
  binary: {
    title: "Binary (Ikkilik)",
    desc: "Ma'lumotlarni faqat 0 va 1 lardan iborat mashina tiliga aylantiradi. Kompyuterning fundamental asosi.",
    use: "Ma'lumotlarni bit darajasida qayta ishlashda ishlatiladi."
  },
  rot13: {
    title: "ROT13 Cipher",
    desc: "Klassik sezar shifri. Alifbodagi har bir harfni o'zidan keyingi 13-harf bilan almashtiradi.",
    use: "Oddiy sirlarni yashirish yoki forumlarda 'spoiler'larni yashirish uchun ishlatiladi."
  },
  morse: {
    title: "Morse Code",
    desc: "Matnni nuqtalar va chiziqlar (signal) ko'rinishida ifodalash usuli.",
    use: "Telegraf aloqasi va favqulodda vaziyatlarda (SOS) qo'llaniladi."
  }
};

const VPNDashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [encodingType, setEncodingType] = useState<EncodingType>('base64');
  const [sendingState, setSendingState] = useState<'idle' | 'encoding' | 'tunneling' | 'arrived'>('idle');
  const [result, setResult] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [stats, setStats] = useState({ speed: 0, bits: '' });
  
  const timerRef = useRef<any>(null);

  const handleSend = async () => {
    if (!inputText) return;
    
    setSendingState('encoding');
    const encoded = encodeText(inputText, encodingType);
    
    timerRef.current = setInterval(() => {
      setStats({
        speed: Math.floor(Math.random() * 800) + 100,
        bits: Math.random().toString(2).slice(2, 18)
      });
    }, 100);

    await new Promise(r => setTimeout(r, 1200));
    setResult(encoded);
    setSendingState('tunneling');
    
    await new Promise(r => setTimeout(r, 2500));
    clearInterval(timerRef.current);
    setSendingState('arrived');
    
    const explanation = await explainEncoding(inputText, encodingType);
    setAiExplanation(explanation || '');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Algorithm Lexicon / Information */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {(Object.keys(ENCODING_INFO) as EncodingType[]).map(key => (
          <div 
            key={key}
            onClick={() => setEncodingType(key)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer ${
              encodingType === key ? 'bg-cyan-500/10 border-cyan-500' : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="text-[10px] font-black uppercase text-cyan-400 mb-2">{key}</div>
            <div className="text-xs font-bold text-white mb-1">{ENCODING_INFO[key].title}</div>
            <div className="text-[9px] text-slate-500 leading-tight">{ENCODING_INFO[key].desc}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Source */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">SHIFRLASH TUGUNI</h3>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={sendingState === 'encoding' || sendingState === 'tunneling'}
            placeholder="Xabarni kiriting..."
            className="w-full h-44 bg-black/40 border border-slate-800 rounded-2xl p-5 text-slate-200 font-mono text-sm outline-none mb-6"
          />
          <button
            onClick={handleSend}
            disabled={sendingState === 'encoding' || sendingState === 'tunneling' || !inputText}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 font-black text-xs uppercase tracking-widest hover:shadow-cyan-500/20 shadow-2xl transition-all"
          >
            {sendingState === 'idle' ? `XAVFSIZ YUBORISH (${encodingType.toUpperCase()})` : 'KODLANMOQDA...'}
          </button>
        </div>

        {/* Tunnel Visual */}
        <div className="lg:col-span-2 flex items-center justify-center py-10">
           <div className="w-full h-full border-x border-dashed border-slate-800 flex flex-col justify-center gap-4 overflow-hidden relative">
              {sendingState === 'tunneling' && (
                <div className="animate-[packet-flow_1s_infinite_linear] flex flex-col gap-4">
                   {[...Array(6)].map((_, i) => (
                     <div key={i} className="mx-auto w-3 h-3 bg-cyan-500/40 rounded-sm"></div>
                   ))}
                </div>
              )}
           </div>
        </div>

        {/* Target */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6 text-right">QABUL TUGUNI</h3>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[300px]">
            {sendingState === 'arrived' ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="p-4 bg-black/60 rounded-xl border border-cyan-900/30 font-mono text-[10px] text-cyan-400 break-all leading-relaxed">
                  {result}
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-sm text-white font-medium italic">
                  "{inputText}"
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase mb-2">AI Shifrlash Tahlili</div>
                  {/* Fixed: Removed undefined variable 'aiAdvice' and replaced with 'aiExplanation' */}
                  <p className="text-slate-400 text-xs italic leading-relaxed">{aiExplanation}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 gap-4">
                <i className="fas fa-lock text-6xl"></i>
                <span className="text-[10px] font-bold uppercase tracking-widest">Ma'lumot kutilmoqda</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes packet-flow {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
};

export default VPNDashboard;
