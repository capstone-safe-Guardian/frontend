import { User } from 'firebase/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Create the store using zustand with persistence
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'MindCheckUser-v2.0',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
