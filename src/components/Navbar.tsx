
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-golden-500" />
            <span className="text-xl font-bold text-graphite-900">Casa Dourada</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-graphite-700 hover:text-golden-500 transition-colors duration-200 font-medium"
            >
              Início
            </Link>
            <Link 
              to="/imoveis" 
              className="text-graphite-700 hover:text-golden-500 transition-colors duration-200 font-medium"
            >
              Imóveis
            </Link>
            <Link 
              to="/contato" 
              className="text-graphite-700 hover:text-golden-500 transition-colors duration-200 font-medium"
            >
              Contato
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-graphite-700 hover:text-golden-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
