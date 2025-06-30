import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Calendar, ClipboardList } from "lucide-react";
import { Language, PatientInput } from "../../types";
import { translations } from "../../utils/translations";
import { AppHeader } from "../ui/AppHeader";

interface PatientInfoPageProps {
  currentLanguage: Language;
  patientInfo: PatientInput;
  errors: { [key: string]: string };
  onLanguageChange: (language: Language) => void;
  onInputChange: (field: keyof PatientInput, value: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function PatientInfoPage({
  currentLanguage,
  patientInfo,
  errors,
  onLanguageChange,
  onInputChange,
  onConfirm,
  onBack,
}: PatientInfoPageProps) {
  const t = translations[currentLanguage];

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
        <div className="flex-1 pt-24 pb-6 flex flex-col justify-center">
          <div className="relative z-10 px-5 pt-2 pb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-gray-800 mb-3 text-2xl">
              {t.patientInfo.title}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
              <ClipboardList className="w-4 h-4 text-teal-500" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm px-4 whitespace-pre-line">
              {t.patientInfo.subtitle}
            </p>
          </div>

          <div className="relative z-10 px-5 flex-1 flex flex-col justify-center">
            <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="patientNumber"
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-gray-600" />
                      {t.patientInfo.patientNumber}
                    </Label>
                    <Input
                      id="patientNumber"
                      type="text"
                      placeholder={t.patientInfo.patientNumberPlaceholder}
                      value={patientInfo.patientNumber}
                      onChange={(e) =>
                        onInputChange("patientNumber", e.target.value)
                      }
                      className={`${
                        errors.patientNumber
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.patientNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.patientNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="birthDate"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-gray-600" />
                      {t.patientInfo.birthDate}
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      placeholder={t.patientInfo.birthDatePlaceholder}
                      value={patientInfo.birthDate}
                      onChange={(e) =>
                        onInputChange("birthDate", e.target.value)
                      }
                      className={`${
                        errors.birthDate
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      } [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter-none [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:contrast-100`}
                      style={{
                        colorScheme: "light",
                      }}
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 text-sm">{errors.birthDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    onClick={onConfirm}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-3 rounded-lg shadow-md"
                  >
                    {t.patientInfo.confirmButton}
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
