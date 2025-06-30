"use client";

import { MainPage } from "../components/pages/MainPage";
import { useHealthcare } from "../contexts/HealthcareContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { currentLanguage, setCurrentLanguage } = useHealthcare();
  const router = useRouter();

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
