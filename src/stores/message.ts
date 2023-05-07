import { create } from "zustand";
import { MessageInterface } from "../types/message";
import { getChatCompletion, Result } from "../api/openai";
import { persist, createJSONStorage } from "zustand/middleware";
import { OpenaiConfigInterface } from "../types/openaiConfig";

type MessagesStore = {
  messages: MessageInterface[];
  setMessages: (messages: MessageInterface[]) => void;
  getAssistantMessage: (openaiConfig: OpenaiConfigInterface) => void;
};

export function createUserMessage(content: string): MessageInterface {
  return {
    id: Date.now(),
    role: "user",
    content: content,
    isLoading: false,
    isError: false,
    totalTokens: null,
  };
}

export function createAssistantMessage(
  content: string,
  isLoading: boolean = false,
  isError: boolean = false,
  totalTokens: number | null = null
): MessageInterface {
  return {
    id: Date.now(),
    role: "assistant",
    content: content,
    isLoading: isLoading,
    isError: isError,
    totalTokens: totalTokens,
  };
}

export const useMessageStore = create<MessagesStore>()(
  persist(
    (set) => ({
      messages: [],
      setMessages: (messages) => {
        set({ messages: [...messages] });
      },
      getAssistantMessage: async (openaiConfig: OpenaiConfigInterface) => {
        const messages = useMessageStore.getState().messages;
        const sendingMessage = createAssistantMessage(
          "Loading assistant message. Please wait a moment...",
          true,
          false
        );
        set((state) => ({ messages: [...state.messages, sendingMessage] }));

        let response: Result;
        if (openaiConfig.model == "echo") {
          const _sleep = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          await _sleep(1000);
          const content = "echo:  \n" + messages[messages.length - 1].content;
          response = {
            statusCode: 200,
            content: content,
          };
        } else {
          response = await getChatCompletion(openaiConfig, messages);
        }

        if (response?.statusCode == 200) {
          const newMessage = createAssistantMessage(
            response.content,
            false,
            false,
            response.totalTokens
          );
          set({ messages: [...messages, newMessage] });
        } else {
          const errorMessage = createAssistantMessage(
            `ERROR ${response?.statusCode}: ${response?.content}`,
            false,
            true
          );
          set({ messages: [...messages, errorMessage] });
        }
      },
    }),
    { name: "message", storage: createJSONStorage(() => localStorage) }
  )
);
