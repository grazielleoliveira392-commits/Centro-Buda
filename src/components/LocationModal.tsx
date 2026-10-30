import React, { useState } from 'react';
import { X, ExternalLink, Navigation, Copy, Check } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    sounds.playTap();
    const fullAddress = `${GYM_INFO.address}, ${GYM_INFO.city}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Container: Fullscreen on mobile, centered sleek frame on tablet/desktop */}
      <div 
        className="relative w-full h-full sm:max-w-md sm:h-[92vh] sm:rounded-2xl overflow-hidden flex flex-col justify-between bg-black shadow-2xl border-0 sm:border sm:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real Gym Photo Background (High clarity neon & gym atmosphere matching user reference) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/gym-location-bg.jpg"
            alt="BUDA CT Location"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = '/images/gym-location-bg.png';
            }}
          />
          {/* Subtle contrast overlay to keep neon lights vivid while making text legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
        </div>

        {/* Top spacing (Close button removed as requested, clicking BUDA logo returns to home) */}
        <div className="relative z-20 pt-6 sm:pt-8" />

        {/* Header Section: BUDA Logo (Click to return to home) + "ENCONTRE-NOS FACILMENTE" + Address */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-2 sm:-mt-1 select-none">
          {/* Official BUDA Logo - Click to return to beginning */}
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="cursor-pointer group active:scale-95 transition-all duration-200 outline-none focus:outline-none mb-3 sm:mb-4"
            title="Voltar ao início"
            aria-label="Voltar ao início"
          >
            <img
              src="/logo/buda-new-logo.png"
              alt="BUDA"
              className="w-32 sm:w-36 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Headline matching user reference image exactly */}
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-black uppercase tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            ENCONTRE-NOS FACILMENTE
          </h2>

          {/* Address matching user reference */}
          <p className="text-sm sm:text-base text-white/95 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-1">
            R. Padre Cirilo Chaves, 1855 - Teresina
          </p>
        </div>

        {/* Map Section: Embedded Google Map matching reference screenshot */}
        <div className="relative z-10 w-full px-4 sm:px-5 pb-5 mt-4 flex-1 flex flex-col justify-end">
          <div className="relative w-full h-[54vh] sm:h-[46vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-zinc-900">
            
            {/* Floating "Abrir no Maps ↗" Button (Top-left of the map) */}
            <div className="absolute top-3 left-3 z-20">
              <a
                href={GYM_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playTap()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-[#1a73e8] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Abrir no Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Maps centered on CT Buda, Teresina */}
            <iframe
              title="Localização CT BUDA"
              src="https://maps.google.com/maps?q=CT+Buda,+Rua+Padre+Cirilo+Chaves,+1855+-+Noivos,+Teresina+-+PI&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <a
              href={GYM_INFO.wazeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playTap()}
              className="py-2.5 px-3 rounded-xl bg-cyan-700/85 hover:bg-cyan-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Abrir no Waze</span>
            </a>

            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-zinc-900/85 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/10 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Copiar Endereço</span>
                </>
              )}
            </button>
          </div>

          {/* Subtle touch dismiss bar at the bottom */}
          <div className="pt-2 flex justify-center cursor-pointer" onClick={onClose}>
            <div className="w-12 h-1 bg-white/40 rounded-full hover:bg-white/70 transition-colors" />
          </div>
        </div>

      </div>
    </div>
  );
};
