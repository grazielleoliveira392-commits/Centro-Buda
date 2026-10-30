/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { SocialBar } from './components/SocialBar';
import { LocationModal } from './components/LocationModal';
import { ValoresModal } from './components/ValoresModal';
import { TabelaValoresModal } from './components/TabelaValoresModal';
import { ClassesModal } from './components/ClassesModal';
import { StoreModal } from './components/StoreModal';
import { ContactModal } from './components/ContactModal';
import { sounds } from './utils/audio';

type ActiveModal = 'location' | 'valores' | 'tabela-valores' | 'classes' | 'store' | 'contact' | null;

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video autoplays smoothly on all mobile and desktop devices
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser requires interaction
      });
    }
  }, []);

  const handleButtonClick = (modal: ActiveModal) => {
    sounds.playTap();
    setActiveModal(modal);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col justify-center items-center overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Background Video (Buda-01-Horizontal.mp4) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/public/video/frame_preview.jpg"
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/video/buda-bg.mp4" type="video/mp4" />
          <source src="/imagem/Buda-01-Horizontal%20(1)%20(1).mp4" type="video/mp4" />
        </video>

        {/* Subtle cinematic darken filter to ensure text and buttons stand out clearly */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-95" />
      </div>

      {/* Main Center Content (Pixel-perfect recreation of original layout) */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8 max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto">
        
        {/* Official BUDA Logo (Click to return to home) */}
        <div className="flex flex-col items-center text-center select-none -translate-y-14 sm:-translate-y-8 mb-4 sm:mb-8">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveModal(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer group active:scale-95 transition-transform outline-none focus:outline-none"
            title="Voltar ao início"
            aria-label="Voltar ao início"
          >
            <img
              src="/logo/buda-new-logo.png"
              alt="BUDA"
              className="w-32 sm:w-36 md:w-40 h-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] select-none group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.src = '/logo/buda-logo-cropped.png';
              }}
            />
          </button>
        </div>

        {/* 4 Central Navigation Buttons & Social Icons Cluster */}
        <div className="w-full space-y-3 sm:space-y-3.5 max-w-[340px] sm:max-w-[380px] md:max-w-[400px]">
          
          {/* Social Media Icons (Shifted higher up) */}
          <div className="-translate-y-6 sm:-translate-y-6 mb-3 sm:mb-4">
            <SocialBar />
          </div>

          {/* 1. NOSSA LOCALIZAÇÃO */}
          <button
            onClick={() => handleButtonClick('location')}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>NOSSA LOCALIZAÇÃO</span>
          </button>

          {/* 2. AULAS | INFORMAÇÕES */}
          <button
            onClick={() => handleButtonClick('valores')}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>AULAS | INFORMAÇÕES</span>
          </button>

          {/* 3. LOJA */}
          <button
            onClick={() => handleButtonClick('store')}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>LOJA</span>
          </button>

          {/* 4. CONTATO */}
          <button
            onClick={() => handleButtonClick('contact')}
            className="buda-dark-btn w-full h-[52px] sm:h-[58px] px-6 text-white font-extrabold uppercase tracking-[0.16em] text-xs sm:text-sm text-center flex items-center justify-center cursor-pointer select-none"
          >
            <span>CONTATO</span>
          </button>

        </div>

      </main>

      {/* Interactive Modals */}
      <LocationModal 
        isOpen={activeModal === 'location'} 
        onClose={() => setActiveModal(null)} 
      />

      <ValoresModal
        isOpen={activeModal === 'valores'}
        onClose={() => setActiveModal(null)}
        onOpenTabelaValores={() => setActiveModal('tabela-valores')}
        onOpenSchedule={() => setActiveModal('classes')}
        onOpenPlans={() => setActiveModal('tabela-valores')}
      />

      <TabelaValoresModal
        isOpen={activeModal === 'tabela-valores'}
        onClose={() => setActiveModal(null)}
      />

      <ClassesModal 
        isOpen={activeModal === 'classes'} 
        onClose={() => setActiveModal(null)} 
      />

      <StoreModal 
        isOpen={activeModal === 'store'} 
        onClose={() => setActiveModal(null)} 
      />

      <ContactModal 
        isOpen={activeModal === 'contact'} 
        onClose={() => setActiveModal(null)} 
      />

    </div>
  );
}
