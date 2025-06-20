import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertySearchProps {
  onSearch?: (filters: SearchFilters) => void;
  showAdvancedFilters?: boolean;
}

interface SearchFilters {
  query: string;
  propertyType: string;
  location: string;
  priceRange: string;
}

const PropertySearch = ({ onSearch, showAdvancedFilters = true }: PropertySearchProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    propertyType: "",
    location: "",
    priceRange: ""
  });
  const [isSearching, setIsSearching] = useState(false);

  // Otimização otimista: atualiza o estado imediatamente
  const handleQueryChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
  }, []);

  const handlePropertyTypeChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, propertyType: value }));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
  }, []);

  const handlePriceRangeChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  }, []);

  // Função de busca otimista
  const handleSearch = useCallback(async () => {
    // Feedback visual imediato (otimização otimista)
    setIsSearching(true);

    try {
      if (onSearch) {
        await onSearch(filters);
      } else {
        // Navigate to properties page with search params
        const searchParams = new URLSearchParams();
        if (filters.query) searchParams.set('q', filters.query);
        if (filters.propertyType) searchParams.set('tipo', filters.propertyType);
        if (filters.location) searchParams.set('local', filters.location);
        if (filters.priceRange) searchParams.set('preco', filters.priceRange);
        
        navigate(`/imoveis?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      // Em caso de erro, mantemos o estado otimista mas logamos o erro
    } finally {
      setIsSearching(false);
    }
  }, [filters, onSearch, navigate]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Memoização dos filtros para evitar re-renders desnecessários
  const hasActiveFilters = useMemo(() => {
    return filters.query || filters.propertyType || filters.location || filters.priceRange;
  }, [filters]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      {/* Filtros superiores - 3 colunas iguais */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Property Type */}
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Select value={filters.propertyType} onValueChange={handlePropertyTypeChange}>
              <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-golden-500 text-gray-900 placeholder:text-gray-500">
                <SelectValue placeholder="Tipo de Imóvel" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Select value={filters.location} onValueChange={handleLocationChange}>
              <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-golden-500 text-gray-900 placeholder:text-gray-500">
                <SelectValue placeholder="Região Desejada" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="centro">Centro</SelectItem>
                <SelectItem value="vila-galvao">Vila Galvão</SelectItem>
                <SelectItem value="jardim-maia">Jardim Maia</SelectItem>
                <SelectItem value="macedo">Macedo</SelectItem>
                <SelectItem value="vila-augusta">Vila Augusta</SelectItem>
                <SelectItem value="picanco">Picanço</SelectItem>
                <SelectItem value="gopouva">Gopoúva</SelectItem>
                <SelectItem value="cumbica">Cumbica</SelectItem>
                <SelectItem value="parque-cecap">Parque Cecap</SelectItem>
                <SelectItem value="torres-tibagy">Torres Tibagy</SelectItem>
                <SelectItem value="ponte-grande">Ponte Grande</SelectItem>
                <SelectItem value="vila-rosalia">Vila Rosália</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Select value={filters.priceRange} onValueChange={handlePriceRangeChange}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-golden-500 text-gray-900 placeholder:text-gray-500">
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
                <SelectItem value="500000-800000">R$ 500.000 - R$ 800.000</SelectItem>
                <SelectItem value="800000-1200000">R$ 800.000 - R$ 1.200.000</SelectItem>
                <SelectItem value="1200000+">Acima de R$ 1.200.000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Campo de busca principal - tamanho grande */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Digite condomínio, região, bairro ou cidade"
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 border-gray-300 focus:border-golden-500 focus:ring-golden-500 text-gray-900 placeholder:text-gray-500"
            disabled={isSearching}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
          disabled={isSearching}
        >
          <Filter className="h-4 w-4 mr-2" />
          Mais filtros
        </Button>

        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className={`px-8 py-3 h-12 text-lg font-semibold transition-all duration-200 ${
            isSearching 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-graphite-900 hover:bg-graphite-800 text-white'
          }`}
        >
          {isSearching ? 'Buscando...' : 'Encontrar imóvel'}
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
