import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ClipboardList,
  Sparkles,
  Globe,
  Heart,
  Activity,
  Shield,
  Stethoscope,
  Cross,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { Language } from "../../types";
import { translations, languageOptions } from "../../utils/translations";

interface MainPageProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onNavigate: (page: string) => void;
}

export function MainPage({
  currentLanguage,
  onLanguageChange,
  onNavigate,
}: MainPageProps) {
  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex justify-center">
      <div className="w-full max-w-[428px] min-h-[926px] relative">
        {/* 상단 헤더 배경 장식 */}
        <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden">
          <div className="absolute top-12 left-8 opacity-10">
            <Heart className="w-8 h-8 text-red-400" />
          </div>
          <div className="absolute top-16 right-12 opacity-10">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute top-24 left-20 opacity-10">
            <Shield className="w-7 h-7 text-green-400" />
          </div>
          <div className="absolute top-32 right-8 opacity-10">
            <Stethoscope className="w-9 h-9 text-purple-400" />
          </div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-10">
            <Cross className="w-6 h-6 text-red-400" />
          </div>
          <div className="absolute top-14 right-20 w-3 h-3 bg-blue-300/20 rounded-full"></div>
          <div className="absolute top-28 left-12 w-2 h-2 bg-green-300/20 rounded-full"></div>
          <div className="absolute top-36 right-16 w-4 h-4 bg-purple-300/20 rounded-full"></div>
          <div className="absolute top-18 left-32 w-2.5 h-2.5 bg-red-300/20 rounded-full"></div>
        </div>

        {/* 언어 선택 드롭다운 */}
        <div className="relative z-10 px-5 pt-8 pb-4 flex justify-end">
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40 bg-white/90 backdrop-blur-sm border-white/60 shadow-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <span>{option.flag}</span>
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 헤더 섹션 */}
        <div className="relative z-10 px-5 pt-2 pb-8 text-center">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="relative">
                  <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-gray-800 mb-2 text-3xl leading-tight whitespace-pre-line">
              {t.title}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
              <Shield className="w-4 h-4 text-teal-500" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm px-4 whitespace-pre-line">
            {t.subtitle}
          </p>
        </div>

        {/* 카드 섹션 - 새로운 디자인 */}
        <div className="relative z-10 px-5 space-y-6">
          {/* 첫 번째 카드 - 문진표 작성 */}
          <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-blue-50 opacity-60"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-100/40 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-tr-full"></div>

            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <ClipboardList className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">
                        {t.preScreening.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed whitespace-pre-line">
                    {t.preScreening.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => onNavigate("patient-info")}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white group-hover:shadow-lg transition-all duration-300 flex-1"
                    >
                      <span>{t.preScreening.button}</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <ClipboardList className="w-16 h-16 text-teal-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 두 번째 카드 - AI 상담 */}
          <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 opacity-60"></div>
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-tr-full"></div>

            {/* 장식적 점들 */}
            <div className="absolute top-6 right-12 w-2 h-2 bg-purple-300/30 rounded-full"></div>
            <div className="absolute top-12 right-8 w-1 h-1 bg-blue-300/40 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-indigo-300/30 rounded-full"></div>

            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">
                        <span>{t.aiConsultation.title1}</span>
                        <br />
                        <span>{t.aiConsultation.title2}</span>
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed whitespace-pre-line">
                    {t.aiConsultation.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => onNavigate("ai-chat")}
                      className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-700 text-white group-hover:shadow-lg transition-all duration-300 flex-1"
                    >
                      <span>{t.aiConsultation.button}</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Sparkles className="w-16 h-16 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 세 번째 카드 - 응급처치 가이드 */}
          <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-orange-50 to-pink-50 opacity-60"></div>
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-red-100/40 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-tr-full"></div>

            {/* 응급 테마 장식 요소 */}
            <div className="absolute top-3 right-6">
              <Cross className="w-4 h-4 text-red-300/50" />
            </div>
            <div className="absolute bottom-4 left-6">
              <Heart className="w-3 h-3 text-pink-300/50" />
            </div>

            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-orange-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 mb-1">
                        {t.emergencyGuide.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed whitespace-pre-line">
                    {t.emergencyGuide.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => onNavigate("emergency-guide")}
                      className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-600 hover:from-red-600 hover:via-orange-600 hover:to-pink-700 text-white group-hover:shadow-lg transition-all duration-300 flex-1"
                    >
                      <span>{t.emergencyGuide.button}</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
}
