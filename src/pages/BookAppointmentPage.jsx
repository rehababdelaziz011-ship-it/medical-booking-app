import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, User, Mail, Phone, Clock, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createAppointment, getDoctorById } from '../services/api';
import { useAppStore } from '../stores/useAppStore';

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  
  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  
  const navigate = useNavigate();
  const { darkMode } = useAppStore();

  const emergencyNotesRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      doctorId: doctorId || '',
    },
  });

  useEffect(() => {
    if (doctorId) {
      setValue('doctorId', doctorId);
      getDoctorById(doctorId)
        .then((res) => {
          setDoctor(res.data);
          setLoadingDoctor(false);
        })
        .catch((err) => {
          console.error('Error fetching doctor details:', err);
          setLoadingDoctor(false);
        });
    } else {
      // oxlint-disable-next-line react/set-state-in-effect
      setLoadingDoctor(false);
    }
  }, [doctorId, setValue]);

  const onSubmit = async (data) => {
    try {
      const emergencyValue = emergencyNotesRef.current?.value || '';
      const payload = {
        ...data,
        doctorId: doctorId, 
        doctorName: doctor ? doctor.name : 'Specialist',
        emergencyNote: emergencyValue,
        createdAt: new Date().toISOString(),
      };

      await createAppointment(payload);
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/appointments');
      }, 1500);
    } catch (err) {
      console.error('Failed to book appointment:', err);
      alert('Failed to book appointment. Please check json-server.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 text-sm font-semibold mb-6 transition ${
          darkMode ? 'text-teal-300 hover:text-white' : 'text-teal-600 hover:text-teal-700'
        }`}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="mb-6">
        <p className="text-teal-600 dark:text-teal-400 text-sm tracking-widest uppercase font-semibold mb-1">
          Reservation
        </p>
        <h1 className={`text-3xl font-serif font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Book an Appointment
        </h1>
      </div>

      {loadingDoctor ? (
        <div className="p-4 mb-6 rounded-2xl border text-sm text-gray-400">Loading doctor info...</div>
      ) : doctor ? (
        <div className={`p-5 rounded-2xl border mb-6 flex items-center gap-4 shadow-sm ${
          darkMode ? 'bg-[#102b2d] border-[#1c4749]' : 'bg-teal-50/50 border-teal-100'
        }`}>
          <img
            src={doctor.image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150'}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-500 shadow-sm"
          />
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-teal-500/10 text-teal-600 rounded-full inline-block mb-1">
              {doctor.specialty}
            </span>
            <h3 className={`font-serif font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {doctor.name}
            </h3>
            <p className="text-xs text-gray-400">Selected Doctor for Consultation</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl text-sm">
          ⚠️ No specific doctor selected. Please choose a doctor from the main list first.
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/20 text-teal-600 rounded-2xl flex items-center gap-3">
          <CheckCircle2 size={22} />
          <span className="font-semibold text-sm">Appointment booked successfully! Redirecting...</span>
        </div>
      )}

      <form
        // oxlint-disable-next-line react/refs
        onSubmit={handleSubmit(onSubmit)}
        className={`p-8 rounded-3xl border shadow-sm space-y-6 transition ${
          darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        {/* Patient Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Patient Name</label>
          <div className="relative">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
            <input
              type="text"
              placeholder="e.g. Rahab Abdelaziz"
              {...register('patientName', { required: 'Patient name is required' })}
              className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                darkMode ? 'bg-[#16383a] border-[#23585a] text-white placeholder-teal-300/40' : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
          </div>
          {errors.patientName && <span className="text-red-500 text-xs mt-1 block">{errors.patientName.message}</span>}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email', { required: 'Email is required' })}
                className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                  darkMode ? 'bg-[#16383a] border-[#23585a] text-white placeholder-teal-300/40' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
            <div className="relative">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="+20 10xxxxxxxx"
                {...register('phone', { required: 'Phone number is required' })}
                className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                  darkMode ? 'bg-[#16383a] border-[#23585a] text-white placeholder-teal-300/40' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
            {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Appointment Date</label>
            <div className="relative">
              <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                  darkMode ? 'bg-[#16383a] border-[#23585a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
            {errors.date && <span className="text-red-500 text-xs mt-1 block">{errors.date.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Time Slot</label>
            <div className="relative">
              <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
              <select
                {...register('time', { required: 'Time slot is required' })}
                className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                  darkMode ? 'bg-[#16383a] border-[#23585a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              >
                <option value="">-- Select Time --</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>
            {errors.time && <span className="text-red-500 text-xs mt-1 block">{errors.time.message}</span>}
          </div>
        </div>

        {/* Uncontrolled Input Example using useRef */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
            Emergency Note (Optional - Uncontrolled via useRef)
          </label>
          <div className="relative">
            <FileText className={`absolute left-4 top-3 ${darkMode ? 'text-teal-300' : 'text-gray-400'}`} size={18} />
            <textarea
              ref={emergencyNotesRef}
              rows="3"
              placeholder="Any special medical notes or conditions..."
              className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition ${
                darkMode ? 'bg-[#16383a] border-[#23585a] text-white placeholder-teal-300/40' : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !doctorId}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-md transition text-sm"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}