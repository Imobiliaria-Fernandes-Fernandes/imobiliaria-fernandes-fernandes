import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import PropertySearch from "../components/PropertySearch";
import { supabase } from "../lib/supabaseClient";
import { Property } from "../data/properties";
import { Skeleton } from "@/components/ui/skeleton";

// Definindo a interface para os filtros de busca
interface SearchFilters {
  query: string;
  propertyType: string;
  location: string;
  priceRange: [number, number];
}

// Função para mapear dados do Supabase (snake_case) para o formato do app (camelCase)
const mapSupabaseToProperty = (data: any[]): Property[] => {
  return data.map(p => ({
    id: p.id,
    title: p.title,
    location: {
      neighborhood: p.neighborhood,
      city: p.city,
      state: p.state,
    },
    price: p.price,
    condominiumFee: p.condominium_fee,
    iptu: p.iptu,
    areas: {
      useful: p.area_useful,
      total: p.area_total,
    },
    rooms: {
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      parkingSpaces: p.parking_spaces,
    },
    description: p.description,
    amenities: p.amenities || [],
    condominiumFeatures: p.condominium_features || [],
    images: p.images || [],
    realtor: {
      name: p.realtor_name,
      creci: p.realtor_creci,
      photo: p.realtor_photo,
      phone: p.realtor_phone,
      whatsapp: p.realtor_whatsapp,
    },
    propertyType: p.property_type
  }));
};

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Busca os imóveis do Supabase ao carregar o componente
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('imoveis').select('*');
      
      if (error) {
        console.error("Erro ao buscar imóveis:", error);
        setProperties([]);
      } else {
        setProperties(mapSupabaseToProperty(data));
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const priceLimits = useMemo(() => {
    if (loading) return { min: 0, max: 2000000 };
    if (properties.length === 0) return { min: 0, max: 2000000 };
    const prices = properties.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [properties, loading]);

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    propertyType: '',
    location: '',
    priceRange: [priceLimits.min, priceLimits.max],
  });

  // Inicializa os filtros a partir dos parâmetros da URL
  useEffect(() => {
    if (!loading) {
      setFilters({
        query: searchParams.get('q') || '',
        propertyType: searchParams.get('tipo') || '',
        location: searchParams.get('local') || '',
        priceRange: [
          Number(searchParams.get('min_price')) || priceLimits.min,
          Number(searchParams.get('max_price')) || priceLimits.max,
        ],
      });
    }
  }, [searchParams, priceLimits, loading]);

  // Função para lidar com a busca, atualizando a URL
  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.propertyType) params.set('tipo', newFilters.propertyType);
    if (newFilters.location) params.set('local', newFilters.location);
    if (newFilters.priceRange[0] > priceLimits.min) params.set('min_price', newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < priceLimits.max) params.set('max_price', newFilters.priceRange[1].toString());
    setSearchParams(params);
  }, [setSearchParams, priceLimits]);

  // Filtra as propriedades com base nos filtros (ainda no lado do cliente)
  const filteredProperties = useMemo(() => {
    if (loading) return [];
    
    return properties.filter(property => {
      const { query, propertyType, location, priceRange } = filters;

      const matchesQuery = !query || 
                           property.title.toLowerCase().includes(query.toLowerCase()) ||
                           property.location.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
                           property.location.city.toLowerCase().includes(query.toLowerCase());

      const matchesType = !propertyType || property.propertyType === propertyType;
      
      const matchesLocation = !location || property.location.neighborhood.toLowerCase().replace(/ /g, '-') === location;

      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

      return matchesQuery && matchesType && matchesLocation && matchesPrice;
    })
  }, [filters, properties, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Seção de Busca de Imóveis */}
      <section className="bg-graphite-50 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertySearch 
            onSearch={handleSearch} 
            showAdvancedFilters={true}
            minPrice={priceLimits.min}
            maxPrice={priceLimits.max}
          />
        </div>
      </section>

      {/* Título da seção de resultados */}
      <section className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-graphite-900 mb-6">
            {loading ? 'Buscando imóveis...' : `${filteredProperties.length} Imóveis Encontrados`}
          </h2>
          
          {/* Grid de Imóveis */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-56 w-full rounded-lg" />
                  <Skeleton className="h-6 w-5/6 rounded" />
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-8 w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-graphite-600 mb-4">
                Nenhum imóvel encontrado com os filtros selecionados.
              </p>
              <button 
                onClick={() => handleSearch({ query: '', propertyType: '', location: '', priceRange: [priceLimits.min, priceLimits.max] })}
                className="text-golden-500 hover:text-golden-600 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
