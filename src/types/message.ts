export type Role = "system" | "user" | "assistant";

export interface MessageInterface {
  id: number;
  role: Role;
  content: string;
  isLoading: boolean;
  isError: boolean;
  totalTokens: number | null;
}
