import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const askChatbot = async (messages: { role: "user" | "model"; text: string }[]) => {
  try {
    const response = await axios.post(
      `${API_URL}/chatbot/ask`,
      { messages },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.reply;
  } catch (error) {
    console.error("Error in askChatbot:", error);
    throw new Error("Failed to fetch chatbot response");
  }
};