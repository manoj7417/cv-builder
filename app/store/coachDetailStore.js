/** @format */

import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares = (f) => persist(f, { name: "coachDetail" });

const useCoachesDetailStore = create(
  myMiddlewares((set) => ({
    coaches: [],
    singleCoach: {},
    isLoading: true,

    // Fetch all coaches data
    fetchAllCoaches: async () => {
      set({ isLoading: true });
      try {
        const response = await axios.get(
          `/api/getAllCoaches?timestamp=${new Date().getTime()}`
        );
        const data = await response.data;
        await set({ coaches: data.coaches });
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
      set((state) => {
        const updatedCoach = {
          ...state.singleCoach,
          ...updatedFields, // Merges the existing singleCoach with new updated fields
        };

        const updatedCoaches = state.coaches.map((coach) =>
          coach._id === updatedCoach._id ? updatedCoach : coach
        );

        return {
          singleCoach: updatedCoach,
          coaches: updatedCoaches,
        };
      }),
  }))
);

export default useCoachesDetailStore;
