export type ModelOptions = "gpt-3.5-turbo" | "echo";

export interface OpenaiConfigInterface {
  model: ModelOptions;
  apiKey: string;
}
