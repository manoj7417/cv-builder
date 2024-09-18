// useCoachesStore.js
import { create } from 'zustand';

const useCoachesDetailStore = create((set) => ({
  coaches: [],
  singleCoach: {},
  isLoading: false,
  fetchAllCoaches: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/getAllCoaches');
      const data = await response.json();
      set({ coaches: data.coaches });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Filter and set a single coach by id
  filterCoachById: (id) => set((state) => {
    const coach = state.coaches.find((coach) => coach._id === id);
    return { singleCoach: coach};
  }),
}));

export default useCoachesDetailStore;
