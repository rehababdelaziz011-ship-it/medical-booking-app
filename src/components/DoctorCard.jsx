import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export default function DoctorCard({ doctor }) {
  const { darkMode } = useAppStore();

  return (
    <div className={`rounded-2xl border p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
      darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={doctor.image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150'}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-inner"
          />
          <div>
            <h3 className="font-bold text-lg font-serif">{doctor.name}</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-teal-500/10 text-teal-500 rounded-full inline-block mt-1">
              {doctor.specialty}
            </span>
          </div>
        </div>

        <p className={`text-sm line-clamp-2 mb-4 ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
          {doctor.bio || doctor.description || 'Experienced specialist dedicated to providing top-quality patient care and consultation.'}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-[#1c4749] flex items-center justify-between gap-3">
        <Link
          to={`/doctors/${doctor.id}`}
          className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold border transition ${
            darkMode 
              ? 'border-[#23585a] hover:bg-[#16383a] text-teal-200' 
              : 'border-gray-200 hover:bg-gray-50 text-gray-700'
          }`}
        >
          View Profile
        </Link>
        <Link
          to={`/book?doctorId=${doctor.id}`}
          className="flex-1 text-center py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
        >
          <Calendar size={14} /> Book Now
        </Link>
      </div>
    </div>
  );
}