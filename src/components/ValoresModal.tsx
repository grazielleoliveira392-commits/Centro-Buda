import React from 'react';
import { SocialBar } from './SocialBar';
import { GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface ValoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTabelaValores?: () => void;
  onOpenSchedule?: () => void;
  onOpenPlans?: () => void;
}

export const ValoresModal: React.FC<ValoresModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenTabelaValores,
  onOpenSchedule,
  onOpenPlans 
}) => {
  if (!isOpen) return null;

  const handleValoresClick = () => {
    sounds.playTap();
    if (onOpenTabelaValores) {
      onOpenTabelaValores();
    } else if (onOpenPlans) {
      onOpenPlans();
    } else {
      const msg = encodeURIComponent('Olá BUDA! Gostaria de consultar os valores e opções de planos do Centro de Treinamento.');
      window.open(`https://wa.me/${GYM_INFO.whatsappRaw}?text=${msg}`, '_blank');
    }
  };

  const handleHorariosClick = () => {
    sounds.playTap();
    if (onOpenSchedule) {
      onOpenSchedule();
    } else {
      const msg = encodeURIComponent('Olá BUDA! Gostaria de consultar a grade de horários ou solicitar horários personalizados de treino.');
      window.open(`https://wa.me/${GYM_INFO.whatsappRaw}?text=${msg}`, '_blank');
    }
  };

  const handleTreinoExclusivoClick = () => {
    sounds.playTap();
    const msg = encodeURIComponent('Olá BUDA! Tenho interesse no Treino Exclusivo / Aulas Particulares com os professores do CT BUDA.');
    window.open(`https://wa.me/${GYM_INFO.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Full screen viewport container matching centrobuda.site layout */}
      <div 
        className="relative w-full h-full sm:max-w-md sm:h-[94vh] sm:rounded-2xl overflow-hidden flex flex-col justify-between items-center text-white bg-black shadow-2xl select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real Team Photo Background (/imagem/IMG_7445.jpg) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/images/IMG_7445.jpg"
            alt="Equipe BUDA"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = '/imagem/IMG_7445.jpg';
            }}
          />
          {/* Subtle contrast darken to make white buttons and text crisp */}
          <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />
        </div>

        {/* Top Section: BUDA Logo (Click to return to home, NO X button) */}
        <div className="relative z-10 pt-10 sm:pt-12 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="cursor-pointer group active:scale-95 transition-transform outline-none focus:outline-none"
            title="Voltar ao início"
            aria-label="Voltar ao início"
          >
            <img
              src="/logo/buda-new-logo.png"
              alt="BUDA"
              className="w-32 sm:w-36 md:w-40 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform"
            />
          </button>
        </div>

        {/* Center: 3 Navigation Buttons matching user screenshot (IMG_5244_94066968.png) */}
        <div className="relative z-10 w-full px-5 max-w-[340px] sm:max-w-[380px] space-y-3.5 sm:space-y-4 my-auto">
          
          {/* 1. VALORES CT */}
          <button
            onClick={handleValoresClick}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>VALORES CT</span>
          </button>

          {/* 2. HORÁRIOS PERSONALIZADOS */}
          <button
            onClick={handleHorariosClick}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>HORÁRIOS PERSONALIZADOS</span>
          </button>

          {/* 3. TREINO EXCLUSIVO */}
          <button
            onClick={handleTreinoExclusivoClick}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>TREINO EXCLUSIVO</span>
          </button>

        </div>

        {/* Bottom Section: Social Icons + Safe Area Dismiss Indicator */}
        <div className="relative z-10 pb-8 sm:pb-10 w-full flex flex-col items-center">
          <div className="mb-2">
            <SocialBar />
          </div>

          {/* Touch dismiss bar at bottom */}
          <div 
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="pt-3 flex justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            title="Voltar ao início"
          >
            <div className="w-12 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

      </div>
    </div>
  );
};
