import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PropertySearchProps {
  onSearch?: (filters: SearchFilters) => void;
  showAdvancedFilters?: boolean;
  minPrice?: number;
  maxPrice?: number;
  value?: SearchFilters;
}

interface SearchFilters {
  query: string;
  propertyType: string;
  location: string;
  priceRange: [number, number];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);
};

const PropertySearch = ({ 
  onSearch, 
  showAdvancedFilters = true,
  minPrice = 0,
  maxPrice = 2000000,
  value,
}: PropertySearchProps) => {
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<SearchFilters>(value || {
    query: "",
    propertyType: "",
    location: "",
    priceRange: [minPrice, maxPrice]
  });
  
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value) {
      setFilters(value);
    }
  }, [value]);

  const handleSearch = useCallback(async (currentFilters = filters) => {
    setIsSearching(true);
    try {
      if (onSearch) {
        await onSearch(currentFilters);
      } else {
        const searchParams = new URLSearchParams();
        if (currentFilters.query) searchParams.set('q', currentFilters.query);
        if (currentFilters.propertyType) searchParams.set('tipo', currentFilters.propertyType);
        if (currentFilters.location) searchParams.set('local', currentFilters.location);
        if (currentFilters.priceRange[0] > minPrice) searchParams.set('min_price', currentFilters.priceRange[0].toString());
        if (currentFilters.priceRange[1] < maxPrice) searchParams.set('max_price', currentFilters.priceRange[1].toString());
        
        navigate(`/imoveis?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setTimeout(() => setIsSearching(false), 300);
    }
  }, [filters, onSearch, navigate, minPrice, maxPrice]);

  useEffect(() => {
    const initialRender = filters.propertyType === "" && filters.location === "";
    if (!initialRender) {
      handleSearch();
    }
  }, [filters.propertyType, filters.location]);

  const handleQueryChange = (value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
  };

  const handlePropertyTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, propertyType: value }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };
  
  const handlePriceRangeCommit = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value };
    handleSearch(newFilters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full gap-2">
      <div className="flex-grow flex items-center border border-gray-200 rounded-full shadow-sm h-20 bg-white overflow-hidden">
        
        <div className="flex-auto px-6 py-2">
          <label htmlFor="search-query" className="block text-xs font-bold text-gray-800 mb-1">Busca</label>
          <Input
            id="search-query"
            type="text"
            placeholder="Condomínio, bairro..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full border-none focus:ring-0 p-0 h-auto text-sm text-gray-900 placeholder:text-gray-500 bg-transparent"
            disabled={isSearching}
          />
        </div>

        <div className="h-12 w-px bg-gray-200" />

        <div className="w-52 px-5 py-2">
          <label className="block text-xs font-bold text-gray-800 mb-1">Tipo</label>
          <Select value={filters.propertyType} onValueChange={handlePropertyTypeChange} disabled={isSearching}>
            <SelectTrigger className="w-full border-none focus:ring-0 p-0 h-auto text-sm bg-transparent text-left text-gray-900 data-[placeholder]:text-gray-500 [&>span]:line-clamp-1">
              <SelectValue placeholder="Tipo de Imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="cobertura">Cobertura</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-12 w-px bg-gray-200" />
        
        <div className="w-52 px-5 py-2">
          <label className="block text-xs font-bold text-gray-800 mb-1">Região</label>
          <Select value={filters.location} onValueChange={handleLocationChange} disabled={isSearching}>
            <SelectTrigger className="w-full border-none focus:ring-0 p-0 h-auto text-sm bg-transparent text-left text-gray-900 data-[placeholder]:text-gray-500 [&>span]:line-clamp-1">
              <SelectValue placeholder="Região Desejada" />
            </SelectTrigger>
            <SelectContent>
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

        <div className="h-12 w-px bg-gray-200" />

        <div className="w-72 px-5 py-2">
          <label className="block text-xs font-bold text-gray-800 mb-1">Preço</label>
          <div className="w-full">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              min={minPrice}
              max={maxPrice}
              step={10000}
              disabled={isSearching}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{formatCurrency(filters.priceRange[0])}</span>
              <span>{formatCurrency(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        <div className="pr-2 py-2">
           <Button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className={`rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              isSearching 
                ? 'bg-gray-400 cursor-not-allowed animate-pulse' 
                : 'bg-golden-500 hover:bg-golden-600 text-white'
            }`}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
