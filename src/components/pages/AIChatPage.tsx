import React, { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Bot, Send } from "lucide-react";
import { Language, ChatMessage } from "../../types";
import { translations } from "../../utils/translations";
import { AppHeader } from "../ui/AppHeader";

interface AIChatPageProps {
  currentLanguage: Language;
  chatMessages: ChatMessage[];
  currentInput: string;
  isAITyping: boolean;
  onLanguageChange: (language: Language) => void;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onBack: () => void;
}

export function AIChatPage({
  currentLanguage,
  chatMessages,
  currentInput,
  isAITyping,
  onLanguageChange,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onBack,
}: AIChatPageProps) {
  const t = translations[currentLanguage];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add AI assistant label translations
  const aiLabels = {
    ko: "AI 의료 상담사",
    en: "AI Medical Assistant",
    mn: "AI эмнэлгийн зөвлөх",
    kz: "AI медициналық көмекшісі",
  };

  const aiLabel = aiLabels[currentLanguage];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAITyping]);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[428px] min-h-[926px] relative flex flex-col">
        {/* App Header */}
        <AppHeader
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          onBack={onBack}
          showBackButton={true}
          centerContent={
            <h1 className="text-gray-800 flex items-center gap-2">
              <Bot className="w-5 h-5 text-teal-500" />
              {t.aiChat.title}
            </h1>
          }
        />

        {/* Main Content with padding to account for fixed header */}
        <div className="pt-24 flex-1 flex flex-col">
          {/* 채팅 메시지 영역 */}
          <div className="flex-1 px-5 pb-4">
            <ScrollArea className="h-full">
              <div className="space-y-4 pb-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-teal-500 text-white"
                          : message.type === "system"
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-blue-200"
                          : "bg-white text-gray-700 border border-gray-200"
                      }`}
                    >
                      {message.type === "ai" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs text-gray-500">
                            {aiLabel}
                          </span>
                        </div>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">
                        {message.content}
                        {message.isStreaming && (
                          <span className="animate-pulse">|</span>
                        )}
                      </p>
                      <div className="text-xs text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isAITyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-700 border border-gray-200 p-4 rounded-2xl max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-500">{aiLabel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <span className="text-sm text-gray-500 ml-2">
                          {t.aiChat.aiTyping}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* 면책 조항 */}
          <div className="px-5 py-2">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-700 leading-relaxed">
                {t.aiChat.disclaimer}
              </p>
            </div>
          </div>

          {/* 입력 영역 */}
          <div className="px-5 pb-6">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  value={currentInput}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder={t.aiChat.inputPlaceholder}
                  className="resize-none bg-white border-gray-200 focus:border-teal-500 focus:ring-teal-500"
                  rows={1}
                  disabled={isAITyping}
                />
              </div>
              <Button
                onClick={onSendMessage}
                disabled={!currentInput.trim() || isAITyping}
                className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-lg shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
