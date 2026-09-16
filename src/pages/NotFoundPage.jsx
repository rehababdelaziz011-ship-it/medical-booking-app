import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export default function NotFoundPage() {
  const { darkMode } = useAppStore();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-600 mb-6">
        <AlertCircle size={40} />
      </div>
      <h1 className={`text-4xl font-serif font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Page Not Found
      </h1>
      <p className={`text-sm max-w-md mb-8 ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
        The page you are looking for does not exist or has been moved. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition text-sm flex items-center gap-2"
      >
        <Home size={16} /> Return to Home
      </Link>
    </div>
  );
}