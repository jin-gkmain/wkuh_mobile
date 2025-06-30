"use client";

import { EmergencyGuidePage } from "../../components/pages/EmergencyGuidePage";
import { useHealthcare } from "../../contexts/HealthcareContext";
import { useRouter } from "next/navigation";
import { EmergencyGuide } from "../../types";

export default function EmergencyGuideRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    emergencyState,
    setSearchTerm,
    setSelectedGuide,
  } = useHealthcare();

  const router = useRouter();

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleGuideSelect = (guide: EmergencyGuide | null) => {
    setSelectedGuide(guide);
  };

  const handleBack = () => {
    router.push("/mobilechat");
  };

  return (
    <EmergencyGuidePage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      searchTerm={emergencyState.searchTerm}
      selectedEmergencyGuide={emergencyState.selectedGuide}
      onSearchChange={handleSearchChange}
      onGuideSelect={handleGuideSelect}
      onBack={handleBack}
    />
  );
}
