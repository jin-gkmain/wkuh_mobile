import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
import { ArrowLeft, ArrowRight, ClipboardList, Heart } from "lucide-react";
import { Language } from "../../types";
import { translations } from "../../utils/translations";
import { AppHeader } from "../ui/AppHeader";

interface QuestionnairePageProps {
  currentLanguage: Language;
  currentQuestionIndex: number;
  currentAnswer: string | string[] | number;
  painLevel: number[];
  otherInputs: { [questionId: number]: string };
  onLanguageChange: (language: Language) => void;
  onAnswerChange: (answer: string | string[] | number) => void;
  onPainLevelChange: (level: number[]) => void;
  onOtherInputChange: (questionId: number, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  onBack: () => void;
}

export function QuestionnairePage({
  currentLanguage,
  currentQuestionIndex,
  currentAnswer,
  painLevel,
  otherInputs,
  onLanguageChange,
  onAnswerChange,
  onPainLevelChange,
  onOtherInputChange,
  onNext,
  onPrevious,
  onComplete,
  onBack,
}: QuestionnairePageProps) {
  const t = translations[currentLanguage];
  const currentQuestion = t.questionnaire.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / t.questionnaire.questions.length) * 100;

  // Text area placeholder translations
  const textPlaceholders = {
    ko: "여기에 답변을 입력해주세요...",
    en: "Please enter your answer here...",
    mn: "Энд хариултаа оруулна уу...",
    kz: "Жауабыңызды осы жерге енгізіңіз...",
  };

  // Pain level descriptions
  const getPainDescription = (level: number) => {
    const descriptions = t.questionnaire.painScale.labels;
    if (level <= 2) return descriptions[0]; // 매우 약함
    if (level <= 4) return descriptions[1]; // 약함
    if (level <= 6) return descriptions[2]; // 보통
    if (level <= 8) return descriptions[3]; // 심함
    return descriptions[4]; // 매우 심함
  };

  // "기타" 옵션인지 확인하는 함수
  const isOtherOption = (option: string) => {
    return (
      option === "기타" ||
      option === "Other" ||
      option === "Бусад" ||
      option === "Басқа"
    );
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[428px] flex flex-col">
        {/* App Header */}
        <AppHeader
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          onBack={onBack}
          showBackButton={true}
          centerContent={
            <p className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {t.questionnaire.questions.length}
            </p>
          }
        />

        {/* Main Content with padding to account for fixed header */}
        <div className="flex-1 pt-24 pb-6 flex flex-col">
          {/* Progress Bar */}
          <div className="relative z-10 px-5 mb-6">
            <Progress value={progress} className="h-2" />
          </div>

          <div className="relative z-10 px-5 pt-2 pb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-gray-800 mb-3 text-xl">
              {t.questionnaire.title}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-teal-400"></div>
              <Heart className="w-4 h-4 text-teal-500" />
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>
          </div>

          <div className="relative z-10 px-5 flex-1 flex flex-col">
            <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-gray-800 mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  {/* Single choice questions */}
                  {currentQuestion.type === "single" && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = currentAnswer === option;
                        const isOther = isOtherOption(option);
                        return (
                          <div key={index}>
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              className={`w-full text-left justify-start p-4 h-auto ${
                                isSelected
                                  ? "bg-teal-500 text-white border-teal-500"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => onAnswerChange(option)}
                            >
                              {option}
                            </Button>

                            {/* 기타 입력 필드 */}
                            {isOther && isSelected && (
                              <div className="mt-2 ml-4">
                                <input
                                  type="text"
                                  placeholder={
                                    textPlaceholders[currentLanguage]
                                  }
                                  value={otherInputs[currentQuestion.id] || ""}
                                  onChange={(e) =>
                                    onOtherInputChange(
                                      currentQuestion.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* None button for single choice */}
                      {currentQuestion.hasNoneOption && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button
                            variant={
                              currentAnswer === t.questionnaire.noneButton
                                ? "default"
                                : "outline"
                            }
                            className={`w-full text-left justify-start p-4 h-auto ${
                              currentAnswer === t.questionnaire.noneButton
                                ? "bg-gray-500 text-white border-gray-500"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              onAnswerChange(t.questionnaire.noneButton)
                            }
                          >
                            {t.questionnaire.noneButton}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Multiple choice questions */}
                  {currentQuestion.type === "multiple" && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected =
                          Array.isArray(currentAnswer) &&
                          currentAnswer.includes(option);
                        const isOther = isOtherOption(option);
                        return (
                          <div key={index}>
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              className={`w-full text-left justify-start p-4 h-auto ${
                                isSelected
                                  ? "bg-teal-500 text-white border-teal-500"
                                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                const currentAnswers = Array.isArray(
                                  currentAnswer
                                )
                                  ? currentAnswer
                                  : [];
                                const noneText = t.questionnaire.noneButton;

                                if (isSelected) {
                                  onAnswerChange(
                                    currentAnswers.filter((a) => a !== option)
                                  );
                                } else {
                                  // Remove "None" if selecting another option
                                  const updatedAnswers = currentAnswers.filter(
                                    (a) => a !== noneText
                                  );
                                  onAnswerChange([...updatedAnswers, option]);
                                }
                              }}
                            >
                              {option}
                            </Button>

                            {/* 기타 입력 필드 */}
                            {isOther && isSelected && (
                              <div className="mt-2 ml-4">
                                <input
                                  type="text"
                                  placeholder={
                                    textPlaceholders[currentLanguage]
                                  }
                                  value={otherInputs[currentQuestion.id] || ""}
                                  onChange={(e) =>
                                    onOtherInputChange(
                                      currentQuestion.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* None button for multiple choice */}
                      {currentQuestion.hasNoneOption && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Button
                            variant={
                              Array.isArray(currentAnswer) &&
                              currentAnswer.includes(t.questionnaire.noneButton)
                                ? "default"
                                : "outline"
                            }
                            className={`w-full text-left justify-start p-4 h-auto ${
                              Array.isArray(currentAnswer) &&
                              currentAnswer.includes(t.questionnaire.noneButton)
                                ? "bg-gray-500 text-white border-gray-500"
                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              const currentAnswers = Array.isArray(
                                currentAnswer
                              )
                                ? currentAnswer
                                : [];
                              const noneText = t.questionnaire.noneButton;

                              if (currentAnswers.includes(noneText)) {
                                // Remove "None" selection
                                onAnswerChange(
                                  currentAnswers.filter((a) => a !== noneText)
                                );
                              } else {
                                // Select "None" and clear all other selections
                                onAnswerChange([noneText]);
                              }
                            }}
                          >
                            {t.questionnaire.noneButton}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pain scale questions */}
                  {currentQuestion.type === "pain-scale" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          {t.questionnaire.painScale.title}
                        </p>
                      </div>

                      {/* Vertical Pain Scale Slider */}
                      <div className="flex justify-center">
                        <div className="relative bg-gray-100 rounded-full p-4 h-80 w-20">
                          {/* Scale markers */}
                          <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between items-center w-full">
                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                              <div
                                key={num}
                                className="flex items-center w-full"
                              >
                                <div className="w-3 h-0.5 bg-gray-400"></div>
                                <span className="text-xs text-gray-500 ml-2 w-4">
                                  {num}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Vertical Slider */}
                          <div className="absolute left-8 top-4 bottom-4 w-6">
                            <Slider
                              value={painLevel}
                              onValueChange={(value) => {
                                onPainLevelChange(value);
                                onAnswerChange(value[0]);
                              }}
                              max={10}
                              min={1}
                              step={1}
                              orientation="vertical"
                              className="h-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Current pain level display */}
                      <div className="text-center bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">
                          {t.questionnaire.painScale.currentLevel}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl text-teal-600">
                            {painLevel[0]}
                          </span>
                          <span className="text-sm text-gray-500">/ 10</span>
                        </div>
                        <p className="text-sm text-teal-600 mt-1">
                          {getPainDescription(painLevel[0])}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Text input questions */}
                  {currentQuestion.type === "text" && (
                    <Textarea
                      placeholder={textPlaceholders[currentLanguage]}
                      value={
                        typeof currentAnswer === "string" ? currentAnswer : ""
                      }
                      onChange={(e) => onAnswerChange(e.target.value)}
                      className="w-full min-h-[120px] resize-none"
                    />
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="outline"
                    onClick={onPrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.questionnaire.previousButton}
                  </Button>

                  <Button
                    onClick={
                      currentQuestionIndex ===
                      t.questionnaire.questions.length - 1
                        ? onComplete
                        : onNext
                    }
                    disabled={
                      (!currentAnswer ||
                        (Array.isArray(currentAnswer) &&
                          currentAnswer.length === 0)) &&
                      currentQuestion.type !== "pain-scale"
                    }
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2"
                  >
                    {currentQuestionIndex ===
                    t.questionnaire.questions.length - 1
                      ? t.questionnaire.completeButton
                      : t.questionnaire.nextButton}
                    {currentQuestionIndex !==
                      t.questionnaire.questions.length - 1 && (
                      <ArrowRight className="w-4 h-4 ml-2" />
                    )}
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
