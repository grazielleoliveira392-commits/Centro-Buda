import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Tag,
  Plus,
  Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS_DATA, ProductItem, GYM_INFO } from '../data/gymData';
import { sounds } from '../utils/audio';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  product: ProductItem;
  size: string;
  quantity: number;
}

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'rash-black': 'M',
    'shorts-mma': '42',
    'kimono-gold': 'A2',
    'luva-boxe': '14oz',
    'camisa-nasci': 'G',
    'kit-bandagem': 'Único',
    'coqueteleira-stealth': '750ml',
    'bone-snapback': 'Ajustável'
  });
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const filteredProducts = activeCategory === 'todos'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  const handleSelectSize = (productId: string, size: string) => {
    sounds.playTap();
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ProductItem) => {
    sounds.playTap();
    const size = selectedSizes[product.id] || product.sizes[0];
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });

    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 }
    });
  };

  const updateQuantity = (index: number, delta: number) => {
    sounds.playTap();
    setCart((prev) => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      target.quantity = newQty;
      return next;
    });
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playTap();
    if (couponCode.trim().toUpperCase() === 'BUDA10') {
      setDiscountPercent(10);
      setCouponMessage('Cupom BUDA10 aplicado! 10% de desconto.');
    } else {
      setCouponMessage('Cupom inválido. Tente BUDA10');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    sounds.playBell();

    const itemsSummary = cart.map(
      (item) => `• ${item.quantity}x ${item.product.name} (Tam: ${item.size}) - R$ ${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const discountText = discountPercent > 0 ? `\nDesconto (${discountPercent}%): -R$ ${discountAmount.toFixed(2)}` : '';
    const message = encodeURIComponent(
      `Olá BUDA Store! Gostaria de encomendar os seguintes itens da loja oficial:\n\n${itemsSummary}${discountText}\n\n*Total: R$ ${total.toFixed(2)}*\n\nPor favor, informe as opções de retirada na academia ou envio!`
    );

    window.open(`https://wa.me/${GYM_INFO.whatsappRaw}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
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
                <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
                <span>Buda Official Gear</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-[var(--font-bebas)] text-white">
                Loja Oficial BUDA
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Fightwear de alta resistência, kimonos, vestuário e acessórios para guerreiros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={() => {
                sounds.playTap();
                setIsCartOpen(!isCartOpen);
              }}
              className="relative p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-white transition-all flex items-center gap-2 text-xs font-bold"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Sacola</span>
              {totalItemsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                sounds.playTap();
                onClose();
              }}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Fechar loja"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/40 px-4 sm:px-6 overflow-x-auto gap-2 no-scrollbar py-2.5">
          {[
            { id: 'todos', label: 'Todos os Produtos' },
            { id: 'fightwear', label: 'Fightwear & Kimonos' },
            { id: 'protecao', label: 'Luvas & Proteção' },
            { id: 'vestuario', label: 'Vestuário & Streetwear' },
            { id: 'acessorios', label: 'Acessórios & Shakers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playTap();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const currentSelectedSize = selectedSizes[product.id] || product.sizes[0];

              return (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 flex flex-col justify-between overflow-hidden transition-all hover:shadow-xl hover:shadow-black/60"
                >
                  {/* Image / Graphic Display */}
                  <div className="relative aspect-square w-full bg-gradient-to-b from-zinc-800/80 to-zinc-950 p-4 flex flex-col items-center justify-center overflow-hidden">
                    {/* Background geometric emblem */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="text-8xl font-black font-[var(--font-bebas)] tracking-tighter">BUDA</span>
                    </div>

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white shadow">
                        {product.tag}
                      </span>
                    )}

                    {/* Product visual representation */}
                    <div className="relative z-10 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-20 h-20 rounded-2xl bg-zinc-800/90 border border-zinc-700/60 flex items-center justify-center shadow-lg mb-2">
                        <ShoppingBag className="w-9 h-9 text-red-500" />
                      </div>
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        BUDA AUTHENTIC
                      </span>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Sizes selection */}
                      <div className="mt-3">
                        <span className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                          Tamanho / Opção:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleSelectSize(product.id, sz)}
                              className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                                currentSelectedSize === sz
                                  ? 'bg-white text-black'
                                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price and Add button */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <span className="text-[11px] text-zinc-400 line-through block">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-base font-extrabold text-white">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-bold uppercase rounded-lg transition-all shadow-md flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee banner */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantia de qualidade BUDA · Troca facilitada na recepção da academia</span>
            </div>
            <span>Use o cupom <strong>BUDA10</strong> para 10% OFF</span>
          </div>
        </div>

        {/* Sliding Cart Drawer Overlay */}
        {isCartOpen && (
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col z-30 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-white text-sm uppercase">Sua Sacola de Compras</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto opacity-30 text-zinc-400" />
                  <p className="text-sm">Sua sacola está vazia.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-red-400 hover:underline font-bold"
                  >
                    Ver produtos disponíveis
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h5>
                      <span className="text-[11px] text-zinc-400">
                        Tam: <strong>{item.size}</strong> · R$ {item.product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-1 hover:bg-zinc-700 text-zinc-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-1 hover:bg-zinc-700 text-zinc-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => updateQuantity(index, -item.quantity)}
                        className="p-1 text-zinc-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Coupon Form */}
              {cart.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Cupom de Desconto
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: BUDA10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs uppercase focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1 ${discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {couponMessage}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-zinc-800 bg-zinc-900 space-y-3">
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-white">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Desconto ({discountPercent}%):</span>
                      <span>-R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-white pt-1 border-t border-zinc-800">
                    <span>Total Estimado:</span>
                    <span className="text-red-400">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Finalizar Pedido pelo WhatsApp</span>
                </button>
                <p className="text-[10px] text-zinc-400 text-center">
                  Retirada imediata na recepção ou entrega rápida via motoboy.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Global Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Itens exclusivos para atletas e apaixonados por luta</span>
          </div>
          {totalItemsCount > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-red-400 font-bold hover:underline"
            >
              Ver sacola ({totalItemsCount} itens) →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
