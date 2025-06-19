
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bed, Bath, Car, Square, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertyGallery from "../components/PropertyGallery";
import ContactCard from "../components/ContactCard";
import { properties } from "../data/properties";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-graphite-900 mb-4">Imóvel não encontrado</h1>
          <Link to="/imoveis" className="text-golden-500 hover:text-golden-600">
            Voltar para listagem
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatPricePerMeter = (price: number, area: number) => {
    const pricePerMeter = price / area;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(pricePerMeter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/imoveis" 
            className="inline-flex items-center text-golden-500 hover:text-golden-600 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para imóveis
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />
            
            {/* Title and Location */}
            <div>
              <h1 className="text-3xl font-bold text-graphite-900 mb-4">
                {property.title}
              </h1>
              <div className="flex items-center text-graphite-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">
                  {property.location.neighborhood}, {property.location.city} - {property.location.state}
                </span>
              </div>
            </div>

            {/* Property Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Square className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.areas.useful}</div>
                <div className="text-sm text-graphite-600">Área útil</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Bed className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.bedrooms}</div>
                <div className="text-sm text-graphite-600">Quartos</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Bath className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.bathrooms}</div>
                <div className="text-sm text-graphite-600">Banheiros</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Car className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.parkingSpaces}</div>
                <div className="text-sm text-graphite-600">Vagas</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-graphite-900 mb-4">Descrição</h2>
              <p className="text-graphite-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-graphite-900 mb-4">Diferenciais</h2>
              <ul className="space-y-2">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-graphite-700">
                    <div className="w-2 h-2 bg-golden-500 rounded-full mr-3"></div>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Condominium Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-graphite-900 mb-4">Estrutura do Condomínio</h2>
              <ul className="space-y-2">
                {property.condominiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-graphite-700">
                    <div className="w-2 h-2 bg-golden-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-graphite-900 mb-2">
                  {formatPrice(property.price)}
                </div>
                <div className="text-sm text-graphite-600">
                  {formatPricePerMeter(property.price, property.areas.useful)}/m²
                </div>
              </div>
              
              {property.condominiumFee && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-graphite-600">Condomínio</span>
                    <span className="font-semibold text-graphite-900">
                      {formatPrice(property.condominiumFee)}
                    </span>
                  </div>
                </div>
              )}
              
              {property.iptu && (
                <div className="flex justify-between items-center mb-6">
                  <span className="text-graphite-600">IPTU</span>
                  <span className="font-semibold text-graphite-900">
                    {formatPrice(property.iptu)}
                  </span>
                </div>
              )}
              
              <button className="w-full bg-golden-500 text-white py-3 px-4 rounded-md hover:bg-golden-600 transition-colors duration-200 font-semibold text-lg mb-4">
                Quero mais informações
              </button>
              
              <div className="text-center text-sm text-graphite-600">
                Atendimento imediato
              </div>
            </div>

            {/* Contact Card */}
            <ContactCard realtor={property.realtor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
