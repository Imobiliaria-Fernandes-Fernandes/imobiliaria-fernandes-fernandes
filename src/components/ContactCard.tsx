
import { MessageCircle, Phone } from "lucide-react";
import { Property } from "../data/properties";

interface ContactCardProps {
  realtor: Property['realtor'];
}

const ContactCard = ({ realtor }: ContactCardProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Tenho interesse no imóvel anunciado. Poderia me fornecer mais informações?");
    window.open(`https://wa.me/${realtor.whatsapp}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${realtor.phone}`, '_self');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-graphite-900 mb-4">Contato do Corretor</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={realtor.photo} 
          alt={realtor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-graphite-900">{realtor.name}</h4>
          <p className="text-sm text-graphite-600">{realtor.creci}</p>
          <p className="text-sm text-graphite-600">{realtor.phone}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </button>
        
        <button
          onClick={handlePhoneClick}
          className="w-full bg-golden-500 text-white py-3 px-4 rounded-md hover:bg-golden-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
        >
          <Phone className="h-5 w-5" />
          <span>Ligar</span>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
