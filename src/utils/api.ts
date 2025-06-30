import axios from "axios";
import {
  ChatHistoryItem,
  ChatRequestPayload,
  ChatResponse,
  ChatMessage,
  PatientInfoResponse,
  ResponseResult,
  Preliminary,
  SimpleResponse,
} from "../types";

// API configuration
const CHATBOT_ENDPOINT = "https://ai.koihealth-live.com/text";
const PATIENT_INFO_ENDPOINT = "https://dev-api.tsp-live.com/patient_detail2";
const PRELIMINARY_ENDPOINT = "https://dev-api.tsp-live.com/preliminary_regist";

// API function to call chatbot
export const fetchChatbotResponse = async (
  history: ChatHistoryItem[],
  question: string
): Promise<string> => {
  const payload: ChatRequestPayload = {
    history,
    question,
    category: "A",
    model: "gpt-4o-mini",
    prompt: "",
    multiquery: false,
    streaming: false,
  };

  try {
    const response = await axios.post<ChatResponse>(CHATBOT_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 seconds timeout
    });

    if (response.data && response.data.answer) {
      return response.data.answer;
    }
    throw new Error("API 응답에서 answer를 찾을 수 없습니다.");
  } catch (error) {
    console.error("챗봇 API 호출 오류:", error);
    throw error;
  }
};

// Convert chat messages to API history format
export const convertToAPIHistory = (
  messages: ChatMessage[]
): ChatHistoryItem[] => {
  const history: ChatHistoryItem[] = [];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.type === "user") {
      const nextMessage = messages[i + 1];
      if (nextMessage && nextMessage.type === "ai") {
        history.push({
          inputs: message.content,
          outputs: nextMessage.content,
        });
      }
    }
  }

  return history;
};

export const fetchPatientInfo = async (
  patientNumber: string,
  birthDate: string
): Promise<PatientInfoResponse> => {
  try {
    const response = await axios.post<ResponseResult<PatientInfoResponse>>(
      PATIENT_INFO_ENDPOINT,
      {
        p_serial_no: patientNumber,
        p_birthday: birthDate,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000, // 30 seconds timeout
      }
    );

    if (
      !response.data ||
      !response.data.result ||
      response.data.result.length === 0
    ) {
      throw new Error("환자 정보를 찾을 수 없습니다.");
    }

    return response.data.result[0];
  } catch (error) {
    console.error("환자 정보 API 호출 오류:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("환자 정보를 찾을 수 없습니다.");
      } else if (error.response?.status === 400) {
        throw new Error("잘못된 환자 번호 또는 생년월일입니다.");
      }
    }
    throw error;
  }
};

export const fetchPreliminary = async (
  request: Preliminary
): Promise<SimpleResponse[]> => {
  try {
    const response = await axios.post<ResponseResult<SimpleResponse>>(
      PRELIMINARY_ENDPOINT,
      request,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000, // 30 seconds timeout
      }
    );

    if (!response.data || !response.data.result) {
      throw new Error("예비 등록 처리 중 오류가 발생했습니다.");
    }

    return response.data.result;
  } catch (error) {
    console.error("예비 등록 API 호출 오류:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("잘못된 요청 데이터입니다.");
      } else if (error.response?.status === 500) {
        throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    throw error;
  }
};
