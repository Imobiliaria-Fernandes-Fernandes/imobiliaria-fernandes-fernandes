import { Link } from "react-router-dom";
import { Bed, Bath, Car, MapPin } from "lucide-react";

// Definindo a interface Property diretamente no arquivo
export interface Property {
  id: string;
  title: string;
  bairros: {
    name: string;
    city: string;
    state: string;
  };
  price: number;
  images: string[];
  rooms: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces?: number;
  };
  areas: {
    useful: number;
  };
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-golden-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatPrice(property.price)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-graphite-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-graphite-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.bairros.name}, {property.bairros.city} - {property.bairros.state}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-graphite-600 mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.rooms.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.rooms.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.rooms.parkingSpaces}</span>
          </div>
          <div className="text-sm">
            {property.areas.useful}m²
          </div>
        </div>
        
        <Link 
          to={`/imoveis/${property.id}`}
          className="w-full bg-golden-500 text-white py-2 px-4 rounded-md hover:bg-golden-600 transition-colors duration-200 font-medium text-center block"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
