import React, { useState, useEffect, useRef } from 'react';
import { Building2, Phone, Clock, Stethoscope, MapPin, Search, Navigation, Info } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const hospitals = [
  {
    id: 1,
    name: "AIIMS Bhubaneswar",
    address: "Sijua, Patrapada, Bhubaneswar, Odisha 751019",
    phone: "0674-2476789",
    specialties: ["Multi-Specialty", "Emergency Care", "Trauma Center"],
    type: "Government",
    coordinates: { lat: 20.2987, lng: 85.8144 },
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    address: "Plot No. 251, Sainik School Rd, Unit-15, Bhubaneswar, Odisha 751005",
    phone: "0674-6661016",
    specialties: ["Cardiology", "Neurology", "Oncology"],
    type: "Private",
    coordinates: { lat: 20.2721, lng: 85.8261 },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 3,
    name: "Capital Hospital",
    address: "Unit-6, Bhubaneswar, Odisha 751001",
    phone: "0674-2391983",
    specialties: ["General Medicine", "Emergency Care"],
    type: "Government",
    coordinates: { lat: 20.2696, lng: 85.8393 },
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 4,
    name: "KIMS Hospital",
    address: "KIIT Road, Patia, Bhubaneswar, Odisha 751024",
    phone: "0674-2725732",
    specialties: ["Multi-Specialty", "Cardiology", "Neurosurgery"],
    type: "Private",
    coordinates: { lat: 20.3549, lng: 85.8144 },
    image: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 5,
    name: "SUM Ultimate Medicare",
    address: "Kalinga Nagar, Bhubaneswar, Odisha 751003",
    phone: "0674-2970333",
    specialties: ["Multi-Specialty", "Orthopedics", "Gastroenterology"],
    type: "Private",
    coordinates: { lat: 20.3075, lng: 85.8235 },
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 6,
    name: "SCB Medical College",
    address: "Mangalabag, Cuttack, Odisha 753007",
    phone: "0671-2414080",
    specialties: ["Multi-Specialty", "Medical Education", "Research"],
    type: "Government",
    coordinates: { lat: 20.4686, lng: 85.8792 },
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 7,
    name: "Kalinga Institute of Medical Sciences",
    address: "KIIT Road, Patia, Bhubaneswar, Odisha 751024",
    phone: "0674-2725215",
    specialties: ["Multi-Specialty", "Medical Education", "Advanced Surgery"],
    type: "Private",
    coordinates: { lat: 20.3548, lng: 85.8143 },
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 8,
    name: "Hi-Tech Medical College & Hospital",
    address: "Health Park, Pandara, Bhubaneswar, Odisha 751025",
    phone: "0674-2371438",
    specialties: ["Multi-Specialty", "Emergency Care", "Medical Education"],
    type: "Private",
    coordinates: { lat: 20.2908, lng: 85.8395 },
    image: "https://images.unsplash.com/photo-1580281657702-257584fb0d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 9,
    name: "Utkal Institute of Medical Sciences",
    address: "NH-5, Mouza, Bhubaneswar, Odisha 751019",
    phone: "0674-2580936",
    specialties: ["General Medicine", "Surgery", "Pediatrics"],
    type: "Private",
    coordinates: { lat: 20.2989, lng: 85.8235 },
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 10,
    name: "Aditya Care Hospital",
    address: "Plot No. 329/1929, Chandrasekharpur, Bhubaneswar, Odisha 751016",
    phone: "0674-2303999",
    specialties: ["Emergency Care", "Cardiology", "Neurology"],
    type: "Private",
    coordinates: { lat: 20.3075, lng: 85.8192 },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 11,
    name: "Blue Wheel Hospital",
    address: "Plot No. 41, Gautam Nagar, Bhubaneswar, Odisha 751014",
    phone: "0674-2431403",
    specialties: ["General Medicine", "Orthopedics", "Gynecology"],
    type: "Private",
    coordinates: { lat: 20.2928, lng: 85.8441 },
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 12,
    name: "Kar Clinic & Hospital",
    address: "Plot No. 328, Rasulgarh, Bhubaneswar, Odisha 751010",
    phone: "0674-2580981",
    specialties: ["Multi-Specialty", "Cardiology", "Nephrology"],
    type: "Private",
    coordinates: { lat: 20.2986, lng: 85.8527 },
    image: "https://images.unsplash.com/photo-1580281657702-257584fb0d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 13,
    name: "Maitri Hospital",
    address: "Plot No. 1242/2176, Chandrasekharpur, Bhubaneswar, Odisha 751016",
    phone: "0674-2744044",
    specialties: ["General Medicine", "Surgery", "Emergency Care"],
    type: "Private",
    coordinates: { lat: 20.3128, lng: 85.8199 },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 14,
    name: "City Hospital",
    address: "Plot No. 360, Saheed Nagar, Bhubaneswar, Odisha 751007",
    phone: "0674-2547866",
    specialties: ["Emergency Care", "General Medicine", "Pediatrics"],
    type: "Private",
    coordinates: { lat: 20.2898, lng: 85.8439 },
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 15,
    name: "Sparsh Hospital",
    address: "Plot No. 1797/2138, Bomikhal, Bhubaneswar, Odisha 751010",
    phone: "0674-2580666",
    specialties: ["Orthopedics", "Physiotherapy", "Sports Medicine"],
    type: "Private",
    coordinates: { lat: 20.2856, lng: 85.8527 },
    image: "https://images.unsplash.com/photo-1580281657702-257584fb0d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  }
];

export function Hospitals() {
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [popupContent, setPopupContent] = useState<string>("");

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || hospital.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getGoogleMapsUrl = (hospital: typeof hospitals[0]) => {
    const query = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: [85.8245, 20.2961],
        zoom: 12
      });

      map.current.addControl(new maplibregl.NavigationControl());

      // Add markers for hospitals
      hospitals.forEach((hospital) => {
        const marker = new maplibregl.Marker({ color: hospital.type === 'Government' ? '#22c55e' : '#7c3aed' })
          .setLngLat([hospital.coordinates.lng, hospital.coordinates.lat])
          .setPopup(new maplibregl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${hospital.name}</h3>
              <p class="text-sm text-gray-600">${hospital.address}</p>
            </div>
          `))
          .addTo(map.current!);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Hospitals in Bhubaneswar
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find the best healthcare facilities in Bhubaneswar, Odisha
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search hospitals or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${filterType === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${filterType === 'government' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilterType('government')}
            >
              Government
            </button>
            <button
              className={`px-4 py-2 rounded-md ${filterType === 'private' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilterType('private')}
            >
              Private
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
          <div ref={mapContainer} className="w-full h-[400px]" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={hospital.image}
                alt={hospital.name}
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    hospital.type === 'Government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {hospital.type}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-gray-600 text-sm">{hospital.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-gray-600 text-sm">{hospital.phone}</p>
                  </div>
                  <div className="flex items-start">
                    <Stethoscope className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a
                      href={getGoogleMapsUrl(hospital)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                    <button
                      onClick={() => setSelectedHospital(hospital)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-purple-600 text-sm font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Get Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}