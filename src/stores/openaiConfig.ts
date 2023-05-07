import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OpenaiConfigInterface } from "../types/openaiConfig";

type OpenaiConfigStore = {
  openaiConfig: OpenaiConfigInterface;
  setOpenaiConfig: (openaiConfig: OpenaiConfigInterface) => void;
};

export const useOpenaiConfigStore = create<OpenaiConfigStore>()(
  persist(
    (set) => ({
      openaiConfig: {
        model: "gpt-3.5-turbo",
        apiKey: "",
      },
      setOpenaiConfig: (openaiConfig: OpenaiConfigInterface) => {
        set({ openaiConfig: { ...openaiConfig } });
      },
    }),
    {
      name: "openai-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
