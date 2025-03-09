import React, { useState } from 'react';
import { FileText, CreditCard, Upload, Download, Trash2, Eye, Calendar, User, Phone, Mail, MapPin, Shield, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Document {
  id: string;
  type: 'prescription' | 'report' | 'certificate';
  name: string;
  date: string;
  doctor: string;
  hospital: string;
  url: string;
}

interface HealthCard {
  id: string;
  cardNumber: string;
  name: string;
  dateOfBirth: string;
  bloodGroup: string;
  validUntil: string;
  emergencyContact: string;
  address: string;
}

export function Profile() {
  const [activeTab, setActiveTab] = useState<'documents' | 'health-card'>('documents');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<'prescription' | 'report' | 'certificate'>('prescription');

  // Sample data - In a real app, this would come from an API
  const [documents] = useState<Document[]>([
    {
      id: '1',
      type: 'prescription',
      name: 'General Checkup Prescription',
      date: '2024-03-15',
      doctor: 'Dr. Sharma',
      hospital: 'AIIMS Bhubaneswar',
      url: '#'
    },
    {
      id: '2',
      type: 'report',
      name: 'Blood Test Report',
      date: '2024-03-10',
      doctor: 'Dr. Patel',
      hospital: 'Apollo Hospitals',
      url: '#'
    }
  ]);

  const [healthCard] = useState<HealthCard>({
    id: 'HC123456',
    cardNumber: 'PRANA-2024-123456',
    name: 'John Doe',
    dateOfBirth: '1990-05-15',
    bloodGroup: 'O+',
    validUntil: '2025-12-31',
    emergencyContact: '+91 9876543210',
    address: 'Bhubaneswar, Odisha'
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) {
      toast.error('Please select a file and document type');
      return;
    }
    // Here you would typically upload the file to your server
    toast.success('Document uploaded successfully');
    setShowUploadModal(false);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-purple-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-purple-300 flex items-center justify-center">
                <User className="h-12 w-12 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{healthCard.name}</h1>
                <p className="text-purple-200">PRANA Health ID: {healthCard.cardNumber}</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5 mb-1 mx-auto" />
                Medical Documents
              </button>
              <button
                onClick={() => setActiveTab('health-card')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'health-card'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-5 w-5 mb-1 mx-auto" />
                Health Card
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'documents' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Medical Documents</h2>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </button>
                </div>

                <div className="grid gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">{doc.hospital}</p>
                          <p className="text-sm text-gray-500">Dr. {doc.doctor}</p>
                          <p className="text-sm text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-full">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'health-card' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Digital Health Card</h2>
                <div className="relative group">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white transform transition-transform group-hover:scale-105">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Shield className="h-8 w-8 mb-2" />
                        <h3 className="text-2xl font-bold">{healthCard.name}</h3>
                      </div>
                      <Activity className="h-8 w-8" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-purple-200 text-sm">Card Number</p>
                        <p className="font-medium">{healthCard.cardNumber}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm">Blood Group</p>
                        <p className="font-medium">{healthCard.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm">Date of Birth</p>
                        <p className="font-medium">{new Date(healthCard.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-sm">Valid Until</p>
                        <p className="font-medium">{new Date(healthCard.validUntil).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Details */}
                  <div className="absolute inset-0 bg-black bg-opacity-90 rounded-xl p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <h4 className="text-lg font-semibold mb-4">Additional Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2" />
                        <p>Emergency: {healthCard.emergencyContact}</p>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        <p>{healthCard.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <p>Member since: {new Date().getFullYear()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Medical Document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value as any)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="prescription">Prescription</option>
                  <option value="report">Medical Report</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}