"use client";

import { useEffect } from "react";
import { MainPage } from "../components/pages/MainPage";
import { useHealthcare } from "../contexts/HealthcareContext";
import { useRouter } from "next/navigation";
import { detectBrowserLanguage } from "@/utils/translations";

export default function HomePage() {
  const { currentLanguage, setCurrentLanguage } = useHealthcare();
  const router = useRouter();
  // 브라우저 언어 감지 및 설정
  useEffect(() => {
    const browserLanguage = detectBrowserLanguage();
    console.log("browserLanguage", browserLanguage);
    if (browserLanguage !== currentLanguage) {
      setCurrentLanguage(browserLanguage);
    }
  }, []); // 빈 배열로 컴포넌트 마운트 시 한 번만 실행
  const handleNavigate = (page: string) => {
    switch (page) {
      case "patient-info":
        router.push("/mobilechat/patient-info");
        break;
      case "ai-chat":
        router.push("/mobilechat/ai-chat");
        break;
      case "emergency-guide":
        router.push("/mobilechat/emergency-guide");
        break;
      default:
        router.push("/mobilechat");
    }
  };

  return (
    <MainPage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      onNavigate={handleNavigate}
    />
  );
}
