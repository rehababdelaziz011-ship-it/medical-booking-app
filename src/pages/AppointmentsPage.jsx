import React, { useEffect, useState } from 'react';
import { Calendar, Trash2, Edit3, User, X } from 'lucide-react';
import { getAppointments, deleteAppointment, updateAppointment, getDoctors } from '../services/api';
import { useAppStore } from '../stores/useAppStore';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const { darkMode } = useAppStore();

  const fetchData = async () => {
    try {
      const [appRes, docRes] = await Promise.all([getAppointments(), getDoctors()]);
      setAppointments(appRes.data);
      setDoctors(docRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await deleteAppointment(id);
        setAppointments(appointments.filter((app) => app.id !== id));
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointment(editingAppointment.id, editingAppointment);
      setEditingAppointment(null);
      fetchData();
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  const getDoctorName = (doctorId) => {
    const doc = doctors.find((d) => String(d.id) === String(doctorId));
    return doc ? doc.name : 'Unknown Doctor';
  };

  if (loading) {
    return (
      <div className={`text-center py-20 text-sm ${darkMode ? 'text-teal-200' : 'text-gray-600'}`}>
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <p className="text-teal-600 dark:text-teal-400 text-sm tracking-widest uppercase font-semibold mb-1">
          Manage Schedule
        </p>
        <h1 className={`text-3xl font-serif font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Appointments ({appointments.length})
        </h1>
      </div>

      {appointments.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border transition ${
          darkMode ? 'bg-[#102b2d] border-[#1c4749] text-teal-200' : 'bg-white border-gray-200 text-gray-500'
        }`}>
          <Calendar className="mx-auto text-teal-500 mb-4" size={48} />
          <p className="text-sm font-medium">No appointments booked yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className={`p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-500 rounded-md text-xs font-semibold">
                    {app.time}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-teal-200/70' : 'text-gray-400'}`}>{app.date}</span>
                </div>
                <h3 className={`font-serif font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dr. {getDoctorName(app.doctorId)}
                </h3>
                <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
                  <User size={14} /> Patient: <strong className="font-medium">{app.patientName}</strong> ({app.phone})
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => setEditingAppointment(app)}
                  className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                    darkMode ? 'border-[#23585a] hover:bg-[#16383a] text-teal-200' : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Edit3 size={15} /> Reschedule
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition text-xs font-bold flex items-center gap-1.5"
                >
                  <Trash2 size={15} /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Reschedule Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-8 rounded-3xl border shadow-xl relative transition ${
            darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <button
              onClick={() => setEditingAppointment(null)}
              className={`absolute right-6 top-6 transition ${darkMode ? 'text-teal-200 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-serif font-bold mb-6">Reschedule Appointment</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Patient Name</label>
                <input
                  type="text"
                  value={editingAppointment.patientName}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, patientName: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                    darkMode ? 'bg-[#16383a] border-[#23585a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Date</label>
                  <input
                    type="date"
                    value={editingAppointment.date}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                      darkMode ? 'bg-[#16383a] border-[#23585a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Time</label>
                  <select
                    value={editingAppointment.time}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition ${
                      darkMode ? 'bg-[#16383a] border-[#23585a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingAppointment(null)}
                  className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition ${
                    darkMode ? 'border-[#23585a] text-teal-200 hover:bg-[#16383a]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}