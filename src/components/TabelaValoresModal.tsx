import React from 'react';
import { GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface TabelaValoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PriceItem {
  id: string;
  label: string;
  planName: string;
  topPercent: number; // percentage from top of 9:16 canvas
  rightPercent?: number;
  centerAlign?: boolean;
}

const PRICES_LIST: PriceItem[] = [
  // 1X
  { id: '1x-mensal', label: 'R$300', planName: 'Personal Fight 1X - Mensal', topPercent: 35.42, rightPercent: 8 },
  { id: '1x-trimestral', label: 'R$850', planName: 'Personal Fight 1X - Trimestral', topPercent: 38.91, rightPercent: 8 },

  // 2X
  { id: '2x-mensal', label: 'R$500', planName: 'Personal Fight 2X - Mensal', topPercent: 49.64, rightPercent: 8 },
  { id: '2x-trimestral', label: 'R$1400', planName: 'Personal Fight 2X - Trimestral', topPercent: 53.13, rightPercent: 8 },

  // 3X
  { id: '3x-mensal', label: 'R$500', planName: 'Personal Fight 3X - Mensal', topPercent: 63.49, rightPercent: 8 },
  { id: '3x-trimestral', label: 'R$1400', planName: 'Personal Fight 3X - Trimestral', topPercent: 66.98, rightPercent: 8 },

  // TURMA COLETIVA 2X
  { id: 'coletiva-2x', label: 'R$250', planName: 'Turma Coletiva 2X - Mensal', topPercent: 82.81, rightPercent: 8 },

  // AULA AVULSA (Positioned centered underneath/alongside AULA AVULSA text matching user reference)
  { id: 'aula-avulsa', label: 'R$100', planName: 'Aula Avulsa', topPercent: 92.5, centerAlign: true },
];

export const TabelaValoresModal: React.FC<TabelaValoresModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePriceClick = (item: PriceItem) => {
    sounds.playTap();
    const msg = encodeURIComponent(
      `Olá BUDA! Tenho interesse no plano: *${item.planName}* (${item.label}). Gostaria de realizar minha matrícula!`
    );
    window.open(`https://wa.me/${GYM_INFO.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-in fade-in duration-200 overflow-y-auto p-0 sm:p-4"
      onClick={onClose}
    >
      {/* 9:16 Canvas container mirroring 1.png.png full page */}
      <div 
        className="relative w-full max-w-[420px] sm:max-w-[440px] aspect-[9/16] max-h-[100dvh] sm:max-h-[94vh] sm:rounded-2xl overflow-hidden shadow-2xl bg-white select-none my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full background poster (1.png.png) */}
        <img
          src="/images/tabela-valores-bg.jpg"
          alt="Tabela de Valores CT BUDA"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = '/images/1.png.png';
          }}
        />

        {/* Top: Black BUDA Logo (Click to return to home, NO X button) */}
        <div className="absolute top-[6.5%] sm:top-[7.2%] left-1/2 -translate-x-1/2 z-20">
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
              src="/logo/buda-logo-black.png"
              alt="BUDA"
              className="w-28 sm:w-32 md:w-36 h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
          </button>
        </div>

        {/* Dynamic Interactive Price Boxes (matching user reference boxes exactly) */}
        {PRICES_LIST.map((item) => {
          if (item.centerAlign) {
            return (
              <div
                key={item.id}
                style={{ top: `${item.topPercent}%` }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  type="button"
                  onClick={() => handlePriceClick(item)}
                  className="px-4 py-1.5 sm:px-5 sm:py-2 border-[1.5px] border-black bg-white/95 text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:bg-black hover:text-white active:scale-95 transition-all cursor-pointer"
                  title={`Matricular em ${item.planName}`}
                >
                  {item.label}
                </button>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              style={{
                top: `${item.topPercent}%`,
                right: `${item.rightPercent ?? 8}%`,
              }}
              className="absolute -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => handlePriceClick(item)}
                className="w-[74px] sm:w-[86px] h-[27px] sm:h-[31px] flex items-center justify-center border-[1.5px] border-black bg-white/95 text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:bg-black hover:text-white active:scale-95 transition-all cursor-pointer"
                title={`Matricular em ${item.planName}`}
              >
                {item.label}
              </button>
            </div>
          );
        })}

        {/* Bottom subtle dismiss bar */}
        <div 
          onClick={() => {
            sounds.playTap();
            onClose();
          }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pt-2 pb-1 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
          title="Voltar ao início"
        >
          <div className="w-12 h-1 bg-black/50 rounded-full" />
        </div>

      </div>
    </div>
  );
};
