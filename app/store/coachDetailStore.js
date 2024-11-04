import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const myMiddlewares = (f) => devtools(f, { name: "coachDetail" });

const useCoachesDetailStore = create(
  myMiddlewares((set) => ({
    coaches: [],
    singleCoach: {},
    isLoading: true,

    // Fetch all coaches data
    fetchAllCoaches: async () => {
      set({ isLoading: true });
      try {
        const response = await axios.get("/api/getAllCoaches", { headers: { 'Cache-Control': 'no-store' } });
        const data = await response.data;
        console.log(data)
        set({ coaches: data.coaches });
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
