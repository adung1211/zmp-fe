import React, { FC, useState, useRef, useEffect } from "react";
import { Box, Page, Header, Input, Button, Text } from "zmp-ui";
import { FaPaperPlane } from "react-icons/fa";
import { askChatbot } from "../../hooks/useChatbot";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo An Tâm Tưới. Tôi có thể giúp gì cho bạn?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const scrollHeight = messagesContainerRef.current?.scrollHeight || 0;
    messagesContainerRef.current?.scrollBy({
      top: scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    try {
      setLoading(true);

      const reply = await askChatbot([
        ...messages.map((msg) => ({
          role: msg.isUser ? "user" : "model",
          text: msg.text,
        } as { role: "user" | "model"; text: string })),
        { role: "user", text: inputMessage },
      ]);

      const botResponse: Message = {
        id: messages.length + 2,
        text: reply,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Xin lỗi, tôi không thể trả lời câu hỏi của bạn ngay bây giờ.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Page className="flex flex-col h-screen">
      <Header
        title="Trợ lý An Tâm Tưới"
        showBackIcon
        className="bg-green-700 text-white"
      />
      <Box
        className="flex flex-col h-full overflow-y-auto"
        ref={messagesContainerRef}
      >
        <Box className="flex-1 p-4 bg-slate-50">
          {messages.map((message) => (
            <Box
              key={message.id}
              className={`mb-4 max-w-[80%] ${
                message.isUser
                  ? "ml-auto bg-emerald-100 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                  : "mr-auto bg-sky-100 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl shadow-sm"
              } p-3`}
            >
              <Text
              dangerouslySetInnerHTML={{
                __html: message.text
                .replace(/\n/g, "<br />")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                ,
              }}
            />
              <Text size="xSmall" className="text-right mt-1 text-gray-500">
                {formatTime(message.timestamp)}
              </Text>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Box className="p-2 border-t border-zinc-400 bg-white sticky bottom-0 z-10">
          <Box className="flex items-center">
            <Input
              className="flex-1 rounded-full border border-zinc-400 px-2"
              placeholder="Nhập câu hỏi của bạn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              className="ml-2 w-12 h-12 min-w-0 min-h-0 flex items-center justify-center rounded-full"
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === "" || loading}
              variant="primary"
            >
              <FaPaperPlane />
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default ChatBot;