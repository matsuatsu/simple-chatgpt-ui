import axios, { isAxiosError } from "axios";
import { MessageInterface } from "../types/message";
import { OpenaiConfigInterface } from "../types/openaiConfig";

export type Result = {
  statusCode: number | undefined;
  content: string;
  totalTokens?: number;
} | null;

export const getChatCompletion = async (
  openaiConfig: OpenaiConfigInterface,
  messages: MessageInterface[]
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiConfig.apiKey}`,
    };

    const data = {
      model: openaiConfig.model,
      messages: messages.map((m) => {
        return { role: m.role, content: m.content };
      }),
    };
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const response = await axios.post(endpoint, data, { headers: headers });
    const result: Result = {
      statusCode: response.status,
      content: response.data.choices[0].message.content.trim(),
      totalTokens: response.data.usage.total_tokens,
    };
    return result;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const result: Result = {
        statusCode: error.response?.status,
        content: error.response?.data.error.message,
      };
      return result;
    }
    return null;
  }
};
