import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import maplibregl from 'maplibre-gl';
import * as turf from '@turf/turf';
import {
  Ambulance as AmbulanceIcon,
  MapPin,
  Phone,
  AlertCircle,
  FileText,
  CreditCard,
  Clock,
  Heart,
  Upload,
  Send,
  Navigation,
  User,
  Stethoscope,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface AmbulanceType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  eta: string;
}

const ambulanceTypes: AmbulanceType[] = [
  {
    id: 'mo-ambulance',
    name: 'Mo Ambulance (Govt.)',
    description: 'Free government ambulance service',
    icon: <AmbulanceIcon className="h-6 w-6 text-green-500" />,
    price: 'Free',
    eta: '10-15 min'
  },
  {
    id: 'red-ambulance',
    name: 'Red Ambulance',
    description: 'Critical & Trauma Care equipped',
    icon: <AmbulanceIcon className="h-6 w-6 text-red-500" />,
    price: 'Free',
    eta: '8-12 min'
  },
  {
    id: 'private',
    name: 'Private Ambulance',
    description: 'Premium service with advanced equipment',
    icon: <AmbulanceIcon className="h-6 w-6 text-purple-500" />,
    price: '₹1500',
    eta: '12-15 min'
  },
  {
    id: 'neonatal',
    name: 'Neonatal/Pediatric',
    description: 'Specialized care for infants and children',
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    price: '₹2000',
    eta: '15-20 min'
  },
  {
    id: 'air',
    name: 'Air Ambulance',
    description: 'For extreme emergencies (subject to availability)',
    icon: <AmbulanceIcon className="h-6 w-6 text-blue-500" />,
    price: 'On request',
    eta: '30-45 min'
  }
];

export function Ambulance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    condition: '',
    priority: 'non-emergency'
  });
  const [isTracking, setIsTracking] = useState(false);
  const [ambulanceLocation, setAmbulanceLocation] = useState<Location | null>(null);
  const [eta, setEta] = useState<string>('');
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          initializeMap(location);
        },
        (error) => {
          toast.error('Unable to get your location. Please enable location services.');
        }
      );
    }
  }, []);

  const initializeMap = (location: Location) => {
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
        center: [location.lng, location.lat],
        zoom: 14
      });

      // Add user marker
      new maplibregl.Marker({ color: '#FF0000' })
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);

      map.current.addControl(new maplibregl.NavigationControl());
    }
  };

  const simulateAmbulanceMovement = () => {
    if (!userLocation || !ambulanceLocation) return;

    const line = turf.lineString([
      [ambulanceLocation.lng, ambulanceLocation.lat],
      [userLocation.lng, userLocation.lat]
    ]);

    const distance = turf.length(line, { units: 'kilometers' });
    const steps = 100;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(interval);
        setIsTracking(false);
        toast.success('Ambulance has arrived!');
        return;
      }

      const along = turf.along(line, (distance * currentStep) / steps, { units: 'kilometers' });
      setAmbulanceLocation({
        lng: along.geometry.coordinates[0],
        lat: along.geometry.coordinates[1]
      });

      const remainingDistance = distance * (1 - currentStep / steps);
      setEta(`${Math.round(remainingDistance * 2)} minutes`);

      currentStep++;
    }, 1000);
  };

  const handleEmergencyRequest = () => {
    if (!selectedType || !patientDetails.name || !patientDetails.condition) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate ambulance dispatch
    setIsTracking(true);
    setAmbulanceLocation({
      lat: userLocation!.lat + 0.02,
      lng: userLocation!.lng + 0.02
    });
    simulateAmbulanceMovement();

    toast.success('Emergency request sent! Ambulance is on the way.');
    setCurrentStep(3);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  const handleSOS = () => {
    toast.error('SOS alert sent! Emergency services have been notified of increased urgency.', {
      duration: 5000
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Emergency Ambulance Service
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Quick and reliable emergency medical transportation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Step 1: Location & Type Selection */}
            <div className={`bg-white p-6 rounded-lg shadow-lg ${currentStep === 1 ? '' : 'opacity-50'}`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <MapPin className="h-6 w-6 text-purple-600 mr-2" />
                Step 1: Location & Ambulance Type
              </h2>
              
              <div className="space-y-4">
                {/* Location Display */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Your Location:</p>
                  <p className="font-medium">
                    {userLocation 
                      ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                      : 'Detecting location...'}
                  </p>
                </div>

                {/* Ambulance Type Selection */}
                <div className="grid gap-4">
                  {ambulanceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 border rounded-lg flex items-center justify-between transition-colors
                        ${selectedType === type.id 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-300'}`}
                    >
                      <div className="flex items-center">
                        {type.icon}
                        <div className="ml-4">
                          <h3 className="font-medium">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-purple-600">{type.price}</p>
                        <p className="text-sm text-gray-600">ETA: {type.eta}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => selectedType && setCurrentStep(2)}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Step 2: Patient Details */}
            <div className={`bg-white p-6 rounded-lg shadow-lg ${currentStep === 2 ? '' : 'opacity-50'}`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="h-6 w-6 text-purple-600 mr-2" />
                Step 2: Patient Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    value={patientDetails.name}
                    onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Medical Condition</label>
                  <textarea
                    value={patientDetails.condition}
                    onChange={(e) => setPatientDetails({...patientDetails, condition: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                  <select
                    value={patientDetails.priority}
                    onChange={(e) => setPatientDetails({...patientDetails, priority: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  >
                    <option value="non-emergency">Non-Emergency</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Medical Reports (Optional)</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100"
                  />
                </div>

                <button
                  onClick={handleEmergencyRequest}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Request Ambulance
                </button>
              </div>
            </div>

            {/* Step 3: Tracking */}
            {isTracking && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Navigation className="h-6 w-6 text-purple-600 mr-2" />
                  Ambulance Tracking
                </h2>

                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600">Estimated Time of Arrival</p>
                        <p className="text-2xl font-bold">{eta}</p>
                      </div>
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>

                  <button
                    onClick={handleSOS}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Send SOS Alert
                  </button>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Driver Contact</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Ambulance Driver</p>
                      <button className="flex items-center text-purple-600">
                        <Phone className="h-5 w-5 mr-1" />
                        Call Driver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Map */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div ref={mapContainer} className="w-full h-[calc(100vh-200px)]" />
          </div>
        </div>
      </div>
    </div>
  );
}