import { Language, Question } from "../types";

export const translations = {
  ko: {
    title: "신뢰할 수 있는\n디지털 헬스케어",
    subtitle:
      "원격 협진 일정 관리부터 사전 문진표 작성,\nAI 챗봇으로 간단 상담과 다양한 의료 정보를\n안전하고 전문적으로 받아보세요.",
    preScreening: {
      title: "문진표 작성",
      description:
        "진료 전, 간단한 문진표를 작성해\n의료진에게 정확한 정보를 전달하세요.",
      button: "작성하기",
    },
    aiConsultation: {
      title1: "궁금한 정보를",
      title2: "AI에게 물어보세요",
      description:
        "궁금한 건강, 질병, 병원 정보를\nAI가 쉽고 정확하게 알려드립니다.",
      button: "상담하기",
    },
    emergencyGuide: {
      title: "응급처치 가이드",
      description: "응급상황 발생 시 올바른 대처법을\n단계별로 안내해드립니다.",
      button: "가이드 보기",
      emergencyNumber: "응급전화: 119",
      categories: {
        cpr: "심폐소생술",
        choking: "기도폐쇄",
        bleeding: "출혈",
        burns: "화상",
        fracture: "골절",
        poisoning: "중독",
        shock: "쇼크",
        seizure: "경련",
      },
      steps: "처치 단계",
      warnings: "주의사항",
      whenToCall: "119 신고 시기",
      callEmergency: "119 신고하기",
      disclaimer:
        "⚠️ 응급상황 시 즉시 119에 신고하고 전문 의료진의 도움을 받으시기 바랍니다.",
    },
    aiChat: {
      title: "AI 건강 상담",
      systemMessage:
        "궁금한 증상이 있나요? AI가 의료, 건강, 영양정보까지 친절하게 알려드릴게요😊",
      inputPlaceholder: "증상이나 건강 관련 질문을 입력해주세요...",
      sendButton: "전송",
      aiTyping: "AI가 답변을 작성하고 있습니다...",
      disclaimer:
        "⚠️ 본 AI 상담은 참고용이며, 정확한 진단을 위해서는 반드시 의료진과 상담하시기 바랍니다.",
      errorMessage:
        "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      networkError: "네트워크 연결을 확인해주세요.",
    },
    patientInfo: {
      title: "환자 정보 입력",
      subtitle: "문진표 작성을 위해\n환자 정보을 입력해주세요.",
      patientNumber: "환자번호",
      patientNumberPlaceholder: "환자번호를 입력하세요",
      birthDate: "생년월일",
      birthDatePlaceholder: "YYYY-MM-DD",
      confirmButton: "확인",
      validation: {
        patientNumberRequired: "환자번호를 입력해주세요.",
        birthDateRequired: "생년월일을 입력해주세요.",
        birthDateInvalid: "올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD).",
      },
      errorMessage: "환자 정보를 조회하는 중 오류가 발생했습니다.",
    },
    patientConfirmation: {
      title: "환자 정보 확인",
      subtitle: "아래 정보가 맞는지 확인해주세요.",
      name: "이름",
      age: "나이",
      height: "키",
      weight: "몸무게",
      gender: "성별",
      startButton: "시작하기",
      editButton: "수정하기",
    },
    questionnaire: {
      title: "문진표",
      subtitle: "질문에 답변해주세요",
      nextButton: "다음",
      previousButton: "이전",
      completeButton: "완료",
      noneButton: "없음",
      painScale: {
        title: "통증 정도를 선택해주세요",
        labels: ["매우 약함", "약함", "보통", "심함", "매우 심함"],
        currentLevel: "현재 선택한 통증 정도",
      },
      questions: [
        {
          id: 1,
          question: "어떤 증상이 있으신가요?",
          type: "multiple",
          options: [
            "두통",
            "가슴통증",
            "복통",
            "기침",
            "열",
            "매스꺼움/구토",
            "설사/변비",
            "피부 발진",
            "생리 이상",
            "우울 불안",
            "기타",
          ],
          hasNoneOption: true,
        },
        {
          id: 2,
          question: "이번에 발생한 통증은 어느 정도로 아프신가요?",
          type: "pain-scale",
          options: [],
        },
        {
          id: 3,
          question: "진단명이 무엇인가요?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 4,
          question: "그 동안 받은 치료가 있나요?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 5,
          question: "한국에서 받기 원하는 치료 항목이 있나요?",
          type: "text",
          options: [],
        },
        {
          id: 6,
          question: "과거에 아래의 병력이 있었다면 모두 선택 해주세요.",
          type: "multiple",
          options: ["고혈압", "당뇨병", "결핵", "암", "기타"],
          hasNoneOption: true,
        },
        {
          id: 7,
          question: "가족중 아래의 질환이 있다면 모두 선택 해주세요.",
          type: "multiple",
          options: ["고혈압", "당뇨병", "결핵", "암", "기타"],
          hasNoneOption: true,
        },
        {
          id: 8,
          question: "흡연을 하시나요?",
          type: "single",
          options: ["예", "아니오", "과거에 피웠지만 끊었음"],
        },
        {
          id: 9,
          question: "음주를 하시나요?",
          type: "single",
          options: ["예", "아니오"],
        },
        {
          id: 10,
          question: "과거에 수술 받은 경험이 있나요?",
          type: "multiple",
          options: [
            "맹장 수술",
            "제왕절개",
            "담낭 제거 수술",
            "정형외과 수술",
            "심장 수술",
            "종양 제거 수술",
            "기타",
          ],
          hasNoneOption: true,
        },
        {
          id: 11,
          question: "과거에 먹은 약물을 입력해주세요.",
          type: "text",
          options: [],
        },
        {
          id: 12,
          question: "알레르기가 있으신가요?",
          type: "multiple",
          options: [
            "약물",
            "음식",
            "꽃가루",
            "동물 털",
            "먼지",
            "금속",
            "기타",
          ],
          hasNoneOption: true,
        },
        {
          id: 13,
          question: "의료진에게 전달 할 내용이 있나요?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
      ] as Question[],
    },
    languageSelect: "언어 선택",
  },
  en: {
    title: "Trusted Digital\nHealthcare",
    subtitle:
      "From telemedicine appointment management to pre-consultation questionnaires,\nget simple AI chatbot consultations and various medical information\nsafely and professionally.",
    preScreening: {
      title: "Fill Medical Form",
      description:
        "Complete a simple medical questionnaire before your appointment\nto provide accurate information to healthcare professionals.",
      button: "Start Form",
    },
    aiConsultation: {
      title1: "Ask AI About",
      title2: "Your Health Questions",
      description:
        "Get easy and accurate information about health,\ndiseases, and hospital services from our AI.",
      button: "Consult Now",
    },
    emergencyGuide: {
      title: "Emergency Guide",
      description:
        "Step-by-step emergency response guide\nfor various urgent situations.",
      button: "View Guide",
      emergencyNumber: "Emergency: 119",
      categories: {
        cpr: "CPR",
        choking: "Choking",
        bleeding: "Bleeding",
        burns: "Burns",
        fracture: "Fracture",
        poisoning: "Poisoning",
        shock: "Shock",
        seizure: "Seizure",
      },
      steps: "Steps",
      warnings: "Warnings",
      whenToCall: "When to Call 119",
      callEmergency: "Call 119",
      disclaimer:
        "⚠️ In emergency situations, immediately call 119 and seek professional medical help.",
    },
    aiChat: {
      title: "AI Health Consultation",
      systemMessage:
        "Do you have any symptoms you're curious about? AI will kindly provide medical, health, and nutrition information😊",
      inputPlaceholder:
        "Please enter your symptoms or health-related questions...",
      sendButton: "Send",
      aiTyping: "AI is preparing a response...",
      disclaimer:
        "⚠️ This AI consultation is for reference only. Please consult with medical professionals for accurate diagnosis.",
      errorMessage:
        "Sorry, a temporary error occurred. Please try again later.",
      networkError: "Please check your network connection.",
    },
    patientInfo: {
      title: "Patient Information",
      subtitle:
        "Please enter your patient information\nto fill out the medical questionnaire.",
      patientNumber: "Patient Number",
      patientNumberPlaceholder: "Enter your patient number",
      birthDate: "Date of Birth",
      birthDatePlaceholder: "YYYY-MM-DD",
      confirmButton: "Confirm",
      validation: {
        patientNumberRequired: "Please enter patient number.",
        birthDateRequired: "Please enter date of birth.",
        birthDateInvalid: "Please enter valid date format (YYYY-MM-DD).",
      },
      errorMessage: "Patient information lookup failed.",
    },
    patientConfirmation: {
      title: "Patient Information",
      subtitle: "Please confirm the information below.",
      name: "Name",
      age: "Age",
      height: "Height",
      weight: "Weight",
      gender: "Gender",
      startButton: "Start",
      editButton: "Edit",
    },
    questionnaire: {
      title: "Medical Questionnaire",
      subtitle: "Please answer the questions",
      nextButton: "Next",
      previousButton: "Previous",
      completeButton: "Complete",
      noneButton: "None",
      painScale: {
        title: "Please select your pain level",
        labels: ["Very mild", "Mild", "Moderate", "Severe", "Very severe"],
        currentLevel: "Current pain level",
      },
      questions: [
        {
          id: 1,
          question: "What symptoms do you have?",
          type: "multiple",
          options: [
            "Headache",
            "Chest pain",
            "Abdominal pain",
            "Cough",
            "Fever",
            "Nausea/Vomiting",
            "Diarrhea/Constipation",
            "Skin rash",
            "Menstrual irregularities",
            "Depression/Anxiety",
            "Other",
          ],
          hasNoneOption: true,
        },
        {
          id: 2,
          question: "How severe is your current pain?",
          type: "pain-scale",
          options: [],
        },
        {
          id: 3,
          question: "What is your diagnosis?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 4,
          question: "What treatments have you received?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 5,
          question: "What treatments would you like to receive in Korea?",
          type: "text",
          options: [],
        },
        {
          id: 6,
          question: "Please select any past medical history:",
          type: "multiple",
          options: [
            "Hypertension",
            "Diabetes",
            "tuberculosis",
            "Cancer",
            "Other",
          ],
          hasNoneOption: true,
        },
        {
          id: 7,
          question: "Please select any family medical history:",
          type: "multiple",
          options: [
            "Hypertension",
            "Diabetes",
            "tuberculosis",
            "Cancer",
            "Other",
          ],
          hasNoneOption: true,
        },
        {
          id: 8,
          question: "Do you smoke?",
          type: "single",
          options: ["Yes", "No", "I used to smoke but quit"],
        },
        {
          id: 9,
          question: "Do you drink alcohol?",
          type: "single",
          options: ["Yes", "No"],
        },
        {
          id: 10,
          question: "Have you had surgery before?",
          type: "multiple",
          options: [
            "Appendectomy",
            "C-section",
            "Gallbladder removal surgery",
            "Orthopedic surgery",
            "Heart surgery",
            "Cancer surgery",
            "Other",
          ],
          hasNoneOption: true,
        },
        {
          id: 11,
          question: "Please list any medications you have taken:",
          type: "text",
          options: [],
        },
        {
          id: 12,
          question: "Do you have any allergies?",
          type: "multiple",
          options: [
            "Medication",
            "Food",
            "Pollen",
            "Pet",
            "Dust",
            "Metal",
            "Other",
          ],
          hasNoneOption: true,
        },
        {
          id: 13,
          question: "Any additional information for the medical team?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
      ] as Question[],
    },
    languageSelect: "Select Language",
  },
  mn: {
    title: "Найдвартай дижитал\nэрүүл мэндийн тусламж",
    subtitle:
      "Зайны оношилгооны цаг товлолтоос эхлээд урьдчилсан асуулга бөглөх,\nAI чатботоор хялбар зөвлөгөө авах болон олон төрлийн эмнэлгийн мэдээллийг\nаюулгүй, мэргэжлийн түвшинд авах боломжтой.",
    preScreening: {
      title: "Асуулга бөглөх",
      description:
        "Эмчлүүлэхээс өмнө энгийн асуулга бөглөж\nэмч нарт зөв мэдээлэл өгөөрэй.",
      button: "Бөглөх",
    },
    aiConsultation: {
      title1: "Сонирхсон мэдээллээ",
      title2: "AI-д асуугаарай",
      description:
        "Эрүүл мэнд, өвчин, эмнэлгийн мэдээллийг\nAI хялбар бөгөөд зөв хэлж өгнө.",
      button: "Зөвлөлдөх",
    },
    emergencyGuide: {
      title: "Яаралтай тусламжийн гарын авлага",
      description:
        "Яаралтай тохиолдлын үед зөв арга хэмжээг\nшат дараатайгаар заана.",
      button: "Гарын авлага үзэх",
      emergencyNumber: "Яаралтай дуудлага: 103",
      categories: {
        cpr: "Зүрхэнд массаж",
        choking: "Амьсгалын зам бөглөрөх",
        bleeding: "Цус алдах",
        burns: "Түлэгдэх",
        fracture: "Хугарал",
        poisoning: "Хордлого",
        shock: "Шок",
        seizure: "Татаж авах",
      },
      steps: "Алхамууд",
      warnings: "Анхааруулга",
      whenToCall: "Хэзээ 103 руу залгах",
      callEmergency: "103 руу залгах",
      disclaimer:
        "⚠️ Яаралтай тохиолдолд шууд 103 руу залгаж мэргэжлийн тусламж авна уу.",
    },
    aiChat: {
      title: "AI эрүүл мэндийн зөвлөгөө",
      systemMessage:
        "Таныг сонирхож буй шинж тэмдэг байна уу? AI нь эмнэлэг, эрүүл мэнд, хоол тэжээлийн мэдээллийг найрсаг өгөх болно😊",
      inputPlaceholder:
        "Шинж тэмдэг эсвэл эрүүл мэндтэй холбоотой асуултаа оруулна уу...",
      sendButton: "Илгээх",
      aiTyping: "AI хариулт бэлтгэж байна...",
      disclaimer:
        "⚠️ Энэхүү AI зөвлөгөө нь зөвхөн лавлагаа болгоноор ашиглагдах бөгөөд үнэн зөв оношлуулахын тулд эмч нартай заавал зөвлөлдөх хэрэгтэй.",
      errorMessage: "Уучлаарай, түр зуурын алдаа гарлаа. Дахин оролдоно уу.",
      networkError: "Сүлжээний холболтоо шалгана уу.",
    },
    patientInfo: {
      title: "Өвчтөний мэдээлэл",
      subtitle: "Асуулга бөглөхийн тулд\nөвчтөний мэдээллээ оруулна уу.",
      patientNumber: "Өвчтөний дугаар",
      patientNumberPlaceholder: "Өвчтөний дугаараа оруулна уу",
      birthDate: "Төрсөн огноо",
      birthDatePlaceholder: "ЖЖЖЖ-СС-ӨӨ",
      confirmButton: "Баталгаажуулах",
      validation: {
        patientNumberRequired: "Өвчтөний дугаараа оруулна уу.",
        birthDateRequired: "Төрсөн огноогоо оруулна уу.",
        birthDateInvalid: "Зөв огнооны хэлбэр оруулна уу (ЖЖЖЖ-СС-ӨӨ).",
      },
      errorMessage: "Өвчтөний мэдээлэл олж авах үед алдаа гарлаа.",
    },
    patientConfirmation: {
      title: "Өвчтөний мэдээлэл",
      subtitle: "Доорх мэдээлэл зөв эсэхийг шалгана уу.",
      name: "Нэр",
      age: "Нас",
      height: "Өндөр",
      weight: "Жин",
      gender: "Хүйс",
      startButton: "Эхлэх",
      editButton: "Засах",
    },
    questionnaire: {
      title: "Асуулга",
      subtitle: "Асуултад хариулна уу",
      nextButton: "Дараах",
      previousButton: "Өмнөх",
      completeButton: "Дуусгах",
      noneButton: "Үгүй",
      painScale: {
        title: "Өвдөлтийн түвшинг сонгоно уу",
        labels: ["Маш бага", "Бага", "Дунд зэрэг", "Их", "Маш их"],
        currentLevel: "Одоогийн өвдөлтийн түвшин",
      },
      questions: [
        {
          id: 1,
          question: "Танд ямар шинж тэмдэг илэрч байна вэ?",
          type: "multiple",
          options: [
            "Толгой өвдөх", // 두통
            "Цээжээр өвдөх", // 가슴 통증
            "Гэдэс өвдөх", // 복통
            "Ханиалгах", // 기침
            "Халуурах", // 열
            "Дотор муухайрах / Бөөлжих", // 메스꺼움 / 구토
            "Суулгах / Өтгөн хатах", // 설사 / 변비
            "Арьсны тууралт", // 피부 발진
            "Сарын тэмдгийн хямрал", // 생리 이상
            "Сэтгэл гутрал / Түгшүүр", // 우울 / 불안
            "Бусад",
          ],
          hasNoneOption: true,
        },
        {
          id: 2,
          question: "Энэ удаагийн өвдөлт хэр зэрэг хүчтэй байна вэ?",
          type: "pain-scale",
          options: [],
        },
        {
          id: 3,
          question: "Танд оношлогдсон өвчин юу вэ?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 4,
          question: "Өмнө нь ямар нэгэн эмчилгээ хийлгэж байсан уу?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 5,
          question:
            "Та Солонгост авахыг хүсэж буй тодорхой эмчилгээний зүйл байна уу?",
          type: "text",
          options: [],
        },
        {
          id: 6,
          question: "Өмнө нь байсан өвчнүүдээ бүгдийг сонгоно уу.",
          type: "multiple",
          options: [
            "Цусны даралт ихсэлт",
            "Чихрийн шижин",
            "Сүрьеэ",
            "Хавдар",
            "Бусад",
          ],
          hasNoneOption: true,
        },
        {
          id: 7,
          question:
            "Таны гэр бүлийн гишүүдийн аль нэг нь дараах өвчнүүдээс аль нэгээр өвчилж байсан бол сонгоно уу.",
          type: "multiple",
          options: [
            "Цусны даралт ихсэлт",
            "Чихрийн шижин",
            "Сүрьеэ",
            "Хавдар",
            "Бусад",
          ],
          hasNoneOption: true,
        },
        {
          id: 8,
          question: "Та тамхи татдаг уу?",
          type: "single",
          options: ["Тийм", "Үгүй", "Өмнө нь татдаг байсан, одоо больсон"],
        },
        {
          id: 9,
          question: "Та архи уудаг уу?",
          type: "single",
          options: ["Тийм", "Үгүй"],
        },
        {
          id: 10,
          question: "Та өмнө нь мэс засал хийлгэж байсан уу?",
          type: "multiple",
          options: [
            "мухар олгойн мэс засал",
            "Хүүхэд төрүүлэх зорилготой кесар хагалгаа",
            "Цөс авах мэс засал",
            "Ясны мэс засал",
            "Зүрхний мэс засал",
            "Хавдар авах мэс засал",
            "Бусад",
          ],
          hasNoneOption: true,
        },
        {
          id: 11,
          question: "Өмнө нь ууж байсан эмийг оруулна уу.",
          type: "text",
          options: [],
        },
        {
          id: 12,
          question: "Танд харшил бий юу?",
          type: "multiple",
          options: [
            "Эмийн харшил",
            "Хүнсний харшил",
            "Тоосонцрын / улирлын харшил",
            "Амьтны үсээр харшил",
            "Тоос шороо / хачигийн харшил",
            "Металлын харшил (жишээ нь: никель)",
            "Бусад",
          ],
          hasNoneOption: true,
        },
        {
          id: 13,
          question: "Эмчдэд хэлэх зүйл байна уу?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
      ] as Question[],
    },
    languageSelect: "Хэл сонгох",
  },
  kz: {
    title: "Сенімді цифрлық\nденсаулық сақтау",
    subtitle:
      "Қашықтықтан емдеу кестесін басқарудан бастап алдын ала сауалнама толтыруға дейін,\nAI чатботымен қарапайым кеңес алу және әртүрлі медициналық ақпаратты\nқауіпсіз және кәсіби түрде алыңыз.",
    preScreening: {
      title: "Сауалнама толтыру",
      description:
        "Емделуден бұрын қарапайым сауалнама толтырып,\nмедицина қызметкерлеріне дұрыс ақпарат беріңіз.",
      button: "Толтыру",
    },
    aiConsultation: {
      title1: "Қызықты ақпаратты",
      title2: "AI-ден сұраңыз",
      description:
        "Денсаулық, ауру, аурухана туралы ақпаратты\nAI оңай және дәл айтып береді.",
      button: "Кеңес алу",
    },
    emergencyGuide: {
      title: "Жедел жәрдем нұсқауы",
      description:
        "Жедел жағдайларда дұрыс әрекет ету\nтәсілдерін қадам бойынша көрсетеді.",
      button: "Нұсқауды көру",
      emergencyNumber: "Жедел жәрдем: 103",
      categories: {
        cpr: "Жасанды тыныс алдыру",
        choking: "Тыныс алу жолының бітелуі",
        bleeding: "Қан кету",
        burns: "Күйік",
        fracture: "Сынық",
        poisoning: "Уланып қалу",
        shock: "Шок",
        seizure: "Тырысу",
      },
      steps: "Қадамдар",
      warnings: "Ескертулер",
      whenToCall: "103-ке қашан қоңырау шалу",
      callEmergency: "103-ке қоңырау шалу",
      disclaimer:
        "⚠️ Жедел жағдайларда дереу 103-ке қоңырау шалып, кәсіби медициналық көмек алыңыз.",
    },
    aiChat: {
      title: "AI денсаулық кеңесі",
      systemMessage:
        "Сізді қызықтырған симптомдар бар ма? AI медициналық, денсаулық және тамақтану ақпаратын мейірімді түрде береді😊",
      inputPlaceholder:
        "Симптомдарыңызды немесе денсаулыққа қатысты сұрақтарыңызды енгізіңіз...",
      sendButton: "Жіберу",
      aiTyping: "AI жауап дайындап жатыр...",
      disclaimer:
        "⚠️ Бұл AI кеңесі тек анықтама үшін ғана. Дәл диагноз алу үшін медицина қызметкерлерімен міндетті түрде кеңесіңіз.",
      errorMessage:
        "Кешіріңіз, уақытша қате пайда болды. Сәл кейін қайталап көріңіз.",
      networkError: "Желі байланысын тексеріңіз.",
    },
    patientInfo: {
      title: "Науқас ақпараты",
      subtitle: "Сауалнама толтыру үшін\nнауқас ақпаратын енгізіңіз.",
      patientNumber: "Науқас нөірі",
      patientNumberPlaceholder: "Науқас нөміріңізді енгізіңіз",
      birthDate: "Туған күні",
      birthDatePlaceholder: "ЖЖЖЖ-АА-КК",
      confirmButton: "Растау",
      validation: {
        patientNumberRequired: "Науқас нөміріңізді енгізіңіз.",
        birthDateRequired: "Туған күніңізді енгізіңіз.",
        birthDateInvalid: "Дұрыс күн форматын енгізіңіз (ЖЖЖЖ-АА-КК).",
      },
      errorMessage: "Науқас ақпаратын алу үед алдаа гарлаа.",
    },
    patientConfirmation: {
      title: "Науқас ақпараты",
      subtitle: "Төмендегі ақпарат дұрыс екенін тексеріңіз.",
      name: "Аты",
      age: "Жасы",
      height: "Бойы",
      weight: "Салмағы",
      gender: "Жынысы",
      startButton: "Бастау",
      editButton: "Өңдеу",
    },
    questionnaire: {
      title: "Сауалнама",
      subtitle: "Сұрақтарға жауап беріңіз",
      nextButton: "Келесі",
      previousButton: "Алдыңғы",
      completeButton: "Аяқтау",
      noneButton: "Жоқ",
      painScale: {
        title: "Ауырсыну деңгейін таңдаңыз",
        labels: ["Өте әлсіз", "Әлсіз", "Орташа", "Күшті", "Өте күшті"],
        currentLevel: "Қазіргі ауырсыну деңгейі",
      },
      questions: [
        {
          id: 1,
          question: "Сізде қандай белгілер бар?",
          type: "multiple",
          options: [
            "Бас ауруы",
            "Кеуде ауруы",
            "Қарын ауруы",
            "Жөтел",
            "қызба",
            "Жүрек айну/Құсу",
            "Іш өту/Дәрет қату",
            "Тері ауруы",
            "Етеккір бұзылысы",
            "Депрессия/Үрей",
            "Басқа",
          ],
          hasNoneOption: true,
        },
        {
          id: 2,
          question: "Қазіргі ауырсыну қаншалықты күшті?",
          type: "pain-scale",
          options: [],
        },
        {
          id: 3,
          question: "Диагноз қандай?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 4,
          question: "Осы аралықта қандай да бір ем алдыңыз ба?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
        {
          id: 5,
          question: "Кореяда қандай емдеу алғыңыз келеді?",
          type: "text",
          options: [],
        },
        {
          id: 6,
          question:
            "Егер сізде бұрын төмендегі жағдайлардың кез келгені болса, олардың барлығын таңдаңыз",
          type: "multiple",
          options: [
            "Гипертония",
            "Диабет",
            "туберкулез",
            "қатерлі ісік",
            "Басқа",
          ],
          hasNoneOption: true,
        },
        {
          id: 7,
          question: "Отбасылық ауру тарихын таңдаңыз:",
          type: "multiple",
          options: [
            "Гипертония",
            "Диабет",
            "Жүрек ауруы",
            "Инсульт",
            "Қатерлі ісік",
            "Басқа",
          ],
          hasNoneOption: true,
        },
        {
          id: 8,
          question: "Темекі тартасыз ба?",
          type: "single",
          options: ["иә", "жоқ", "Мен темекі шегетінмін, бірақ тастадым"],
        },
        {
          id: 9,
          question: "Ішімдік ішесіз бе?",
          type: "single",
          options: ["иә", "жоқ"],
        },
        {
          id: 10,
          question: "Бұрын хирургиялық ота жасалған ба?",
          type: "single",
          options: [
            "соқырішекке операция",
            "кесар тілігі",
            "өт қабын алып тастау операциясы",
            "oртопедиялық хирургия",
            "жүрекке операция",
            "ісіктерді жою операциясы",
            "Басқа",
          ],
          hasNoneOption: true,
        },
        {
          id: 11,
          question: "Қабылдаған дәрілердің тізімін жазыңыз",
          type: "text",
          options: [],
        },
        {
          id: 12,
          question: "Аллергияңыз бар ма?",
          type: "multiple",
          options: [
            "дәрі",
            "тамақ",
            "тозаң",
            "жануарлардың жүні",
            "шаң",
            "металл",
            "Басқа",
          ],
          hasNoneOption: true,
        },
        {
          id: 13,
          question: "Медицина командасына қосымша ақпарат?",
          type: "text",
          options: [],
          hasNoneOption: true,
        },
      ] as Question[],
    },
    languageSelect: "Тіл таңдау",
  },
};

export const languageOptions = [
  { value: "ko" as Language, label: "한국어", flag: "🇰🇷" },
  { value: "en" as Language, label: "English", flag: "🇺🇸" },
  { value: "mn" as Language, label: "Монгол", flag: "🇲🇳" },
  { value: "kz" as Language, label: "Қазақша", flag: "🇰🇿" },
];

/**
 * 브라우저 언어를 감지하여 앱에서 지원하는 언어로 매핑
 * @returns Language 타입 중 하나 (기본값: "ko")
 */
export function detectBrowserLanguage(): Language {
  // 서버사이드 렌더링에서는 기본값 반환
  if (typeof window === "undefined") {
    return "ko";
  }

  // 브라우저 언어 가져오기
  const browserLang = navigator.language || navigator.languages?.[0] || "ko";

  // 언어 코드 매핑
  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("en")) return "en";
  if (browserLang.startsWith("mn")) return "mn";
  if (browserLang.startsWith("kk") || browserLang.startsWith("kz")) return "kz";

  // 기본값
  return "ko";
}
