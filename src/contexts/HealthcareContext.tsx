"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Language,
  PatientInfo,
  PatientInput,
  PatientData,
  QuestionnaireAnswer,
  ChatMessage,
  EmergencyGuide,
} from "../types";

interface HealthcareState {
  // Language and UI state
  currentLanguage: Language;
  currentQuestionIndex: number;

  // Patient information
  patientInput: PatientInput;
  patientData: PatientData | null;
  patientInfo: PatientInfo; // Legacy support
  validationErrors: { [key: string]: string };

  // Questionnaire state
  questionnaireData: {
    answers: QuestionnaireAnswer[];
    currentAnswer: string | string[] | number;
    painLevel: number[];
    otherInputs: { [questionId: number]: string }; // 기타 입력값 저장
  };

  // Chat state
  chatState: {
    messages: ChatMessage[];
    currentInput: string;
    isAITyping: boolean;
  };

  // Emergency guide state
  emergencyState: {
    searchTerm: string;
    selectedGuide: EmergencyGuide | null;
  };
}

interface HealthcareActions {
  // Language actions
  setCurrentLanguage: (language: Language) => void;

  // Patient info actions
  setPatientInput: (input: Partial<PatientInput>) => void;
  setPatientData: (data: PatientData | null) => void;
  setPatientInfo: (info: Partial<PatientInfo>) => void; // Legacy support
  setValidationErrors: (errors: { [key: string]: string }) => void;

  // Questionnaire actions
  setCurrentQuestionIndex: (index: number) => void;
  setQuestionnaireAnswers: (answers: QuestionnaireAnswer[]) => void;
  setCurrentAnswer: (answer: string | string[] | number) => void;
  setPainLevel: (painLevel: number[]) => void;
  setOtherInput: (questionId: number, value: string) => void;

  // Chat actions
  setChatMessages: (
    messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => void;
  addChatMessage: (message: ChatMessage) => void;
  setCurrentInput: (input: string) => void;
  setIsAITyping: (typing: boolean) => void;

  // Emergency guide actions
  setSearchTerm: (term: string) => void;
  setSelectedGuide: (guide: EmergencyGuide | null) => void;

  // Reset actions
  resetPatientInfo: () => void;
  resetQuestionnaire: () => void;
  resetChat: () => void;
  resetEmergencyGuide: () => void;
  resetAll: () => void;
}

type HealthcareContextType = HealthcareState & HealthcareActions;

const initialState: HealthcareState = {
  currentLanguage: "ko",
  currentQuestionIndex: 0,

  patientInput: {
    patientNumber: "",
    birthDate: "",
  },

  patientData: null,

  patientInfo: {
    patientNumber: "",
    birthDate: "",
    name: "",
    age: 0,
    height: "",
    weight: "",
    gender: "",
  },

  validationErrors: {},

  questionnaireData: {
    answers: [],
    currentAnswer: "",
    painLevel: [5],
    otherInputs: {},
  },

  chatState: {
    messages: [],
    currentInput: "",
    isAITyping: false,
  },

  emergencyState: {
    searchTerm: "",
    selectedGuide: null,
  },
};

const HealthcareContext = createContext<HealthcareContextType | undefined>(
  undefined
);

export function HealthcareProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<HealthcareState>(initialState);

  // Language actions
  const setCurrentLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, currentLanguage: language }));
  };

  // Patient info actions
  const setPatientInput = (input: Partial<PatientInput>) => {
    setState((prev) => ({
      ...prev,
      patientInput: { ...prev.patientInput, ...input },
    }));
  };

  const setPatientData = (data: PatientData | null) => {
    setState((prev) => ({
      ...prev,
      patientData: data,
    }));
  };

  const setPatientInfo = (info: Partial<PatientInfo>) => {
    setState((prev) => ({
      ...prev,
      patientInfo: { ...prev.patientInfo, ...info },
    }));
  };

  const setValidationErrors = (errors: { [key: string]: string }) => {
    setState((prev) => ({ ...prev, validationErrors: errors }));
  };

  // Questionnaire actions
  const setCurrentQuestionIndex = (index: number) => {
    setState((prev) => ({ ...prev, currentQuestionIndex: index }));
  };

  const setQuestionnaireAnswers = (answers: QuestionnaireAnswer[]) => {
    setState((prev) => ({
      ...prev,
      questionnaireData: { ...prev.questionnaireData, answers },
    }));
  };

  const setCurrentAnswer = (answer: string | string[] | number) => {
    setState((prev) => ({
      ...prev,
      questionnaireData: { ...prev.questionnaireData, currentAnswer: answer },
    }));
  };

  const setPainLevel = (painLevel: number[]) => {
    setState((prev) => ({
      ...prev,
      questionnaireData: { ...prev.questionnaireData, painLevel },
    }));
  };

  const setOtherInput = (questionId: number, value: string) => {
    setState((prev) => ({
      ...prev,
      questionnaireData: {
        ...prev.questionnaireData,
        otherInputs: {
          ...prev.questionnaireData.otherInputs,
          [questionId]: value,
        },
      },
    }));
  };

  // Chat actions
  const setChatMessages = (
    messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => {
    setState((prev) => {
      const newMessages =
        typeof messages === "function"
          ? messages(prev.chatState.messages)
          : messages;
      return {
        ...prev,
        chatState: { ...prev.chatState, messages: newMessages },
      };
    });
  };

  const addChatMessage = (message: ChatMessage) => {
    setState((prev) => ({
      ...prev,
      chatState: {
        ...prev.chatState,
        messages: [...prev.chatState.messages, message],
      },
    }));
  };

  const setCurrentInput = (input: string) => {
    setState((prev) => ({
      ...prev,
      chatState: { ...prev.chatState, currentInput: input },
    }));
  };

  const setIsAITyping = (typing: boolean) => {
    setState((prev) => ({
      ...prev,
      chatState: { ...prev.chatState, isAITyping: typing },
    }));
  };

  // Emergency guide actions
  const setSearchTerm = (term: string) => {
    setState((prev) => ({
      ...prev,
      emergencyState: { ...prev.emergencyState, searchTerm: term },
    }));
  };

  const setSelectedGuide = (guide: EmergencyGuide | null) => {
    setState((prev) => ({
      ...prev,
      emergencyState: { ...prev.emergencyState, selectedGuide: guide },
    }));
  };

  // Reset actions
  const resetPatientInfo = () => {
    setState((prev) => ({
      ...prev,
      patientInput: initialState.patientInput,
      patientData: initialState.patientData,
      patientInfo: initialState.patientInfo,
      validationErrors: {},
    }));
  };

  const resetQuestionnaire = () => {
    setState((prev) => ({
      ...prev,
      questionnaireData: {
        ...initialState.questionnaireData,
        otherInputs: {},
      },
      currentQuestionIndex: 0,
    }));
  };

  const resetChat = () => {
    setState((prev) => ({
      ...prev,
      chatState: initialState.chatState,
    }));
  };

  const resetEmergencyGuide = () => {
    setState((prev) => ({
      ...prev,
      emergencyState: initialState.emergencyState,
    }));
  };

  const resetAll = () => {
    setState(initialState);
  };

  const contextValue: HealthcareContextType = {
    ...state,
    setCurrentLanguage,
    setPatientInput,
    setPatientData,
    setPatientInfo,
    setValidationErrors,
    setCurrentQuestionIndex,
    setQuestionnaireAnswers,
    setCurrentAnswer,
    setPainLevel,
    setOtherInput,
    setChatMessages,
    addChatMessage,
    setCurrentInput,
    setIsAITyping,
    setSearchTerm,
    setSelectedGuide,
    resetPatientInfo,
    resetQuestionnaire,
    resetChat,
    resetEmergencyGuide,
    resetAll,
  };

  return (
    <HealthcareContext.Provider value={contextValue}>
      {children}
    </HealthcareContext.Provider>
  );
}

export function useHealthcare() {
  const context = useContext(HealthcareContext);
  if (context === undefined) {
    throw new Error("useHealthcare must be used within a HealthcareProvider");
  }
  return context;
}
