import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Calendar,
  Building2,
  Filter,
  Video,
  Phone,
  Star,
  AlertCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface Doctor {
  id: number;
  name: string;
  experience: number;
  rating: number;
  image: string;
  fee: number;
}

interface Department {
  id: number;
  name: string;
  description: string;
  doctors: Doctor[];
  waitTime: string;
  fee: number;
}

interface Hospital {
  id: number;
  name: string;
  address: string;
  type: 'Government' | 'Private';
  rating: number;
  image: string;
  partnerSince: string;
  departments: Department[];
  facilities: string[];
  emergencyAvailable: boolean;
  telehealth: boolean;
}

const partneredHospitals: Hospital[] = [
  {
    id: 1,
    name: "AIIMS Bhubaneswar",
    address: "Sijua, Patrapada, Bhubaneswar, Odisha 751019",
    type: "Government",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    partnerSince: "2023",
    emergencyAvailable: true,
    telehealth: true,
    facilities: ["24/7 Emergency", "ICU", "Blood Bank", "Pharmacy", "Laboratory"],
    departments: [
      {
        id: 101,
        name: "Cardiology",
        description: "Advanced cardiac care and treatment",
        waitTime: "20-30 minutes",
        fee: 1000,
        doctors: [
          {
            id: 1,
            name: "Dr. Priya Sharma",
            experience: 15,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            fee: 1000
          }
        ]
      },
      {
        id: 102,
        name: "Neurology",
        description: "Specialized neurological treatments",
        waitTime: "30-40 minutes",
        fee: 1200,
        doctors: [
          {
            id: 2,
            name: "Dr. Rajesh Kumar",
            experience: 20,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            fee: 1200
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Apollo Hospitals",
    address: "Plot No. 251, Sainik School Rd, Bhubaneswar",
    type: "Private",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    partnerSince: "2024",
    emergencyAvailable: true,
    telehealth: true,
    facilities: ["24/7 Emergency", "ICU", "Cath Lab", "Pharmacy", "Laboratory"],
    departments: [
      {
        id: 201,
        name: "Orthopedics",
        description: "Complete bone and joint care",
        waitTime: "15-20 minutes",
        fee: 1500,
        doctors: [
          {
            id: 3,
            name: "Dr. Amit Patel",
            experience: 12,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            fee: 1500
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "KIMS Hospital",
    address: "KIIT Road, Patia, Bhubaneswar",
    type: "Private",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    partnerSince: "2023",
    emergencyAvailable: true,
    telehealth: true,
    facilities: ["24/7 Emergency", "ICU", "Dialysis", "Pharmacy"],
    departments: [
      {
        id: 301,
        name: "General Medicine",
        description: "Primary healthcare services",
        waitTime: "10-15 minutes",
        fee: 800,
        doctors: [
          {
            id: 4,
            name: "Dr. Sanjay Mohanty",
            experience: 10,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
            fee: 800
          }
        ]
      }
    ]
  }
];

export function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    medicalHistory: "",
    isEmergency: false
  });

  const availableSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const filteredHospitals = partneredHospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.departments.some(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleBooking = () => {
    if (!selectedDepartment || !selectedSlot || !selectedDate) {
      toast.error("Please select all required fields");
      return;
    }

    // Here we would typically make an API call to save the appointment
    toast.success("Appointment booked successfully! A doctor will be assigned to you.");
    setBookingStep(1);
    setSelectedHospital(null);
    setSelectedDepartment(null);
    setSelectedSlot(null);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Book an Appointment
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Choose from our network of partnered hospitals in Bhubaneswar
          </p>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search hospitals or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Hospital Listings */}
        <div className="mt-12 space-y-6">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                          hospital.type === 'Government' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {hospital.type}
                        </span>
                      </div>
                      <p className="text-gray-600 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.address}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {hospital.rating}
                        </span>
                        <span className="text-gray-600">
                          Partner since {hospital.partnerSince}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {hospital.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedHospital(expandedHospital === hospital.id ? null : hospital.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {expandedHospital === hospital.id ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* Departments */}
                {expandedHospital === hospital.id && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {hospital.departments.map((department) => (
                      <div key={department.id} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{department.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{department.description}</p>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            Wait time: {department.waitTime}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Consultation fee: ₹{department.fee}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedHospital(hospital);
                            setSelectedDepartment(department);
                            setBookingStep(2);
                          }}
                          className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Book Appointment
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedHospital && selectedDepartment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Book Appointment</h3>
                <button
                  onClick={() => {
                    setSelectedHospital(null);
                    setSelectedDepartment(null);
                    setBookingStep(1);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {bookingStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900">Selected Department</h4>
                    <p className="text-purple-700">{selectedDepartment.name} at {selectedHospital.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      dateFormat="MMMM d, yyyy"
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Slots
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-2 text-center rounded-lg border ${
                              selectedSlot === slot
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'border-gray-300 hover:border-purple-600'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => selectedSlot && setBookingStep(3)}
                    disabled={!selectedSlot}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
                  >
                    Continue
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={patientDetails.age}
                      onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical History (Optional)
                    </label>
                    <textarea
                      value={patientDetails.medicalHistory}
                      onChange={(e) => setPatientDetails({...patientDetails, medicalHistory: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emergency"
                      checked={patientDetails.isEmergency}
                      onChange={(e) => setPatientDetails({...patientDetails, isEmergency: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
                      This is an emergency case
                    </label>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Appointment Summary</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Hospital: {selectedHospital.name}</p>
                      <p>Department: {selectedDepartment.name}</p>
                      <p>Date: {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}</p>
                      <p>Time: {selectedSlot}</p>
                      <p>Fee: ₹{selectedDepartment.fee}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}