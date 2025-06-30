import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { Language } from "../../types";
import { AppHeader } from "../ui/AppHeader";

interface QuestionnaireCompletePageProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onBackToMain: () => void;
}

export function QuestionnaireCompletePage({
  currentLanguage,
  onLanguageChange,
  onBackToMain,
}: QuestionnaireCompletePageProps) {
  // Add completion messages to translations if not already there
  const completionMessages = {
    ko: {
      title: "문진표 작성 완료",
      message:
        "문진표 작성이 완료되었습니다.\n의료진이 검토 후 연락드리겠습니다.",
      backButton: "메인으로 돌아가기",
    },
    en: {
      title: "Questionnaire Completed",
      message:
        "Your medical questionnaire has been completed.\nMedical staff will review and contact you soon.",
      backButton: "Back to Main",
    },
    mn: {
      title: "Асуулга бөглөж дууслаа",
      message:
        "Таны эмнэлгийн асуулга бөглөж дууслаа.\nЭмч нар үзэж танд удахгүй холбогдох болно.",
      backButton: "Үндсэн хуудас руу буцах",
    },
    kz: {
      title: "Сауалнама толтырылды",
      message:
        "Сіздің медициналық сауалнама толтырылды.\nМедицина қызметкерлері қарап, жақын арада хабарласады.",
      backButton: "Басты бетке оралу",
    },
  };

  const completion = completionMessages[currentLanguage];

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[428px] flex flex-col">
        {/* App Header */}
        <AppHeader
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          showBackButton={false}
        />

        {/* Main content with padding to account for fixed header */}
        <div className="flex-1 pt-24 pb-6 flex items-center justify-center">
          <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden mx-5 w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-gray-800 mb-3">{completion.title}</h2>
              <p className="text-gray-600 text-sm mb-6 whitespace-pre-line">
                {completion.message}
              </p>
              <Button
                onClick={onBackToMain}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-lg shadow-md"
              >
                {completion.backButton}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
