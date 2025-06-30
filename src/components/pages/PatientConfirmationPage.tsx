import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, Users } from "lucide-react";
import { Language, PatientInfo } from "../../types";
import { translations } from "../../utils/translations";
import { AppHeader } from "../ui/AppHeader";

interface PatientConfirmationPageProps {
  currentLanguage: Language;
  patientInfo: PatientInfo;
  onLanguageChange: (language: Language) => void;
  onStart: () => void;
  onBack: () => void;
}

export function PatientConfirmationPage({
  currentLanguage,
  patientInfo,
  onLanguageChange,
  onStart,
  onBack,
}: PatientConfirmationPageProps) {
  const t = translations[currentLanguage];

  // Calculate age from birth date
  const calculateAge = (birthDate: string): number => {
    const today = new Date();

    // Convert YYYYMMDD format to YYYY-MM-DD
    let formattedDate = birthDate;
    if (birthDate.length === 8 && !birthDate.includes("-")) {
      formattedDate = `${birthDate.slice(0, 4)}-${birthDate.slice(
        4,
        6
      )}-${birthDate.slice(6, 8)}`;
    }

    const birth = new Date(formattedDate);

    // Check if date is valid
    if (isNaN(birth.getTime())) {
      console.error("Invalid birth date:", birthDate);
      return 0;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const patientAge = calculateAge(patientInfo.birthDate);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[428px] flex flex-col">
        {/* App Header */}
        <AppHeader
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          onBack={onBack}
          showBackButton={true}
        />

        {/* Main Content with padding to account for fixed header */}
        <div className="flex-1 pt-24 pb-6 flex flex-col">
          <div className="relative z-10 px-5 pt-2 pb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-gray-800 mb-3 text-2xl">
              {t.patientConfirmation.title}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
              <Users className="w-4 h-4 text-teal-500" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm px-4">
              {t.patientConfirmation.subtitle}
            </p>
          </div>

          <div className="relative z-10 px-5 flex-1 flex flex-col justify-center">
            <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientConfirmation.name}
                    </span>
                    <span className="text-gray-800">{patientInfo.name}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientInfo.birthDate}
                    </span>
                    <span className="text-gray-800">
                      {patientInfo.birthDate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientConfirmation.age}
                    </span>
                    <span className="text-gray-800">{patientAge}세</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientConfirmation.height}
                    </span>
                    <span className="text-gray-800">{patientInfo.height}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientConfirmation.weight}
                    </span>
                    <span className="text-gray-800">{patientInfo.weight}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {t.patientConfirmation.gender}
                    </span>
                    <span className="text-gray-800">{patientInfo.gender}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    onClick={onStart}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-3 rounded-lg shadow-md"
                  >
                    {t.patientConfirmation.startButton}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
