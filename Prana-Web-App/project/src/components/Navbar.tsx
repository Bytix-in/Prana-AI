import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { openChat } from './ChatWidget';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleEmergency = () => {
    openChat();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">PRANA</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/hospitals" 
              className="text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              Hospitals
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              to="/appointments" 
              className="text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              Appointments
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              to="/ambulance" 
              className="text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              Ambulance
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link 
              to="/profile" 
              className="text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              Profile
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <button 
              onClick={handleEmergency}
              className="bg-red-600 text-white px-6 py-2 rounded-full flex items-center hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-700 hover:text-purple-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/hospitals" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              Hospitals
            </Link>
            <Link 
              to="/appointments" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              Appointments
            </Link>
            <Link 
              to="/ambulance" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              Ambulance
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              Profile
            </Link>
            <button 
              onClick={handleEmergency}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center mt-4 hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}