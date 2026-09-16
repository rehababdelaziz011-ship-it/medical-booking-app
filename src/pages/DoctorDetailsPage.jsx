import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Award, Clock, DollarSign } from 'lucide-react';
import { getDoctorById } from '../services/api';
import { useAppStore } from '../stores/useAppStore';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useAppStore();

  useEffect(() => {
    getDoctorById(id)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((_err) => {
        setError('Could not fetch doctor details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading doctor profile...</div>;
  if (error || !doctor) return <div className="text-center py-20 text-red-500">{error || 'Doctor not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 text-sm font-semibold transition ${
          darkMode ? 'text-teal-300 hover:text-white' : 'text-teal-600 hover:text-teal-700'
        }`}
      >
        <ArrowLeft size={16} /> Back to Doctors
      </button>

      <div className={`p-8 rounded-3xl border shadow-sm transition ${
        darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src={doctor.image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150'}
            alt={doctor.name}
            className="w-32 h-32 rounded-2xl object-cover border-4 border-teal-500 shadow-md"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-serif font-bold mb-2">{doctor.name}</h1>
            <span className="px-3 py-1 bg-teal-500/10 text-teal-500 font-semibold text-xs rounded-full inline-block mb-4">
              {doctor.specialty}
            </span>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
              {doctor.bio || doctor.description || 'Dedicated specialist offering expert consultation and personalized healthcare services.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-6 border-t border-gray-100 dark:border-[#1c4749]">
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-[#16383a] border-[#23585a]' : 'bg-gray-50 border-gray-100'}`}>
            <Award className="text-teal-500" size={24} />
            <div>
              <span className="text-xs text-gray-400 block">Experience</span>
              <strong className="text-sm">5+ Years</strong>
            </div>
          </div>
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-[#16383a] border-[#23585a]' : 'bg-gray-50 border-gray-100'}`}>
            <Clock className="text-teal-500" size={24} />
            <div>
              <span className="text-xs text-gray-400 block">Working Days</span>
              <strong className="text-sm">Sun - Thu</strong>
            </div>
          </div>
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-[#16383a] border-[#23585a]' : 'bg-gray-50 border-gray-100'}`}>
            <DollarSign className="text-teal-500" size={24} />
            <div>
              <span className="text-xs text-gray-400 block">Consultation Fee</span>
              <strong className="text-sm">$50 / Visit</strong>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to={`/book?doctorId=${doctor.id}`}
            className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition flex items-center gap-2 text-sm"
          >
            <Calendar size={18} /> Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}