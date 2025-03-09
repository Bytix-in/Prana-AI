import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Hospitals } from './components/Hospitals';
import { Appointments } from './components/Appointments';
import { Ambulance } from './components/Ambulance';
import { Profile } from './components/Profile';
import { ChatWidget } from './components/ChatWidget';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <ChatWidget />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4CAF50',
                secondary: '#FFF',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#E53E3E',
                secondary: '#FFF',
              },
            },
          }} 
        />
      </div>
    </Router>
  );
}

export default App;