import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageSquare, ExternalLink, QrCode } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://budafight.com';

  const handleCopy = () => {
    sounds.playTap();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareWhatsApp = () => {
    sounds.playTap();
    const text = encodeURIComponent(`Confira o portal oficial da BUDA Fight & Fitness: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold uppercase tracking-wide font-[var(--font-bebas)] text-white">
              Compartilhar Perfil BUDA
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 flex flex-col items-center text-center space-y-4">
          {/* Simulated QR Code Canvas */}
          <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center">
            {/* SVG QR Code Pattern */}
            <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="white" />
              {/* Corner position markers */}
              <rect x="10" y="10" width="24" height="24" fill="black" />
              <rect x="14" y="14" width="16" height="16" fill="white" />
              <rect x="18" y="18" width="8" height="8" fill="black" />

              <rect x="66" y="10" width="24" height="24" fill="black" />
              <rect x="70" y="14" width="16" height="16" fill="white" />
              <rect x="74" y="18" width="8" height="8" fill="black" />

              <rect x="10" y="66" width="24" height="24" fill="black" />
              <rect x="14" y="70" width="16" height="16" fill="white" />
              <rect x="18" y="74" width="8" height="8" fill="black" />

              {/* Data modules pattern */}
              <rect x="40" y="12" width="6" height="6" fill="black" />
              <rect x="52" y="12" width="6" height="6" fill="black" />
              <rect x="44" y="22" width="10" height="6" fill="black" />
              <rect x="12" y="44" width="6" height="12" fill="black" />
              <rect x="24" y="40" width="8" height="8" fill="black" />
              <rect x="40" y="40" width="20" height="20" fill="black" rx="3" />
              <rect x="44" y="44" width="12" height="12" fill="red" rx="2" />
              <text x="50" y="53" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">B</text>

              <rect x="68" y="44" width="8" height="6" fill="black" />
              <rect x="80" y="40" width="6" height="14" fill="black" />
              <rect x="40" y="68" width="8" height="10" fill="black" />
              <rect x="54" y="72" width="12" height="6" fill="black" />
              <rect x="72" y="70" width="16" height="8" fill="black" />
              <rect x="80" y="82" width="8" height="6" fill="black" />
            </svg>
            <span className="text-[10px] text-zinc-800 font-bold uppercase tracking-wider mt-2">
              Aponte a câmera para abrir
            </span>
          </div>

          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <span className="flex-1 truncate text-zinc-300 font-mono text-left px-2">
                {currentUrl}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
