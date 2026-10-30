export interface ClassScheduleItem {
  id: string;
  modality: string;
  days: string[];
  time: string;
  instructor: string;
  level: string;
  room: string;
}

export interface PlanItem {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'vestuario' | 'fightwear' | 'protecao' | 'acessorios';
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  sizes: string[];
  description: string;
}

export const GYM_INFO = {
  name: 'BUDA Fight & Fitness',
  tagline: 'Centro de Treinamento de Alta Performance',
  motto: 'Nasci Para Vencer',
  address: 'R. Padre Cirilo Chaves, 1855 - Noivos',
  city: 'Teresina - PI',
  zip: '64046-340',
  phone: '(86) 99876-5432',
  whatsapp: '+55 86 99876-5432',
  whatsappRaw: '5586998765432',
  email: 'contato@budafight.com.br',
  instagram: '@budafight',
  instagramUrl: 'https://instagram.com/buda',
  facebookUrl: 'https://facebook.com/budafight',
  tiktokUrl: 'https://tiktok.com/@budafight',
  whatsappUrl: 'https://wa.me/5586998765432?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20BUDA%20e%20gostaria%20de%20informa%C3%A7%C3%B5es.',
  wazeUrl: 'https://waze.com/ul?q=R.+Padre+Cirilo+Chaves,+1855+Teresina',
  mapsUrl: 'https://maps.google.com/?q=R.+Padre+Cirilo+Chaves,+1855+-+Teresina',
  hours: {
    weekdays: '06:00 às 22:30',
    saturday: '08:00 às 15:00',
    sunday: '09:00 às 12:30 (Open Mat / Treino Livre)'
  }
};

export const SCHEDULE_DATA: ClassScheduleItem[] = [
  {
    id: 'bjj-1',
    modality: 'Jiu-Jitsu (BJJ)',
    days: ['Seg', 'Qua', 'Sex'],
    time: '07:00 - 08:30',
    instructor: 'Mestre Robson "Buda" Silva (Faixa Preta 4º Grau)',
    level: 'Todos os níveis',
    room: 'Tatame Principal 1'
  },
  {
    id: 'muay-1',
    modality: 'Muay Thai',
    days: ['Seg', 'Qua', 'Sex'],
    time: '08:30 - 09:30',
    instructor: 'Kru Lucas "Demolidor" Santos',
    level: 'Iniciante & Intermediário',
    room: 'Área de Combate'
  },
  {
    id: 'boxe-1',
    modality: 'Boxe Clássico',
    days: ['Ter', 'Qui'],
    time: '07:30 - 08:30',
    instructor: 'Coach Anderson "Mão de Pedra"',
    level: 'Todos os níveis',
    room: 'Ringue & Sacos'
  },
  {
    id: 'func-1',
    modality: 'Funcional Fight',
    days: ['Seg', 'Qua', 'Sex'],
    time: '12:00 - 13:00',
    instructor: 'Prof.ª Camila Rossi (Prep. Física)',
    level: 'Condicionamento Geral',
    room: 'Área de Musculação & Funcional'
  },
  {
    id: 'kids-1',
    modality: 'Jiu-Jitsu Kids',
    days: ['Ter', 'Qui'],
    time: '17:00 - 18:00',
    instructor: 'Instrutor Matheus Barreto',
    level: 'Infantil (5 a 12 anos)',
    room: 'Tatame 2'
  },
  {
    id: 'bjj-2',
    modality: 'Jiu-Jitsu (BJJ Gi)',
    days: ['Seg', 'Qua', 'Sex'],
    time: '18:30 - 20:00',
    instructor: 'Mestre Robson "Buda" Silva',
    level: 'Intermediário & Avançado',
    room: 'Tatame Principal 1'
  },
  {
    id: 'muay-2',
    modality: 'Muay Thai',
    days: ['Seg', 'Qua', 'Sex'],
    time: '19:30 - 20:30',
    instructor: 'Kru Lucas Santos',
    level: 'Todos os níveis',
    room: 'Área de Combate'
  },
  {
    id: 'nogi-1',
    modality: 'No-Gi / Submission',
    days: ['Ter', 'Qui'],
    time: '19:00 - 20:30',
    instructor: 'Coach Rodrigo "Caveira" Lima',
    level: 'Intermediário / Competição',
    room: 'Tatame Principal 1'
  },
  {
    id: 'mma-1',
    modality: 'MMA Striking & Grappling',
    days: ['Ter', 'Qui'],
    time: '20:30 - 22:00',
    instructor: 'Head Coach Buda & Equipe Pro',
    level: 'Competidores & Avançados',
    room: 'Octógono Oficial'
  },
  {
    id: 'open-mat',
    modality: 'Open Mat (Tatame Aberto)',
    days: ['Sáb', 'Dom'],
    time: 'Sáb: 10:30 | Dom: 09:30',
    instructor: 'Supervisionado pelos Faixas Pretas',
    level: 'Livre para Alunos e Visitantes',
    room: 'Tatame Geral'
  }
];

export const PLANS_DATA: PlanItem[] = [
  {
    id: 'plano-single',
    name: 'Plano Focado',
    price: 'R$ 189',
    period: '/mês',
    features: [
      '1 Modalidade à sua escolha',
      'Até 3x por semana',
      'Acesso aos vestiários completos',
      'Desconto de 5% na Loja Buda'
    ]
  },
  {
    id: 'plano-full',
    name: 'Full Fighter',
    price: 'R$ 269',
    period: '/mês',
    popular: true,
    features: [
      'Acesso ILIMITADO a todas as modalidades',
      'Jiu-Jitsu, Muay Thai, Boxe e No-Gi',
      'Área de Musculação & Funcional liberada',
      'Acesso livre aos Open Mats de fim de semana',
      'Desconto de 15% na Loja Buda',
      'Toalha de treino e armário rotativo'
    ]
  },
  {
    id: 'plano-black',
    name: 'Black Belt Anual',
    price: 'R$ 219',
    period: '/mês no plano anual',
    features: [
      'Tudo do Plano Full Fighter ilimitado',
      'Kit de Boas-Vindas Buda (Camiseta + Bandagem)',
      '1 Avaliação física biométrica por trimestre',
      'Desconto vitalício de 20% na Loja Oficial',
      'Prioridade em Seminários com Campeões do UFC'
    ]
  }
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'rash-black',
    name: 'Rashguard Buda Pro "Dark Armor"',
    category: 'fightwear',
    price: 159.90,
    originalPrice: 189.90,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    tag: 'Mais Vendido',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Tecido de compressão tecnológica 4-way stretch com proteção UV50+ e costuras reforçadas flatlock para treinos intensos No-Gi e MMA.'
  },
  {
    id: 'shorts-mma',
    name: 'Fight Shorts Buda UltraFlex',
    category: 'fightwear',
    price: 139.90,
    originalPrice: 169.90,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&auto=format&fit=crop&q=80',
    tag: 'Lançamento',
    sizes: ['38', '40', '42', '44', '46'],
    description: 'Bermuda de luta com fenda lateral anatômica, fechamento em velcro triplo e cordão interno. Liberdade total para chutes e raspagens.'
  },
  {
    id: 'kimono-gold',
    name: 'Kimono Jiu-Jitsu Buda Comp Gold Weave',
    category: 'fightwear',
    price: 459.90,
    originalPrice: 529.90,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    tag: 'Edição Especial',
    sizes: ['A1', 'A2', 'A3', 'A4'],
    description: 'Trançado pesado de 550g/m² em algodão pré-encolhido. Gola em EVA antibacteriano e bordados de alta definição nas costas e ombro.'
  },
  {
    id: 'luva-boxe',
    name: 'Luva Buda Couro Legítimo 14oz / 16oz',
    category: 'protecao',
    price: 269.90,
    originalPrice: 319.90,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    tag: 'Profissional',
    sizes: ['12oz', '14oz', '16oz'],
    description: 'Espuma injetada multi-camadas com absorção de impacto superior. Trava de polegar ergonômica e pulso com suporte reforçado.'
  },
  {
    id: 'camisa-nasci',
    name: 'Camiseta Buda "Nasci Para Vencer"',
    category: 'vestuario',
    price: 99.90,
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: 'Algodão Pima 100% penteado com toque aveludado. Estampa em silk relevo com o lema oficial BUDA das fotos da academia.'
  },
  {
    id: 'kit-bandagem',
    name: 'Kit Bandagem 4.5m + Bucal Moldável',
    category: 'protecao',
    price: 69.90,
    sizes: ['Único'],
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    description: 'Bandagem de algodão elástico respirável com fecho em velcro + protetor bucal em silicone atóxico termomoldável.'
  },
  {
    id: 'coqueteleira-stealth',
    name: 'Coqueteleira Buda Inox Stealth 750ml',
    category: 'acessorios',
    price: 59.90,
    sizes: ['750ml'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    description: 'Aço inoxidável de parede dupla livre de BPA com mola misturadora interna e tampa hermética anti-vazamento.'
  },
  {
    id: 'bone-snapback',
    name: 'Boné Buda Snapback Streetwear',
    category: 'vestuario',
    price: 89.90,
    sizes: ['Ajustável'],
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
    description: 'Aba reta estruturada com bordado 3D frontal BUDA em alto relevo e regulador traseiro premium.'
  }
];
