import { Ambulance, Guitar as Hospital, Calendar, Phone, Clock, Shield, Users, Award, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openChat } from './ChatWidget';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export function Hero() {
  const handleEmergency = () => {
    openChat();
  };

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const stats = [
    { label: 'Partner Hospitals', value: '50', suffix: '+' },
    { label: 'Doctors', value: '500', suffix: '+' },
    { label: 'Monthly Patients', value: '10000', suffix: '+' },
    { label: 'Emergency Response', prefix: '<', value: '10', suffix: ' min' }
  ];

  const features = [
    {
      icon: <Hospital className="h-6 w-6 text-purple-600" />,
      title: 'Top Hospitals',
      description: 'Access to the best healthcare facilities in Odisha'
    },
    {
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      title: 'Quick Appointments',
      description: 'Book appointments instantly with preferred specialists'
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock emergency medical assistance'
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: 'Verified Doctors',
      description: 'All doctors are verified and highly qualified'
    }
  ];

  const emergencyNumbers = [
    { name: 'National Emergency Number', number: '112', description: 'All-in-one emergency response' },
    { name: 'Ambulance', number: '108', description: 'Emergency medical services' },
    { name: 'COVID-19 Helpline', number: '1075', description: 'COVID-19 related emergencies' },
    { name: 'Police', number: '100', description: 'Law enforcement emergency' },
    { name: 'Fire', number: '101', description: 'Fire emergency services' },
    { name: 'Women Helpline', number: '1091', description: 'Women safety emergency' },
    { name: 'Child Helpline', number: '1098', description: 'Child safety emergency' },
    { name: 'Senior Citizen Helpline', number: '14567', description: 'Elder care emergency' }
  ];

  return (
    <>
      {/* Hero Section with better mobile responsiveness */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Emergency Healthcare</span>
                  <span className="block text-purple-600 mt-2">When You Need It Most</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Instant access to emergency services, hospital information, and real-time healthcare assistance across Odisha.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow w-full sm:w-auto">
                    <button
                      onClick={handleEmergency}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors md:py-4 md:text-lg md:px-10"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Emergency Help
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
                    <Link 
                      to="/hospitals" 
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors md:py-4 md:text-lg md:px-10"
                    >
                      Find Hospitals
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Emergency healthcare"
          />
        </div>
      </div>

      {/* Stats Section with improved mobile layout */}
      <div className="bg-purple-900 py-12" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-purple-800 rounded-lg">
                <div className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {inView ? (
                    <CountUp
                      start={0}
                      end={Number(stat.value)}
                      duration={2.5}
                      separator=","
                    />
                  ) : (
                    '0'
                  )}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="mt-2 text-purple-200 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section with better spacing on mobile */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose PRANA?</h2>
            <p className="mt-4 text-xl text-gray-600">Comprehensive healthcare solutions at your fingertips</p>
          </div>
          <div className="mt-12 sm:mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center items-center w-12 h-12 mx-auto bg-purple-100 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Numbers Section with improved grid layout */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Emergency Numbers in India</h2>
            <p className="mt-4 text-xl text-gray-600">Important helpline numbers for immediate assistance</p>
          </div>
          <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyNumbers.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{service.name}</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-red-600">{service.number}</span>
                  <span className="text-sm text-gray-600 mt-2">{service.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with improved mobile layout */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <Hospital className="h-8 w-8 text-purple-500" />
                <span className="ml-2 text-2xl font-bold text-white">PRANA</span>
              </div>
              <p className="mt-4 text-gray-400">
                Emergency healthcare services when you need them most. Available 24/7 across Odisha.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Quick Links</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li><Link to="/hospitals" className="text-gray-400 hover:text-white transition-colors">Find Hospitals</Link></li>
                <li><Link to="/appointments" className="text-gray-400 hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/ambulance" className="text-gray-400 hover:text-white transition-colors">Ambulance Service</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-center sm:justify-start text-gray-400">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                  Bhubaneswar, Odisha, India
                </li>
                <li className="flex items-center justify-center sm:justify-start text-gray-400">
                  <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                  Emergency: 108
                </li>
                <li className="flex items-center justify-center sm:justify-start text-gray-400">
                  <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                  support@prana.org
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center sm:text-left">Follow Us</h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-6">
                <button 
                  onClick={handleEmergency} 
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Help
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 PRANA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}