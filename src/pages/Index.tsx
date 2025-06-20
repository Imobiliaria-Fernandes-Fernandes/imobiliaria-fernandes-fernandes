import { useMemo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Key, Home, Upload } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertySearch from "../components/PropertySearch";
import NeighborhoodsSection from "../components/NeighborhoodsSection";
import { properties as localProperties } from "../data/properties";
import { supabase } from "../lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceRange = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_price_range');

      if (error || !data) {
        console.error("Erro ao buscar faixa de preço:", error);
        setPriceRange({ min: 0, max: 2000000 });
      } else {
        setPriceRange({ min: data.min_price, max: data.max_price });
      }
      setLoading(false);
    };

    fetchPriceRange();
  }, []);

  const navigate = useNavigate();

  const handleSearch = (filters: { query: string; propertyType: string; location: string; priceRange: [number, number]; }) => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.propertyType) params.set('tipo', filters.propertyType);
    if (filters.location) params.set('local', filters.location);
    
    if (filters.priceRange[0] > priceRange.min) {
      params.set('min_price', filters.priceRange[0].toString());
    }
    if (filters.priceRange[1] < priceRange.max) {
      params.set('max_price', filters.priceRange[1].toString());
    }

    navigate(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Search */}
      <section className="relative min-h-[80vh] bg-gradient-to-r from-graphite-900 to-graphite-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/ponte-guarulhos-noite.jpg')"
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 py-8">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-white drop-shadow-2xl">
              Seu novo <span className="text-golden-300">lar está aqui!</span>
            </h1>
            <p className="text-lg md:text-xl text-white drop-shadow-lg animate-fade-in">
              Encontre o imóvel dos seus sonhos
            </p>
          </div>

          {/* Search Component */}
          <div className="mb-8 animate-fade-in">
            {!loading && (
              <PropertySearch 
                onSearch={handleSearch} 
                showAdvancedFilters={true}
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
              />
            )}
            {loading && (
               <div className="max-w-4xl mx-auto">
                  <Skeleton className="h-16 w-full rounded-lg" />
               </div>
            )}
          </div>

          {/* Quick Action Button */}
          <div className="animate-fade-in">
            <Link 
              to="/imoveis"
              className="inline-flex items-center text-golden-300 hover:text-golden-200 transition-colors duration-300 text-lg font-medium drop-shadow-lg"
            >
              Ou explore todos os imóveis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <NeighborhoodsSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-graphite-900 mb-4">
              Por que escolher a Fernandes & Fernandes?
            </h2>
            <p className="text-xl text-graphite-600 max-w-2xl mx-auto">
              Sua parceira ideal na busca pelo imóvel dos seus sonhos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-golden-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-500 text-white rounded-full mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Portfólio Exclusivo</h3>
              <p className="text-graphite-600">
                Acesso aos melhores imóveis em localização privilegiada
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-golden-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-500 text-white rounded-full mb-4">
                <Key className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Atendimento Personalizado</h3>
              <p className="text-graphite-600">
                Corretores especializados para atender suas necessidades
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-golden-50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-500 text-white rounded-full mb-4">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-graphite-900 mb-2">Processo Simplificado</h3>
              <p className="text-graphite-600">
                Cuidamos de toda documentação e burocracia para você
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-golden-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-xl text-golden-100 mb-8">
            Explore nossa seleção de imóveis premium
          </p>
          <Link 
            to="/imoveis"
            className="inline-flex items-center bg-white text-golden-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Explorar Imóveis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-graphite-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/lovable-uploads/ac045336-68d1-4e78-a5d4-3fe2f9815489.png" 
              alt="Fernandes & Fernandes Logo" 
              className="h-6 w-auto"
            />
            <span className="text-xl font-bold">Imobiliária Fernandes & Fernandes</span>
          </div>
          <p className="text-gray-300">
            © 2024 Imobiliária Fernandes & Fernandes. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
