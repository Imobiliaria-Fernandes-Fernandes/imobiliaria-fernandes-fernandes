import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

interface Neighborhood {
  name: string;
  city: string;
  properties: number;
  image: string;
}

// Função para processar os dados dos imóveis e agrupar por bairro
const getFeaturedNeighborhoods = (properties: any[]): Neighborhood[] => {
  if (!properties || properties.length === 0) {
    return [];
  }

  const neighborhoodData: { [key: string]: { count: number; image: string; city: string } } = {};

  // Agrupa os imóveis por bairro
  properties.forEach(prop => {
    const neighborhoodName = prop.neighborhood;
    if (!neighborhoodData[neighborhoodName]) {
      neighborhoodData[neighborhoodName] = { 
        count: 0, 
        // Usa a primeira imagem do primeiro imóvel encontrado no bairro
        image: prop.images?.[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", 
        city: prop.city 
      };
    }
    neighborhoodData[neighborhoodName].count++;
  });

  // Converte o objeto em um array
  const neighborhoodsArray = Object.keys(neighborhoodData).map(name => ({
    name: name,
    city: neighborhoodData[name].city,
    properties: neighborhoodData[name].count,
    image: neighborhoodData[name].image,
  }));

  // Ordena por número de imóveis e pega os 6 primeiros
  return neighborhoodsArray
    .sort((a, b) => b.properties - a.properties)
    .slice(0, 6);
};

const NeighborhoodsSection = () => {
  const [featuredNeighborhoods, setFeaturedNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('imoveis')
        .select('neighborhood, city, images'); // Seleciona apenas os campos necessários

      if (error) {
        console.error("Erro ao buscar dados para bairros:", error);
        setFeaturedNeighborhoods([]);
      } else {
        const topNeighborhoods = getFeaturedNeighborhoods(data);
        setFeaturedNeighborhoods(topNeighborhoods);
      }
      setLoading(false);
    };

    fetchNeighborhoods();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-graphite-900 mb-4">
            Bairros em Destaque
          </h2>
          <p className="text-xl text-graphite-600 max-w-2xl mx-auto">
            Explore os melhores bairros onde temos imóveis disponíveis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Exibe skeletons enquanto carrega
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            // Renderiza os bairros dinâmicos
            featuredNeighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.name}
                to={`/imoveis?local=${encodeURIComponent(neighborhood.name.toLowerCase().replace(/ /g, '-'))}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{neighborhood.name}</h3>
                      <div className="flex items-center text-sm opacity-90">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{neighborhood.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-graphite-600 text-sm">
                        {neighborhood.properties} {neighborhood.properties === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
                      </span>
                      <span className="text-golden-500 font-medium text-sm group-hover:text-golden-600 transition-colors">
                        Ver imóveis →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodsSection;
