import { api } from "../../axios.config";

interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

export const AiChatAPi = async (
  question: string,
  prevMessages: AiMessage[],
) => {
  const result = await api.post("/ai/chat", { question, prevMessages });
  return result.data;
};
