import React from 'react';
import { User, Mail, Shield, Moon, Sun, Award } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export default function ProfilePage() {
  const { darkMode, toggleDarkMode, favorites } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <p className="text-teal-600 dark:text-teal-400 text-sm tracking-widest uppercase font-semibold mb-1">
          Account Settings
        </p>
        <h1 className={`text-3xl font-serif font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Patient Profile
        </h1>
      </div>

      <div className={`p-8 rounded-3xl border shadow-sm space-y-8 transition ${
        darkMode ? 'bg-[#102b2d] border-[#1c4749] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-[#1c4749]">
          <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 border-2 border-teal-500 shadow-inner">
            <User size={48} />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-serif font-bold">Rehab Abdelaziz</h2>
            <p className={`text-sm mt-1 flex items-center justify-center sm:justify-start gap-1.5 ${darkMode ? 'text-teal-100/70' : 'text-gray-600'}`}>
              <Mail size={15} /> rehababdelaziz011@gmail.com
            </p>
            <span className="inline-block mt-3 px-3 py-1 bg-teal-500/10 text-teal-600 text-xs font-semibold rounded-full">
              Verified Patient Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#16383a] border-[#23585a]' : 'bg-gray-50 border-gray-100'}`}>
            <Award className="text-teal-500" size={28} />
            <div>
              <span className="text-xs text-gray-400 block">Favorite Doctors</span>
              <strong className="text-lg font-bold">{favorites.length} Saved</strong>
            </div>
          </div>
          <div className={`p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#16383a] border-[#23585a]' : 'bg-gray-50 border-gray-100'}`}>
            <Shield className="text-teal-500" size={28} />
            <div>
              <span className="text-xs text-gray-400 block">Security Status</span>
              <strong className="text-lg font-bold">Protected</strong>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Appearance Mode</h3>
            <p className={`text-xs ${darkMode ? 'text-teal-100/70' : 'text-gray-500'}`}>
              Switch between light and dark themes using global Zustand state.
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition ${
              darkMode 
                ? 'bg-[#16383a] border-[#23585a] text-teal-300 hover:text-white' 
                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}