import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import { useAppStore } from './stores/useAppStore';

export default function App() {
  const { darkMode } = useAppStore();

  return (
    <Router>
      <div className={`min-h-screen w-full transition-colors duration-300 ${
        darkMode ? 'bg-[#0d2224] text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 py-10 w-full">
          <Routes>
            <Route path="/" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}