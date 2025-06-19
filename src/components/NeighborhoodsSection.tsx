
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const neighborhoods = [
  {
    name: "Vila Madalena",
    city: "São Paulo",
    properties: 12,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
  },
  {
    name: "Jardins",
    city: "São Paulo", 
    properties: 8,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  },
  {
    name: "Moema",
    city: "São Paulo",
    properties: 15,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
  },
  {
    name: "Vila Olímpia",
    city: "São Paulo",
    properties: 9,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
  },
  {
    name: "Alphaville",
    city: "Barueri",
    properties: 6,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop"
  },
  {
    name: "Centro",
    city: "Campinas",
    properties: 11,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=300&fit=crop"
  }
];

const NeighborhoodsSection = () => {
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
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.name}
              to={`/imoveis?local=${encodeURIComponent(neighborhood.name)}`}
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
                      {neighborhood.properties} imóveis disponíveis
                    </span>
                    <span className="text-golden-500 font-medium text-sm group-hover:text-golden-600 transition-colors">
                      Ver imóveis →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodsSection;
