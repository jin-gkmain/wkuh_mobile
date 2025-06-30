"use client";

import React from "react";
import { Button } from "./button";
import { ArrowLeft, Globe } from "lucide-react";
import { Language } from "../../types";
import { languageOptions } from "../../utils/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface AppHeaderProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  centerContent?: React.ReactNode;
  className?: string;
  selectBackgroundColor?: "default" | "yellow";
}

export function AppHeader({
  currentLanguage,
  onLanguageChange,
  onBack,
  showBackButton = false,
  centerContent,
  className = "",
  selectBackgroundColor = "default",
}: AppHeaderProps) {
  const selectBackgroundColorClass =
    selectBackgroundColor === "yellow"
      ? "bg-gradient-to-br from-yellow-50/95 via-orange-50/95 to-yellow-50/95"
      : "bg-gradient-to-br from-green-100/95 via-blue-50/95 to-purple-100/95";

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[428px] z-50 backdrop-blur-sm border-b border-white/20 px-5 pt-8 pb-4 flex items-center justify-between ${className} ${selectBackgroundColorClass}`}
    >
      {showBackButton && onBack ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Button>
      ) : (
        <div className="w-10" />
      )}

      {centerContent && <div className="text-center">{centerContent}</div>}

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
  );
}
