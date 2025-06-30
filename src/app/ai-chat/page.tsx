"use client";

import { AIChatPage } from "../../components/pages/AIChatPage";
import { useHealthcare } from "../../contexts/HealthcareContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { translations } from "../../utils/translations";
import { fetchChatbotResponse, convertToAPIHistory } from "../../utils/api";
import { ChatMessage } from "../../types";
import axios from "axios";

export default function AIChatRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    chatState,
    setChatMessages,
    addChatMessage,
    setCurrentInput,
    setIsAITyping,
  } = useHealthcare();

  const router = useRouter();
  const t = translations[currentLanguage];

  // Initialize chat with system message when page loads
  useEffect(() => {
    if (chatState.messages.length === 0) {
      const systemMessage: ChatMessage = {
        id: "system-welcome",
        type: "system",
        content: t.aiChat.systemMessage,
        timestamp: new Date(),
      };
      setChatMessages([systemMessage]);
    }
  }, [chatState.messages.length, t.aiChat.systemMessage, setChatMessages]);

  const handleSendMessage = async () => {
    if (!chatState.currentInput.trim() || chatState.isAITyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: chatState.currentInput.trim(),
      timestamp: new Date(),
    };

    const currentQuestion = chatState.currentInput.trim();
    addChatMessage(userMessage);
    setCurrentInput("");
    setIsAITyping(true);

    try {
      // Convert current chat messages to API history format
      const history = convertToAPIHistory(chatState.messages);

      // Call the API with timeout
      const apiResponse = await fetchChatbotResponse(history, currentQuestion);

      // Create AI message with streaming effect
      const aiMessageId = `ai-${Date.now()}`;
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        type: "ai",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      addChatMessage(aiMessage);

      // Enhanced streaming effect with variable speed
      let currentIndex = 0;
      const streamingInterval = setInterval(() => {
        if (currentIndex < apiResponse.length) {
          setChatMessages((prevMessages: ChatMessage[]) =>
            prevMessages.map((msg: ChatMessage) =>
              msg.id === aiMessageId
                ? {
                    ...msg,
                    content: apiResponse.substring(0, currentIndex + 1),
                  }
                : msg
            )
          );
          currentIndex++;
        } else {
          // Streaming complete
          setChatMessages((prevMessages: ChatMessage[]) =>
            prevMessages.map((msg: ChatMessage) =>
              msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
            )
          );
          setIsAITyping(false);
          clearInterval(streamingInterval);
        }
      }, 30);
    } catch (error) {
      console.error("API 호출 실패:", error);

      // Enhanced error handling
      let errorMessage = t.aiChat.errorMessage;
      if (axios.isAxiosError(error)) {
        if (
          error.code === "ECONNABORTED" ||
          error.message.includes("timeout")
        ) {
          errorMessage = t.aiChat.networkError;
        } else if (error.response?.status === 500) {
          errorMessage = t.aiChat.errorMessage;
        } else if (error.response?.status === 429) {
          errorMessage = "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
        } else if (!error.response) {
          errorMessage = t.aiChat.networkError;
        }
      }

      // Show error message
      const errorMessageObj: ChatMessage = {
        id: `error-${Date.now()}`,
        type: "ai",
        content: errorMessage,
        timestamp: new Date(),
      };

      addChatMessage(errorMessageObj);
      setIsAITyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    router.push("/mobilechat");
  };

  return (
    <AIChatPage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      chatMessages={chatState.messages}
      currentInput={chatState.currentInput}
      isAITyping={chatState.isAITyping}
      onInputChange={setCurrentInput}
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
      onBack={handleBack}
    />
  );
}
