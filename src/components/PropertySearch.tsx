
import { useState } from "react";
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

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to properties page with search params
      const searchParams = new URLSearchParams();
      if (filters.query) searchParams.set('q', filters.query);
      if (filters.propertyType) searchParams.set('tipo', filters.propertyType);
      if (filters.location) searchParams.set('local', filters.location);
      if (filters.priceRange) searchParams.set('preco', filters.priceRange);
      
      navigate(`/imoveis?${searchParams.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Digite condomínio, região, bairro ou cidade"
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 border-gray-300 focus:border-golden-500 focus:ring-golden-500"
          />
        </div>

        {/* Property Type */}
        {showAdvancedFilters && (
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
              <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-golden-500">
                <SelectValue placeholder="Tipo imóvel" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Location */}
        {showAdvancedFilters && (
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-golden-500">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="sao-paulo">São Paulo</SelectItem>
                <SelectItem value="campinas">Campinas</SelectItem>
                <SelectItem value="santos">Santos</SelectItem>
                <SelectItem value="abc">ABC Paulista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Price Range */}
          <div>
            <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-golden-500">
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
                <SelectItem value="500000-800000">R$ 500.000 - R$ 800.000</SelectItem>
                <SelectItem value="800000-1200000">R$ 800.000 - R$ 1.200.000</SelectItem>
                <SelectItem value="1200000+">Acima de R$ 1.200.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filter Buttons */}
          <div className="md:col-span-2 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-golden-50 hover:border-golden-300">
              Busca por código
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-golden-50 hover:border-golden-300">
              Galpões
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-golden-50 hover:border-golden-300">
              Permuta
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-golden-50 hover:border-golden-300">
              Promoção
            </Button>
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-golden-50 hover:border-golden-300">
              Lançamentos
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Mais filtros
        </Button>

        <Button
          onClick={handleSearch}
          className="bg-graphite-900 hover:bg-graphite-800 text-white px-8 py-3 h-12 text-lg font-semibold"
        >
          Encontrar imóvel
        </Button>
      </div>
    </div>
  );
};

export default PropertySearch;
