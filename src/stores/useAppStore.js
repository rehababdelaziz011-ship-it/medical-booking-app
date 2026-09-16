import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      favorites: [],
      toggleFavorite: (doctorId) =>
        set((state) => {
          const exists = state.favorites.includes(doctorId);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== doctorId)
              : [...state.favorites, doctorId],
          };
        }),
    }),
    {
      name: 'medcare-storage',
    }
  )
);