import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bed, Bath, Car, Square, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import PropertyGallery from "../components/PropertyGallery";
import ContactCard from "../components/ContactCard";
import { supabase } from "../lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

// A interface Realtor agora representa a tabela 'corretores'
interface Realtor {
  id: string;
  name: string;
  creci: string;
  photo: string;
  phone: string;
  whatsapp: string;
}

// Definindo a interface Property aqui, já que o arquivo data/properties foi removido.
export interface Property {
  id: string;
  title: string;
  location: {
    neighborhood: string;
    city: string;
    state:string;
  };
  price: number;
  condominiumFee?: number;
  iptu?: number;
  areas: {
    useful: number;
    total?: number;
  };
  rooms: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces?: number;
  };
  description: string;
  amenities?: string[];
  condominiumFeatures?: string[];
  images: string[];
  realtor: Realtor; // A propriedade realtor agora é um objeto Realtor
  propertyType?: string;
  corretor_id?: string; // ID da chave estrangeira
}

// Função para mapear um único objeto do Supabase
const mapSingleSupabaseToProperty = (p: any): Property => {
  return {
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
    realtor: p.corretores, // Mapeando o objeto aninhado 'corretores'
    propertyType: p.property_type,
    corretor_id: p.corretor_id,
  };
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      setLoading(true);
      // Consulta atualizada para buscar dados da tabela 'corretores'
      const { data, error } = await supabase
        .from('imoveis')
        .select(`
          *,
          corretores(*)
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error("Imóvel não encontrado:", error);
        setProperty(null);
      } else {
        setProperty(mapSingleSupabaseToProperty(data));
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-[500px] w-full rounded-lg" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full sticky top-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-graphite-900 mb-4">Imóvel não encontrado</h1>
          <p className="text-graphite-600 mb-6">O imóvel que você está procurando não existe ou foi removido.</p>
          <Link to="/imoveis" className="text-golden-500 hover:text-golden-600">
            <ArrowLeft className="inline-block h-4 w-4 mr-2" />
            Voltar para a listagem
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
    if (area === 0) return 'N/A';
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <section>
              <PropertyGallery images={property.images} title={property.title} />
            </section>
            
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
                <div className="text-2xl font-bold text-graphite-900">{property.areas.useful} m²</div>
                <div className="text-sm text-graphite-600">Área útil</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Bed className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.bedrooms}</div>
                <div className="text-sm text-graphite-600">Quarto(s)</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Bath className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.bathrooms}</div>
                <div className="text-sm text-graphite-600">Banheiro(s)</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <Car className="h-6 w-6 text-golden-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-graphite-900">{property.rooms.parkingSpaces}</div>
                <div className="text-sm text-graphite-600">Vaga(s)</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-graphite-900 mb-4">Descrição</h2>
              <p className="text-graphite-700 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-graphite-900 mb-4">Diferenciais</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-graphite-700">
                      <div className="w-2 h-2 bg-golden-500 rounded-full mr-3 flex-shrink-0"></div>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Condominium Features */}
            {property.condominiumFeatures && property.condominiumFeatures.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-graphite-900 mb-4">Estrutura do Condomínio</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {property.condominiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-graphite-700">
                      <div className="w-2 h-2 bg-golden-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Price and Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-graphite-900 mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-graphite-600">
                    {formatPricePerMeter(property.price, property.areas.useful)}/m²
                  </div>
                </div>
                
                {property.condominiumFee > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-graphite-600">Condomínio</span>
                      <span className="font-semibold text-graphite-900">
                        {formatPrice(property.condominiumFee)}
                      </span>
                    </div>
                  </div>
                )}
                
                {property.iptu > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                     <div className="flex justify-between items-center">
                        <span className="text-graphite-600">IPTU</span>
                        <span className="font-semibold text-graphite-900">
                          {formatPrice(property.iptu)}
                        </span>
                      </div>
                  </div>
                )}
              </div>

              {/* Contact Card */}
              <ContactCard realtor={property.realtor} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
