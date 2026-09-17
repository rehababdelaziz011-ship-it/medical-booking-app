import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      favorites: [],
      toggleFavorite: (doctorOrId) =>
        set((state) => {
          const id = typeof doctorOrId === 'object' && doctorOrId !== null ? doctorOrId.id : doctorOrId;
          
          const exists = state.favorites.some((fav) => 
            (typeof fav === 'object' && fav !== null ? fav.id : fav) === id
          );

          return {
            favorites: exists
              ? state.favorites.filter((fav) => 
                  (typeof fav === 'object' && fav !== null ? fav.id : fav) !== id
                )
              : [...state.favorites, doctorOrId], 
          };
        }),
    }),
    {
      name: 'medcare-storage',
    }
  )
);