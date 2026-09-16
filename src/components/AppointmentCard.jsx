import { useState } from "react";
import api from "../services/api";

const AppointmentCard = ({ appointment, status, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [loading, setLoading] = useState(false);

  const id = appointment.id || appointment._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("Failed to delete appointment", err);
      alert("Failed to cancel appointment.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(`/appointments/${id}`, {
        ...appointment,
        date,
        time,
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update appointment", err);
      alert("Failed to update appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#d9e6e7] flex flex-col justify-between space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
            status === "Upcoming" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
          }`}>
            {status}
          </span>
          <h3 className="text-lg font-bold text-[#17324d]">{appointment.doctorName}</h3>
          <p className="text-sm text-[#617286]">{appointment.specialty}</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="text-sm text-[#17324d] space-y-1 bg-[#f8fbfb] p-3 rounded-xl border border-[#d9e6e7]">
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
        </div>
      ) : (
        <form onSubmit={handleUpdateSubmit} className="space-y-3 bg-[#f8fbfb] p-3 rounded-xl border border-[#d9e6e7]">
          <div>
            <label className="block text-xs font-bold text-[#617286] mb-1">New Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white border border-[#d9e6e7] rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#617286] mb-1">New Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white border border-[#d9e6e7] rounded-lg text-xs"
            />
          </div>
          <div className="flex space-x-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1.5 bg-[#087f83] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex justify-end space-x-2 pt-2 border-t border-[#f3f8f8]">
        {!isEditing && status === "Upcoming" && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 text-xs font-bold text-[#087f83] bg-[#f3f8f8] hover:bg-[#eef6f5] rounded-lg transition-all cursor-pointer"
          >
            Reschedule
          </button>
        )}
        <button
          type="button"
          onClick={handleDelete}
          className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all cursor-pointer"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;