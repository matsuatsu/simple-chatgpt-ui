import { create } from "zustand";
import { PromptInterface } from "../types/prompt";
import { persist, createJSONStorage } from "zustand/middleware";

type PropmtsStore = {
  prompts: PromptInterface[];
  setPrompts: (prompts: PromptInterface[]) => void;
};

export const usePromptStore = create<PropmtsStore>()(
  persist(
    (set) => ({
      prompts: [],
      setPrompts: (prompts) => {
        set({ prompts: [...prompts] });
      },
    }),
    { name: "message", storage: createJSONStorage(() => localStorage) }
  )
);
