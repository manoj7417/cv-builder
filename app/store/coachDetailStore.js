// useCoachesStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares = (f) => devtools(persist(f, { name: "coachDetail" }));

const useCoachesDetailStore = create(
  myMiddlewares((set) => ({
    coaches: [],
    singleCoach: {},
    isLoading: true,
    fetchAllCoaches: async () => {
      set({ isLoading: true });
      try {
        const response = await fetch("/api/getAllCoaches");
        const data = await response.json();
        set({ coaches: data.coaches });
      } catch (error) {
        console.error(error);
      } finally {
        set({ isLoading: false });
      }
    },

    // Filter and set a single coach by id
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
  }),{
    enabled:true
  })
);

export default useCoachesDetailStore;
