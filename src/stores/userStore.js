import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      login: async (input) => {
        const result = await axios.post('http://localhost:8000/auth/login', input);
        console.log(result);
        set({
          token: result.data.token,
          user: result.data.user,
        });
        return result;
      },
      logout: () => {
        console.log('Logging out');
        set({ token: '', user: null });
      },
    }),
    {
      name: 'state',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
