
export interface Property {
  id: string;
  title: string;
  location: {
    neighborhood: string;
    city: string;
    state: string;
  };
  price: number;
  condominiumFee?: number;
  iptu?: number;
  areas: {
    useful: number;
    total: number;
  };
  rooms: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
  };
  description: string;
  amenities: string[];
  condominiumFeatures: string[];
  images: string[];
  realtor: {
    name: string;
    creci: string;
    photo: string;
    phone: string;
    whatsapp: string;
  };
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Apartamento com 53 m² à venda em São Paulo - SP",
    location: {
      neighborhood: "Tatuapé",
      city: "São Paulo",
      state: "SP"
    },
    price: 741000,
    condominiumFee: 500,
    iptu: 200,
    areas: {
      useful: 53,
      total: 53
    },
    rooms: {
      bedrooms: 1,
      bathrooms: 1,
      parkingSpaces: 1
    },
    description: "Apartamento a venda de 53 metros quadrados, 1 dormitório, sala ampla com varanda grill, cozinha tipo americana, área de serviço e 1 vaga de garagem coberta e livre.",
    amenities: [
      "Todo com planejados e fino acabamento",
      "Móveis planejados em todos os ambientes",
      "Acabamento de primeira qualidade",
      "Varanda grill integrada"
    ],
    condominiumFeatures: [
      "Piscina aquecida e externa",
      "Academia completa",
      "Sauna",
      "Salão de festa",
      "Churrasqueira gourmet na área comum"
    ],
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
    ],
    realtor: {
      name: "Marcelo Marino",
      creci: "CRECI: 224172",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      phone: "(11) 94022-9225",
      whatsapp: "5511940229225"
    }
  },
  {
    id: "2",
    title: "Casa térrea com 120 m² à venda em Campinas - SP",
    location: {
      neighborhood: "Jardim Botânico",
      city: "Campinas",
      state: "SP"
    },
    price: 850000,
    condominiumFee: 0,
    iptu: 350,
    areas: {
      useful: 120,
      total: 150
    },
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 2
    },
    description: "Casa térrea em condomínio fechado com excelente localização. Possui 3 dormitórios sendo 1 suíte, sala de estar e jantar integradas, cozinha planejada e área gourmet.",
    amenities: [
      "Cozinha planejada completa",
      "Área gourmet com churrasqueira",
      "Jardim privativo",
      "Acabamento moderno"
    ],
    condominiumFeatures: [
      "Portaria 24h",
      "Área de lazer completa",
      "Quadra poliesportiva",
      "Playground",
      "Piscina"
    ],
    images: [
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
    ],
    realtor: {
      name: "Ana Silva",
      creci: "CRECI: 198654",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      phone: "(19) 98765-4321",
      whatsapp: "5519987654321"
    }
  },
  {
    id: "3",
    title: "Cobertura duplex com 180 m² à venda em Santos - SP",
    location: {
      neighborhood: "Boqueirão",
      city: "Santos",
      state: "SP"
    },
    price: 1200000,
    condominiumFee: 800,
    iptu: 450,
    areas: {
      useful: 180,
      total: 220
    },
    rooms: {
      bedrooms: 3,
      bathrooms: 3,
      parkingSpaces: 2
    },
    description: "Cobertura duplex com vista para o mar. No primeiro piso: sala ampla, cozinha gourmet e lavabo. No segundo piso: 3 suítes e terraço com churrasqueira.",
    amenities: [
      "Vista panorâmica para o mar",
      "Terraço com churrasqueira",
      "Cozinha gourmet completa",
      "3 suítes com closet"
    ],
    condominiumFeatures: [
      "Piscina com vista para o mar",
      "Academia",
      "Sauna",
      "Salão de festa",
      "Brinquedoteca"
    ],
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
    ],
    realtor: {
      name: "Roberto Costa",
      creci: "CRECI: 301245",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      phone: "(13) 99876-5432",
      whatsapp: "5513998765432"
    }
  }
];
