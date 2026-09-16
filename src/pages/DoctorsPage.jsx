import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Star, Calendar, MapPin, ShieldCheck, Users, Activity, Sparkles, ChevronLeft, ChevronRight, Phone, Mail, Clock } from 'lucide-react';
import { getDoctors } from '../services/api';
import { useAppStore } from '../stores/useAppStore';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [loading, setLoading] = useState(true);

  // States الخاصة بالـ Pagination (التقسيم لصفحات)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { darkMode, favorites, toggleFavorite } = useAppStore();

  useEffect(() => {
    getDoctors()
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching doctors:', err);
        setLoading(false);
      });
  }, []);

  // تصفية الدكاترة حسب البحث والتخصص
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery, selectedSpecialty]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const specialties = ['All', ...new Set(doctors.map((d) => d.specialty))];

  if (loading) {
    return (
      <div className={`text-center py-20 text-sm ${darkMode ? 'text-teal-200' : 'text-gray-600'}`}>
        Loading doctors directory...
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* 🌟 Dynamic Hero Section with Adaptive Light/Dark Mode */}
      <div className={`relative rounded-3xl p-8 md:p-12 overflow-hidden border shadow-xl transition-all duration-300 ${
        darkMode 
          ? 'bg-linear-to-tr from-[#0d2224] via-[#102b2d] to-[#16383a] border-[#1c4749] text-white' 
          : 'bg-linear-to-tr from-teal-50 via-white to-teal-100/60 border-teal-200/80 text-gray-900 shadow-teal-900/5'
      }`}>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
          darkMode ? 'bg-teal-500/10' : 'bg-teal-400/25'
        }`}></div>
        <div className={`absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
          darkMode ? 'bg-cyan-500/10' : 'bg-cyan-300/30'
        }`}></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 backdrop-blur-md border rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              darkMode 
                ? 'bg-white/10 border-white/10 text-teal-300' 
                : 'bg-teal-600/10 border-teal-600/20 text-teal-700'
            }`}>
              <Sparkles size={14} /> Advanced Healthcare & Medical Excellence
            </div>

            <h1 className={`text-3xl md:text-5xl font-serif font-bold leading-tight tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Exceptional Care. <br />
              <span className="text-teal-600 dark:text-teal-400">Advanced Specialists.</span> Trusted Results.
            </h1>

            <p className={`text-sm md:text-base leading-relaxed font-light ${
              darkMode ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Connect seamlessly with elite medical professionals. Experience a modern, reliable platform designed for your health, precision scheduling, and complete peace of mind.
            </p>

            <div className={`pt-4 grid grid-cols-3 gap-4 border-t ${darkMode ? 'border-white/10' : 'border-teal-200/60'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-teal-500/20 border-teal-400/30 text-teal-300' : 'bg-teal-100 border-teal-200 text-teal-700'
                }`}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong className={`block text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>100%</strong>
                  <span className={`text-[10px] ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Verified Experts</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-teal-500/20 border-teal-400/30 text-teal-300' : 'bg-teal-100 border-teal-200 text-teal-700'
                }`}>
                  <Users size={18} />
                </div>
                <div>
                  <strong className={`block text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>15K+</strong>
                  <span className={`text-[10px] ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Happy Patients</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 ${
                  darkMode ? 'bg-teal-500/20 border-teal-400/30 text-teal-300' : 'bg-teal-100 border-teal-200 text-teal-700'
                }`}>
                  <Activity size={18} />
                </div>
                <div>
                  <strong className={`block text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>24/7</strong>
                  <span className={`text-[10px] ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Active Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className={`relative w-full max-w-sm h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 group ${
              darkMode ? 'border-white/10' : 'border-white shadow-teal-900/10'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
                alt="Medical Care"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-teal-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold shadow-md">
                  +50
                </div>
                <div>
                  <p className="text-xs font-bold">Top Specialist Doctors</p>
                  <p className="text-[10px] text-teal-200">Ready to consult and care for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-teal-600 dark:text-teal-400 text-sm tracking-widest uppercase font-semibold mb-1">
              Medical Directory
            </p>
            <h2 className={`text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Find Our Specialists
            </h2>
          </div>

          {/* Search Input with Interactive Shadow & Glow Effect */}
          <div className="relative w-full md:w-80">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              darkMode ? 'text-teal-300 focus-within:text-teal-400' : 'text-gray-400'
            }`} size={18} />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-2xl pl-11 pr-4 py-3 text-sm transition-all duration-300 outline-none ${
                darkMode 
                  ? 'bg-[#102b2d] border-[#1c4749] text-white placeholder-teal-300/40 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/25 focus:shadow-[0_0_20px_rgba(20,184,166,0.2)]' 
                  : 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 focus:shadow-lg focus:shadow-teal-900/10'
              }`}
            />
          </div>
        </div>

        {/* Specialty Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedSpecialty === spec
                  ? 'bg-teal-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-[#102b2d] border border-[#1c4749] text-teal-200 hover:bg-[#16383a]'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {currentDoctors.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border ${darkMode ? 'bg-[#102b2d] border-[#1c4749] text-teal-200' : 'bg-white border-gray-200 text-gray-500 shadow-sm'}`}>
          <p className="text-sm font-medium">No doctors found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.map((doc) => {
              const isFav = favorites.some((fav) => String(fav.id) === String(doc.id));

              return (
                <div
                  key={doc.id}
                  className={`rounded-3xl border overflow-hidden shadow-sm flex flex-col justify-between transition group hover:-translate-y-1 hover:shadow-xl ${
                    darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-[#16383a]">
                    <img
                      src={doc.image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500'}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    
                    <button
                      onClick={() => toggleFavorite(doc)}
                      className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition shadow-md ${
                        isFav 
                          ? 'bg-red-500 text-white' 
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={18} className={isFav ? 'fill-white' : ''} />
                    </button>

                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                      {doc.specialty}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-xl">{doc.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star size={14} className="fill-amber-500" />
                          <span>{doc.rating || '4.9'}</span>
                        </div>
                      </div>

                      <p className={`text-xs line-clamp-2 ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
                        {doc.bio || 'Experienced specialist dedicated to providing top-quality patient care and advanced medical treatments.'}
                      </p>

                      <div className={`pt-2 flex items-center gap-2 text-xs ${darkMode ? 'text-teal-200/60' : 'text-gray-400'}`}>
                        <MapPin size={14} />
                        <span>{doc.location || 'Cairo Medical Center'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-[#1c4749]">
                      <Link
                        to={`/doctors/${doc.id}`}
                        className={`py-2.5 rounded-xl border text-center text-xs font-bold transition ${
                          darkMode ? 'border-[#23585a] hover:bg-[#16383a] text-teal-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        View Profile
                      </Link>
                      <Link
                        to={`/book?doctorId=${doc.id}`}
                        className="py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-center rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <Calendar size={14} /> Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 📄 Pagination Navigation Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentPage === 1
                    ? 'opacity-40 cursor-not-allowed'
                    : darkMode
                    ? 'hover:bg-[#16383a] text-teal-200'
                    : 'hover:bg-gray-100 text-gray-700'
                } ${darkMode ? 'bg-[#102b2d] border border-[#1c4749]' : 'bg-white border border-gray-200 shadow-sm'}`}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition shadow-sm ${
                        currentPage === pageNumber
                          ? 'bg-teal-600 text-white shadow-md'
                          : darkMode
                          ? 'bg-[#102b2d] border border-[#1c4749] text-teal-200 hover:bg-[#16383a]'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  currentPage === totalPages
                    ? 'opacity-40 cursor-not-allowed'
                    : darkMode
                    ? 'hover:bg-[#16383a] text-teal-200'
                    : 'hover:bg-gray-100 text-gray-700'
                } ${darkMode ? 'bg-[#102b2d] border border-[#1c4749]' : 'bg-white border border-gray-200 shadow-sm'}`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* 🌟 Professional Multi-Column Footer Section */}
      <footer className={`mt-20 pt-16 pb-12 border-t transition-all duration-300 ${
        darkMode 
          ? 'bg-[#0a1a1c] border-[#1c4749] text-gray-300' 
          : 'bg-linear-to-b from-gray-50 to-teal-50/40 border-teal-100 text-gray-600'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200/40 dark:border-[#1c4749]">
          
          {/* العمود الأول: معلومات المنصة */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
                <Activity size={20} />
              </div>
              <span className={`text-xl font-serif font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Medicare <span className="text-teal-600 dark:text-teal-400">Hub</span>
              </span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed font-light max-w-sm">
              Your trusted partner in modern healthcare. Connecting patients with elite specialists, providing reliable booking, and ensuring top-tier medical care with absolute precision.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                <ShieldCheck size={16} /> Certified Medical Platform
              </div>
            </div>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition flex items-center gap-1">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-teal-600 dark:hover:text-teal-400 transition flex items-center gap-1">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-teal-600 dark:hover:text-teal-400 transition flex items-center gap-1">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-teal-600 dark:hover:text-teal-400 transition flex items-center gap-1">
                  Favorite Specialists
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: التخصصات */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-teal-600 dark:hover:text-teal-400 transition cursor-pointer">Cardiology</span></li>
              <li><span className="hover:text-teal-600 dark:hover:text-teal-400 transition cursor-pointer">Neurology</span></li>
              <li><span className="hover:text-teal-600 dark:hover:text-teal-400 transition cursor-pointer">Pediatrics</span></li>
              <li><span className="hover:text-teal-600 dark:hover:text-teal-400 transition cursor-pointer">Dermatology</span></li>
              <li><span className="hover:text-teal-600 dark:hover:text-teal-400 transition cursor-pointer">Orthopedics</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>+20 100 555 8932</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>support@medicarehub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>24/7 Emergency Support</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
          <p>© {new Date().getFullYear()} Medicare Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer transition">Security</span>
          </div>
        </div>
      </footer>

    </div>
  );
}