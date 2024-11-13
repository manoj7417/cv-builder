/** @format */

import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares = (f) => persist(f, { name: "coachDetail" });

const useCoachEditStore = create(
  myMiddlewares((set) => ({
    coaches: [],
    isLoading: true,
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
  }))
);

export default useCoachEditStore;
