import { MessageCircle, Phone } from "lucide-react";

// Removida a importação de Property, já que a interface do corretor será definida aqui.
interface Realtor {
  name: string;
  creci: string;
  photo: string;
  phone: string;
  whatsapp: string;
}

interface ContactCardProps {
  realtor: Realtor;
}

const ContactCard = ({ realtor }: ContactCardProps) => {
  // Número de telefone e WhatsApp fixo
  const contactNumber = "+5511943116940";
  const whatsappMessage = encodeURIComponent("Olá! Tenho interesse em um dos imóveis anunciados e gostaria de mais informações.");

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-graphite-900 mb-4">Fale com um corretor</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={realtor.photo} 
          alt={realtor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-graphite-900">{realtor.name}</h4>
          <p className="text-sm text-graphite-600">{realtor.creci}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <a
          href={`https://wa.me/${contactNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>
        
        <a
          href={`tel:${contactNumber}`}
          className="w-full bg-golden-500 text-white py-3 px-4 rounded-md hover:bg-golden-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
        >
          <Phone className="h-5 w-5" />
          <span>Ligar</span>
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
