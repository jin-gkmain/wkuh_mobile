export type Language = "ko" | "en" | "mn" | "kz";
export type Page =
  | "main"
  | "patient-info"
  | "patient-confirmation"
  | "questionnaire"
  | "questionnaire-complete"
  | "ai-chat"
  | "emergency-guide";

// User input for patient identification
export interface PatientInput {
  patientNumber: string;
  birthDate: string;
}

// Patient data from API response
export interface PatientData {
  p_idx: number;
  p_birthday: string;
  p_name_eng: string;
  p_sex: string;
  p_tall: string;
  p_weight: string;
  age?: number; // calculated field
}

// Legacy interface for backward compatibility
export interface PatientInfo {
  patientNumber: string;
  birthDate: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  gender: string;
}

export interface QuestionnaireAnswer {
  questionId: number;
  answer: string | string[] | number;
}

export interface ChatMessage {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface EmergencyGuide {
  id: string;
  title: string;
  category: string;
  steps: string[];
  warnings: string[];
  whenToCall: string;
}

export interface Question {
  id: number;
  question: string;
  type: "single" | "multiple" | "text" | "pain-scale";
  options: string[];
  hasNoneOption?: boolean;
}

// API interfaces
export interface ChatHistoryItem {
  outputs: string;
  inputs: string;
}

export interface ChatRequestPayload {
  history: ChatHistoryItem[];
  question: string;
  category: string;
  model: string;
  prompt: string;
  multiquery: boolean;
  streaming: boolean;
}

export interface ChatResponse {
  answer: string;
}

export interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

export interface PatientInfoResponse {
  p_birthday: string;
  p_idx: number;
  p_name_eng: string;
  p_sex: string;
  p_tall: string;
  p_weight: string;
}

export interface ResponseResult<T> {
  result: T[];
}

export interface Preliminary {
  p_idx: number;
  p_serial_no: string;
  p_birthday: string;
  pl_data: PreliminaryData;
}

export type PreliminaryData = {
  symptoms: string;
  pain_degree: string;
  diagnosis: string;
  treatment: string;
  specific: string;
  past_history: string;
  family_history: string;
  smoke: string;
  drink: string;
  past_surgeries: string;
  medical_history: string;
  allergy: string;
  todoc: string;
};

export type SimpleResponse = "OK" | "ERROR";
