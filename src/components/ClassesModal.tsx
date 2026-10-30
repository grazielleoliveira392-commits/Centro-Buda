import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Zap, 
  Flame, 
  ArrowRight, 
  Send,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCHEDULE_DATA, PLANS_DATA, GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface ClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassesModal: React.FC<ClassesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'grade' | 'modalidades' | 'planos' | 'experimental'>('grade');
  const [selectedModality, setSelectedModality] = useState<string>('Todas');
  const [selectedDay, setSelectedDay] = useState<string>('Todos');

  // Booking form state
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingClass, setBookingClass] = useState('Jiu-Jitsu (BJJ)');
  const [bookingPeriod, setBookingPeriod] = useState('Noite');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const modalitiesList = ['Todas', 'Jiu-Jitsu (BJJ)', 'Muay Thai', 'Boxe Clássico', 'No-Gi / Submission', 'MMA', 'Funcional Fight', 'Kids'];
  const daysList = ['Todos', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const filteredSchedule = SCHEDULE_DATA.filter((item) => {
    const matchModality = selectedModality === 'Todas' || item.modality.toLowerCase().includes(selectedModality.toLowerCase());
    const matchDay = selectedDay === 'Todos' || item.days.includes(selectedDay);
    return matchModality && matchDay;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) return;

    sounds.playBell();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setBookingSuccess(true);

    const message = encodeURIComponent(
      `Olá BUDA! Meu nome é ${bookingName} e gostaria de agendar uma AULA EXPERIMENTAL GRATUITA de ${bookingClass} no turno da ${bookingPeriod}. Meu WhatsApp: ${bookingPhone}.`
    );
    const waUrl = `https://wa.me/${GYM_INFO.whatsappRaw}?text=${message}`;

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
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
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
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span>Artes Marciais & Performance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-[var(--font-bebas)] text-white">
                Aulas & Informações
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Horários, modalidades para todas as idades, planos e aula experimental
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

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 px-4 sm:px-6 overflow-x-auto gap-2 no-scrollbar">
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('grade');
            }}
            className={`py-3 px-4 text-xs sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'grade'
                ? 'border-red-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Grade de Horários
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('planos');
            }}
            className={`py-3 px-4 text-xs sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'planos'
                ? 'border-red-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Planos & Mensalidades
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('modalidades');
            }}
            className={`py-3 px-4 text-xs sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'modalidades'
                ? 'border-red-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Modalidades
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('experimental');
            }}
            className={`py-3 px-4 text-xs sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'experimental'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-red-500/80 hover:text-red-400'
            }`}
          >
            ★ Aula Gratuita
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* TAB 1: GRADE DE HORARIOS */}
          {activeTab === 'grade' && (
            <div className="space-y-5">
              {/* Filter controls */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Filtrar por Modalidade:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {modalitiesList.slice(0, 5).map((mod) => (
                      <button
                        key={mod}
                        onClick={() => {
                          sounds.playTap();
                          setSelectedModality(mod);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                          selectedModality === mod
                            ? 'bg-red-600 text-white font-bold'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider mr-1">Dia:</span>
                  {daysList.map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        sounds.playTap();
                        setSelectedDay(day);
                      }}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        selectedDay === day
                          ? 'bg-white text-black font-bold'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-800/40">
                            {item.modality}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{item.time}</span>
                          </div>
                        </div>

                        <div className="text-sm font-semibold text-zinc-200 mt-2">
                          {item.instructor}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                          <span>{item.level}</span>
                          <span>·</span>
                          <span className="text-zinc-500">{item.room}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/60 text-xs">
                        <span className="text-zinc-400">Dias: <strong className="text-white">{item.days.join(', ')}</strong></span>
                        <button
                          onClick={() => {
                            sounds.playTap();
                            setBookingClass(item.modality);
                            setActiveTab('experimental');
                          }}
                          className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Reservar</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-10 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
                    <p className="text-zinc-400 text-sm">Nenhuma aula encontrada para esses filtros.</p>
                    <button
                      onClick={() => {
                        setSelectedModality('Todas');
                        setSelectedDay('Todos');
                      }}
                      className="mt-2 text-xs text-red-400 hover:underline"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-950 border border-red-900/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">Nunca treinou artes marciais antes?</h4>
                  <p className="text-xs text-zinc-400">Temos turmas introdutórias com acompanhamento passo a passo.</p>
                </div>
                <button
                  onClick={() => {
                    sounds.playTap();
                    setActiveTab('experimental');
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shrink-0"
                >
                  Agendar Aula de Teste
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PLANOS & VALORES */}
          {activeTab === 'planos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS_DATA.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between border transition-all ${
                      plan.popular
                        ? 'bg-zinc-900 border-red-600/80 shadow-xl shadow-red-950/30 ring-1 ring-red-500/50'
                        : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow">
                        Mais Escolhido
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-extrabold uppercase font-[var(--font-bebas)] tracking-wide text-white">
                        {plan.name}
                      </h3>
                      
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{plan.price}</span>
                        <span className="text-xs text-zinc-400 font-medium">{plan.period}</span>
                      </div>

                      <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-zinc-300">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`https://wa.me/${GYM_INFO.whatsappRaw}?text=${encodeURIComponent(`Olá! Gostaria de me matricular no ${plan.name} da BUDA.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sounds.playBell()}
                      className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all ${
                        plan.popular
                          ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      Escolher Este Plano
                    </a>
                  </div>
                ))}
              </div>

              {/* Perks banner */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sem taxa de matrícula oculta · Desconto especial para estudantes, militares e duplas</span>
                </div>
                <a
                  href={GYM_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-400 hover:underline font-bold shrink-0"
                >
                  Consultar convênios
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: MODALIDADES */}
          {activeTab === 'modalidades' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                  <span>Tatame</span>
                </div>
                <h4 className="text-xl font-bold uppercase font-[var(--font-bebas)] text-white mt-1">
                  Jiu-Jitsu Brasileiro (BJJ) & No-Gi
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  A arte suave ensinada na mais alta linhagem tradicional aliada à moderna mecânica de competição. Desenvolva autodefesa real, alavancas, estrangulamentos e controle postural sem depender de força física bruta.
                </p>
                <div className="mt-3 text-xs text-zinc-400">
                  Professores: Mestre Robson Buda (Preta 4º Grau) & Equipe
                </div>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                  <span>Trocação</span>
                </div>
                <h4 className="text-xl font-bold uppercase font-[var(--font-bebas)] text-white mt-1">
                  Muay Thai & Boxe Clássico
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  A arte das oito armas e a nobre arte do boxe. Queima calórica extrema, coordenação motora, reflexo e potência em socos, chutes, cotovelos e joelhadas.
                </p>
                <div className="mt-3 text-xs text-zinc-400">
                  Treinos com aparadores tailandeses, sparring controlado e sacos pesados.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                  <span>Cage & Transição</span>
                </div>
                <h4 className="text-xl font-bold uppercase font-[var(--font-bebas)] text-white mt-1">
                  MMA (Mixed Martial Arts)
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  A integração perfeita entre trocação, quedas de wrestling/judô e luta de chão na grade. Treine no mesmo octógono oficial onde lutadores do cenário internacional se preparam.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-xs">
                  <span>Condicionamento & Base</span>
                </div>
                <h4 className="text-xl font-bold uppercase font-[var(--font-bebas)] text-white mt-1">
                  Funcional Fight & Kids
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  Treino dinâmico para perda de gordura e fortalecimento muscular sem combate físico direto. Turmas Kids focadas em disciplina, respeito, foco escolar e coordenação motora.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: AGENDAR AULA EXPERIMENTAL */}
          {activeTab === 'experimental' && (
            <div className="max-w-xl mx-auto">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-red-900/40 shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600/20 text-red-500 mb-2">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black uppercase font-[var(--font-bebas)] text-white tracking-wide">
                    Agende sua Aula Gratuita
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    Sem compromisso. Venha conhecer nosso tatame e sentir a energia BUDA.
                  </p>
                </div>

                {bookingSuccess ? (
                  <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Solicitação Enviada!</h4>
                    <p className="text-xs text-zinc-300">
                      Você está sendo redirecionado para o WhatsApp da equipe BUDA para confirmar o seu horário.
                    </p>
                    <button
                      onClick={() => setBookingSuccess(false)}
                      className="text-xs text-emerald-400 underline font-semibold mt-2"
                    >
                      Agendar outra aula
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                        Seu Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Carlos Eduardo"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                          WhatsApp / Telefone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(21) 99999-9999"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                          Modalidade de Interesse
                        </label>
                        <select
                          value={bookingClass}
                          onChange={(e) => setBookingClass(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-red-500"
                        >
                          <option value="Jiu-Jitsu (BJJ)">Jiu-Jitsu (BJJ)</option>
                          <option value="Muay Thai">Muay Thai</option>
                          <option value="Boxe Clássico">Boxe Clássico</option>
                          <option value="No-Gi / Submission">No-Gi / Submission</option>
                          <option value="MMA">MMA</option>
                          <option value="Funcional Fight">Funcional Fight</option>
                          <option value="Kids">Kids (Infantil)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                        Turno de Preferência
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Manhã', 'Tarde', 'Noite'].map((turno) => (
                          <button
                            key={turno}
                            type="button"
                            onClick={() => {
                              sounds.playTap();
                              setBookingPeriod(turno);
                            }}
                            className={`py-2 text-xs font-bold rounded-lg transition-all ${
                              bookingPeriod === turno
                                ? 'bg-red-600 text-white'
                                : 'bg-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                          >
                            {turno}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:scale-98 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirmar e Enviar no WhatsApp</span>
                    </button>
                  </form>
                )}

                {/* FAQ */}
                <div className="mt-6 pt-5 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-300">
                    <HelpCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>Dúvidas Frequentes da Primeira Aula:</span>
                  </div>
                  <p>• <strong>O que vestir?</strong> Roupa esportiva confortável (bermuda e camiseta sem zíperes).</p>
                  <p>• <strong>Preciso levar equipamento?</strong> Para a aula de teste, emprestamos luvas higienizadas.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>BUDA Fight Academy · Rio de Janeiro</span>
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('experimental');
            }}
            className="text-red-400 font-bold hover:underline"
          >
            Quero experimentar uma aula grátis →
          </button>
        </div>
      </div>
    </div>
  );
};
