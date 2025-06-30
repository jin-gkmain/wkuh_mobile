import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  AlertTriangle,
  Search,
  Heart,
  HeartCrack,
  Wind,
  Droplets,
  Flame,
  Bone,
  Skull,
  Zap,
  Clock,
  CheckCircle2,
  Brain,
  HeartHandshake,
  ShieldAlert,
  Waves,
  Bolt,
  Thermometer,
  Snowflake,
  Activity,
  Stethoscope,
  User,
  Eye,
  Ear,
  Smile,
  Bug,
  Dog,
  Flower2,
  Baby,
  UserX,
  Accessibility,
  Dumbbell,
  Circle,
} from "lucide-react";
import { Language, EmergencyGuide } from "../../types";
import { translations } from "../../utils/translations";
import { getMockEmergencyGuides } from "../../utils/mockData";
import { AppHeader } from "../ui/AppHeader";

interface EmergencyGuidePageProps {
  currentLanguage: Language;
  searchTerm: string;
  selectedEmergencyGuide: EmergencyGuide | null;
  onLanguageChange: (language: Language) => void;
  onSearchChange: (term: string) => void;
  onGuideSelect: (guide: EmergencyGuide | null) => void;
  onBack: () => void;
}

export function EmergencyGuidePage({
  currentLanguage,
  searchTerm,
  selectedEmergencyGuide,
  onLanguageChange,
  onSearchChange,
  onGuideSelect,
  onBack,
}: EmergencyGuidePageProps) {
  const t = translations[currentLanguage];
  const [emergencyGuides, setEmergencyGuides] = useState<EmergencyGuide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<EmergencyGuide[]>([]);
  const prevSelectedIdRef = useRef<string | null>(null);
  const prevLanguageRef = useRef<Language>(currentLanguage);

  // Load emergency guides when language changes
  useEffect(() => {
    const guides = getMockEmergencyGuides(currentLanguage);
    setEmergencyGuides(guides);
    setFilteredGuides(guides);

    // Update selected guide when language changes and guides are loaded
    if (selectedEmergencyGuide && guides.length > 0) {
      const currentSelectedId = selectedEmergencyGuide.id;
      const updatedSelectedGuide = guides.find(
        (guide) => guide.id === currentSelectedId
      );

      // Only update if language changed (not the first render)
      if (prevLanguageRef.current !== currentLanguage && updatedSelectedGuide) {
        onGuideSelect(updatedSelectedGuide);
      } else if (!updatedSelectedGuide) {
        // If the guide is not found, reset selection
        onGuideSelect(null);
      }
    }

    // Update refs
    prevLanguageRef.current = currentLanguage;
    if (selectedEmergencyGuide) {
      prevSelectedIdRef.current = selectedEmergencyGuide.id;
    }
  }, [currentLanguage]); // Only depend on currentLanguage

  // Filter guides based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGuides(emergencyGuides);
    } else {
      const filtered = emergencyGuides.filter((guide) =>
        guide.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGuides(filtered);
    }
  }, [searchTerm, emergencyGuides]);

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    onLanguageChange(language);
  };

  // Category icons mapping - 유효한 lucide-react 아이콘들만 사용
  const getCategoryIcon = (category: string) => {
    const iconProps = { className: "w-6 h-6" };
    switch (category) {
      // 기존 아이콘들
      case "cpr":
        return <Heart {...iconProps} className="w-6 h-6 text-red-500" />;
      case "choking":
        return <Wind {...iconProps} className="w-6 h-6 text-blue-500" />;
      case "bleeding":
        return <Droplets {...iconProps} className="w-6 h-6 text-red-600" />;
      case "burns":
        return <Flame {...iconProps} className="w-6 h-6 text-orange-500" />;
      case "fracture":
        return <Bone {...iconProps} className="w-6 h-6 text-gray-600" />;
      case "poisoning":
        return <Skull {...iconProps} className="w-6 h-6 text-purple-500" />;
      case "shock":
        return <Zap {...iconProps} className="w-6 h-6 text-yellow-500" />;
      case "seizure":
        return <HeartCrack {...iconProps} className="w-6 h-6 text-pink-500" />;

      // 새로 추가된 아이콘들 - 유효한 lucide-react 아이콘들로 수정
      case "stroke":
        return <Brain {...iconProps} className="w-6 h-6 text-red-500" />;
      case "heart-attack":
        return (
          <HeartHandshake {...iconProps} className="w-6 h-6 text-red-600" />
        );
      case "allergy":
        return (
          <ShieldAlert {...iconProps} className="w-6 h-6 text-orange-600" />
        );
      case "drowning":
        return <Waves {...iconProps} className="w-6 h-6 text-blue-600" />;
      case "electric-shock":
        return <Bolt {...iconProps} className="w-6 h-6 text-yellow-600" />;
      case "heat-stroke":
        return <Thermometer {...iconProps} className="w-6 h-6 text-red-400" />;
      case "hypothermia":
        return <Snowflake {...iconProps} className="w-6 h-6 text-blue-400" />;
      case "diabetes":
        return <Activity {...iconProps} className="w-6 h-6 text-green-500" />;
      case "asthma":
        return <Stethoscope {...iconProps} className="w-6 h-6 text-teal-500" />;
      case "nosebleed":
        return <User {...iconProps} className="w-6 h-6 text-red-400" />;
      case "eye-injury":
        return <Eye {...iconProps} className="w-6 h-6 text-blue-500" />;
      case "ear-injury":
        return <Ear {...iconProps} className="w-6 h-6 text-purple-400" />;
      case "dental-trauma":
        return <Smile {...iconProps} className="w-6 h-6 text-blue-400" />;
      case "insect-bite":
        return <Bug {...iconProps} className="w-6 h-6 text-green-600" />;
      case "animal-bite":
        return <Dog {...iconProps} className="w-6 h-6 text-amber-600" />;
      case "plant-poison":
        return <Flower2 {...iconProps} className="w-6 h-6 text-green-500" />;
      case "abdominal-pain":
        return <Circle {...iconProps} className="w-6 h-6 text-orange-500" />;
      case "fainting":
        return <UserX {...iconProps} className="w-6 h-6 text-gray-500" />;
      case "hyperventilation":
        return <Wind {...iconProps} className="w-6 h-6 text-cyan-500" />;
      case "throat-obstruction":
        return <Wind {...iconProps} className="w-6 h-6 text-red-500" />;
      case "sports-injury":
        return <Dumbbell {...iconProps} className="w-6 h-6 text-green-600" />;
      case "pregnancy-emergency":
        return <Baby {...iconProps} className="w-6 h-6 text-pink-500" />;
      case "elderly-emergency":
        return (
          <Accessibility {...iconProps} className="w-6 h-6 text-indigo-500" />
        );

      default:
        return (
          <AlertTriangle {...iconProps} className="w-6 h-6 text-gray-500" />
        );
    }
  };

  // Category colors for badges
  const getCategoryColor = (category: string) => {
    switch (category) {
      // 기존 색상들
      case "cpr":
        return "bg-red-100 text-red-700 border-red-200";
      case "choking":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "bleeding":
        return "bg-red-100 text-red-800 border-red-300";
      case "burns":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "fracture":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "poisoning":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "shock":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "seizure":
        return "bg-pink-100 text-pink-700 border-pink-200";

      // 새로 추가된 색상들
      case "stroke":
        return "bg-red-100 text-red-700 border-red-200";
      case "heart-attack":
        return "bg-red-100 text-red-800 border-red-300";
      case "allergy":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "drowning":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "electric-shock":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "heat-stroke":
        return "bg-red-50 text-red-600 border-red-200";
      case "hypothermia":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "diabetes":
        return "bg-green-100 text-green-700 border-green-200";
      case "asthma":
        return "bg-teal-100 text-teal-700 border-teal-200";
      case "nosebleed":
        return "bg-red-50 text-red-600 border-red-200";
      case "eye-injury":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "ear-injury":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "dental-trauma":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "insect-bite":
        return "bg-green-100 text-green-800 border-green-300";
      case "animal-bite":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "plant-poison":
        return "bg-green-100 text-green-700 border-green-200";
      case "abdominal-pain":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "fainting":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "hyperventilation":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "throat-obstruction":
        return "bg-red-100 text-red-700 border-red-200";
      case "sports-injury":
        return "bg-green-100 text-green-800 border-green-300";
      case "pregnancy-emergency":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "elderly-emergency":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Get category name in current language
  const getCategoryName = (category: string) => {
    return (
      t.emergencyGuide.categories[
        category as keyof typeof t.emergencyGuide.categories
      ] || category
    );
  };

  if (selectedEmergencyGuide) {
    // Detailed guide view
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex justify-center">
        <div className="w-full max-w-[428px] flex flex-col">
          {/* App Header */}
          <AppHeader
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onBack={() => onGuideSelect(null)}
            showBackButton={true}
            centerContent={
              <h1 className="text-gray-800 text-center">
                {t.emergencyGuide.title}
              </h1>
            }
          />

          {/* Guide Content */}
          <div className="flex-1 pt-26 pb-6">
            <div className="relative z-10 px-5">
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="space-y-4 pb-4">
                  {/* Guide Header Card */}
                  <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-2xl">
                          {getCategoryIcon(selectedEmergencyGuide.category)}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl mb-2">
                            {selectedEmergencyGuide.title}
                          </h2>
                          <Badge
                            className={`${getCategoryColor(
                              selectedEmergencyGuide.category
                            )} border`}
                          >
                            {getCategoryName(selectedEmergencyGuide.category)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Steps Section */}
                  <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <h3 className="text-gray-800">
                          {t.emergencyGuide.steps}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {selectedEmergencyGuide.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed flex-1">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Warnings Section */}
                  <Card className="bg-red-50 border-red-200 shadow-lg border rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="text-red-700">
                          {t.emergencyGuide.warnings}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {selectedEmergencyGuide.warnings.map(
                          (warning, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                              <p className="text-sm text-red-600 leading-relaxed">
                                {warning}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* When to Call Section */}
                  <Card className="bg-yellow-50 border-yellow-200 shadow-lg border rounded-3xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-yellow-700">
                          {t.emergencyGuide.whenToCall}
                        </h3>
                      </div>
                      <p className="text-sm text-yellow-700 leading-relaxed">
                        {selectedEmergencyGuide.whenToCall}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-xs text-yellow-700 leading-relaxed">
                      {t.emergencyGuide.disclaimer}
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Guide list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex justify-center">
      <div className="w-full max-w-[428px] flex flex-col">
        {/* App Header */}
        <AppHeader
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onBack={onBack}
          showBackButton={true}
          centerContent={
            <h1 className="text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              {t.emergencyGuide.title}
            </h1>
          }
          selectBackgroundColor="yellow"
        />

        {/* Fixed Search Section */}
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] z-40 bg-gradient-to-br from-red-50/95 via-orange-50/95 to-yellow-50/95 backdrop-blur-sm border-b border-white/20 px-5 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={
                currentLanguage === "ko"
                  ? "응급상황을 검색하세요..."
                  : currentLanguage === "en"
                  ? "Search emergency situations..."
                  : currentLanguage === "mn"
                  ? "Яаралтай нөхцөлийг хайх..."
                  : "Жедел жағдайларды іздеу..."
              }
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Scrollable Guide List */}
        <div className="flex-1 pt-40">
          <div className="relative z-10 px-5">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-3 pb-4">
                {filteredGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => onGuideSelect(guide)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-xl">
                          {getCategoryIcon(guide.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-800 mb-1">{guide.title}</h3>
                          <Badge
                            className={`${getCategoryColor(
                              guide.category
                            )} border text-xs`}
                          >
                            {getCategoryName(guide.category)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredGuides.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      {currentLanguage === "ko"
                        ? "검색 결과가 없습니다"
                        : currentLanguage === "en"
                        ? "No guides found"
                        : currentLanguage === "mn"
                        ? "Гарын авлага олдсонгүй"
                        : "Нұсқау табылмады"}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Fixed Disclaimer */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] z-40 bg-gradient-to-br from-red-50/95 via-orange-50/95 to-yellow-50/95 backdrop-blur-sm border-t border-white/20 px-5 py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-700 leading-relaxed">
              {t.emergencyGuide.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
