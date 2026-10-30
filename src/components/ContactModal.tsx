import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Headphones, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Aula Experimental');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    sounds.playBell();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmitted(true);

    const waText = encodeURIComponent(
      `Olá BUDA! Meu nome é ${name} (${phone}).\nAssunto: ${subject}\nMensagem: ${message || 'Gostaria de falar com um atendente.'}`
    );
    const waUrl = `https://wa.me/${GYM_INFO.whatsappRaw}?text=${waText}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-zinc-800 flex items-start justify-between bg-zinc-900/60">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                onClose();
              }}
              className="cursor-pointer group active:scale-95 transition-transform"
              title="Voltar ao início"
              aria-label="Voltar ao início"
            >
              <img
                src="/logo/buda-new-logo.png"
                alt="BUDA"
                className="w-16 sm:w-20 h-auto object-contain group-hover:scale-105 transition-transform drop-shadow"
              />
            </button>
            <div>
              <div className="flex items-center gap-2 text-red-500 font-semibold text-xs tracking-wider uppercase mb-1">
                <Headphones className="w-3.5 h-3.5 text-red-500" />
                <span>Canais de Atendimento</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-[var(--font-bebas)] text-white">
                Fale com a BUDA
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Estamos prontos para tirar suas dúvidas e receber você no tatame
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Channels Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp Direct */}
            <a
              href={GYM_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playTap()}
              className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-600 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    WhatsApp Principal
                  </h4>
                  <p className="text-xs text-zinc-400">{GYM_INFO.whatsapp}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${GYM_INFO.phone.replace(/[^0-9]/g, '')}`}
              onClick={() => sounds.playTap()}
              className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    Telefone Fixo Recepção
                  </h4>
                  <p className="text-xs text-zinc-400">{GYM_INFO.phone}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-400 opacity-70 group-hover:opacity-100 transition-all" />
            </a>
          </div>

          {/* Form Box */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 shadow-inner">
            <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">
              Envie uma Mensagem Direta
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Preencha o formulário abaixo para receber retorno imediato via WhatsApp.
            </p>

            {submitted ? (
              <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Mensagem preparada com sucesso!</h4>
                <p className="text-xs text-zinc-300">
                  Abrindo a conversa no WhatsApp para concluir o envio...
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-400 underline font-semibold mt-2"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      WhatsApp com DDD
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(21) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Assunto
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500"
                    >
                      <option value="Aula Experimental">Aula Experimental Gratuita</option>
                      <option value="Dúvidas de Planos">Valores e Planos de Matrícula</option>
                      <option value="Turmas Kids">Aulas Infantis (Kids)</option>
                      <option value="Loja e Produtos">Loja / Produtos Buda</option>
                      <option value="Parcerias e Imprensa">Parcerias e Imprensa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Mensagem (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Escreva sua dúvida ou objetivo esportivo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar pelo WhatsApp Oficial</span>
                </button>
              </form>
            )}
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400">
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <div className="truncate">
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Email Institucional</span>
                <a href={`mailto:${GYM_INFO.email}`} className="text-zinc-300 hover:underline">
                  {GYM_INFO.email}
                </a>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-red-500 shrink-0" />
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Atendimento Online</span>
                <span className="text-zinc-300">Seg a Sex das 07:00 às 22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>Respostas em média em menos de 10 minutos no WhatsApp.</span>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="text-zinc-300 hover:text-white font-semibold"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
