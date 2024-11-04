import axios from "axios";
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';


const myMiddlewares = (f) => devtools(f, { name: "coachDetail" });

const useCoachesDetailStore = create(
  subscribeWithSelector((set) => ({
    coaches: [],
    singleCoach: {},
    isLoading: true,

    // Fetch all coaches data
    fetchAllCoaches: async () => {
      set({ isLoading: true, coaches: [] }); // Force reset of coaches array
      try {
        const response = await axios.get('/api/getAllCoaches', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        });
        set({ coaches: response.data.coaches });
      } catch (error) {
        console.error(error);
      } finally {
        set({ isLoading: false });
      }
    },
    

    // Filter and set a single coach by ID
    filterCoachById: (id) =>
      set((state) => {
        const coach = state.coaches.find((coach) => coach._id === id);
        return { singleCoach: coach };
      }),

    // Update singleCoach by merging existing properties with new ones
    updateSingleCoach: (updatedFields) =>
      set((state) => ({
        singleCoach: {
          ...state.singleCoach,
          ...updatedFields, // Merges the existing singleCoach with new updated fields
        },
      })),
  }))
);

export default useCoachesDetailStore;
