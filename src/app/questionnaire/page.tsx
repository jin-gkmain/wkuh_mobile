'use client';

import { fetchPreliminary } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QuestionnairePage } from '../../components/pages/QuestionnairePage';
import { useHealthcare } from '../../contexts/HealthcareContext';
import { Preliminary, PreliminaryData, QuestionnaireAnswer } from '../../types';
import { translations } from '../../utils/translations';

export default function QuestionnaireRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    patientInput,
    patientData,
    patientInfo,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    questionnaireData,
    setQuestionnaireAnswers,
    setCurrentAnswer,
    setPainLevel,
    setOtherInput,
  } = useHealthcare();

  const router = useRouter();
  const t = translations[currentLanguage];

  // Redirect if no patient info
  useEffect(() => {
    if (!patientInfo.name) {
      router.push('/mobilechat/patient-info');
    }
  }, [patientInfo.name, router]);

  const handleAnswerChange = (answer: string | string[] | number) => {
    setCurrentAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save current answer
    let answerToSave = questionnaireData.currentAnswer;
    if (t.questionnaire.questions[currentQuestionIndex].type === 'pain-scale') {
      answerToSave = questionnaireData.painLevel[0];
    }

    const newAnswer: QuestionnaireAnswer = {
      questionId: t.questionnaire.questions[currentQuestionIndex].id,
      answer: answerToSave,
    };

    const updatedAnswers = questionnaireData.answers.filter(
      (a) => a.questionId !== newAnswer.questionId
    );
    updatedAnswers.push(newAnswer);

    setQuestionnaireAnswers(updatedAnswers);

    if (currentQuestionIndex < t.questionnaire.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      // Load existing answer if available
      const existingAnswer = updatedAnswers.find(
        (a) => a.questionId === t.questionnaire.questions[nextIndex].id
      );
      if (existingAnswer) {
        if (t.questionnaire.questions[nextIndex].type === 'pain-scale') {
          setPainLevel([existingAnswer.answer as number]);
          setCurrentAnswer(existingAnswer.answer);
        } else {
          setCurrentAnswer(existingAnswer.answer as string | string[]);
        }
      } else {
        setCurrentAnswer('');
        if (t.questionnaire.questions[nextIndex].type === 'pain-scale') {
          setPainLevel([5]);
        }
      }
    } else {
      // Complete questionnaire
      router.push('/mobilechat/questionnaire-complete');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);

      // Load existing answer if available
      const existingAnswer = questionnaireData.answers.find(
        (a) => a.questionId === t.questionnaire.questions[prevIndex].id
      );
      if (existingAnswer) {
        if (t.questionnaire.questions[prevIndex].type === 'pain-scale') {
          setPainLevel([existingAnswer.answer as number]);
          setCurrentAnswer(existingAnswer.answer);
        } else {
          setCurrentAnswer(existingAnswer.answer as string | string[]);
        }
      } else {
        setCurrentAnswer('');
        if (t.questionnaire.questions[prevIndex].type === 'pain-scale') {
          setPainLevel([5]);
        }
      }
    }
  };

  // Convert questionnaire answers to PreliminaryData format
  const convertAnswersToPreliminaryData = (
    answers: QuestionnaireAnswer[]
  ): PreliminaryData => {
    const answerMap = new Map(answers.map((a) => [a.questionId, a.answer]));

    // Convert multiple choice answers to object format like {"sym1":true, "sym3":true}
    const getMultipleChoiceObject = (id: number, prefix: string): string => {
      const answer = answerMap.get(id);
      if (!answer) return '';

      const selectedOptions = Array.isArray(answer) ? answer : [answer];
      const question = t.questionnaire.questions.find((q) => q.id === id);
      if (!question) return '';

      const resultObj: { [key: string]: boolean } = {};

      selectedOptions.forEach((selectedOption) => {
        // "기타" 옵션인지 확인
        const isOtherOption =
          selectedOption === '기타' ||
          selectedOption === 'Other' ||
          selectedOption === 'Бусад' ||
          selectedOption === 'Басқа';

        if (isOtherOption) {
          // "기타" 입력값이 있으면 해당 값을 키로 사용
          const otherInput = questionnaireData.otherInputs[id];
          if (otherInput && otherInput.trim()) {
            resultObj[otherInput.trim()] = true;
          }
        } else {
          // 일반 옵션은 기존 방식대로 처리
          const optionIndex = question.options.findIndex(
            (option) => option === selectedOption
          );
          if (optionIndex !== -1) {
            resultObj[`${prefix}${optionIndex + 1}`] = true;
          }
        }
      });

      return Object.keys(resultObj).length > 0 ? JSON.stringify(resultObj) : '';
    };

    // Convert single choice to key format like "smoke2"
    const getSingleChoiceKey = (id: number, prefix: string): string => {
      const answer = answerMap.get(id);
      if (!answer) return '';

      // "기타" 옵션인지 확인
      const isOtherOption =
        answer === '기타' ||
        answer === 'Other' ||
        answer === 'Бусад' ||
        answer === 'Басқа';

      if (isOtherOption) {
        // "기타" 입력값이 있으면 해당 값을 반환
        const otherInput = questionnaireData.otherInputs[id];
        return otherInput && otherInput.trim() ? otherInput.trim() : '';
      }

      const question = t.questionnaire.questions.find((q) => q.id === id);
      if (!question) return '';

      const optionIndex = question.options.findIndex(
        (option) => option === answer
      );
      return optionIndex !== -1 ? `${prefix}${optionIndex + 1}` : '';
    };

    // Get text answer as is
    const getTextAnswer = (id: number): string => {
      const answer = answerMap.get(id);
      return typeof answer === 'string' ? answer : '';
    };

    // Special handling for pain degree - check if it's "없음" (None)
    const getPainDegree = (): string => {
      const answer = answerMap.get(2);
      const noneText = t.questionnaire.noneButton;

      if (answer === noneText || answer === '없음') {
        return '없음';
      }
      return String(answer || '');
    };

    return {
      symptoms: getMultipleChoiceObject(1, 'sym'),
      pain_degree: getPainDegree(),
      diagnosis: getTextAnswer(3),
      treatment: getTextAnswer(4),
      specific: getMultipleChoiceObject(5, 'spec'),
      past_history: getMultipleChoiceObject(6, 'past'),
      family_history: getMultipleChoiceObject(7, 'family'),
      smoke: getSingleChoiceKey(8, 'smoke'),
      drink: getSingleChoiceKey(9, 'drink'),
      past_surgeries: getMultipleChoiceObject(10, 'surgery'),
      medical_history: getTextAnswer(11),
      allergy: getMultipleChoiceObject(12, 'allergy'),
      todoc: getTextAnswer(13),
    };
  };

  const handleComplete = async () => {
    try {
      if (!patientData || !patientInput) {
        throw new Error('환자 정보가 없습니다.');
      }

      // Save current answer before completing
      let answerToSave = questionnaireData.currentAnswer;
      if (
        t.questionnaire.questions[currentQuestionIndex].type === 'pain-scale'
      ) {
        answerToSave = questionnaireData.painLevel[0];
      }

      const finalAnswer: QuestionnaireAnswer = {
        questionId: t.questionnaire.questions[currentQuestionIndex].id,
        answer: answerToSave,
      };

      const allAnswers = questionnaireData.answers.filter(
        (a) => a.questionId !== finalAnswer.questionId
      );
      allAnswers.push(finalAnswer);

      const pl_data = convertAnswersToPreliminaryData(allAnswers);

      const preliminaryRequest: Preliminary = {
        p_idx: patientData.p_idx,
        p_serial_no: patientInput.patientNumber,
        p_birthday: patientInput.birthDate.replace(/-/g, ''), // Remove dashes for YYYYMMDD format
        pl_data: pl_data,
      };

      console.log('문진표 제출 데이터:', preliminaryRequest);

      const result = await fetchPreliminary(preliminaryRequest);
      console.log('문진표 제출 결과:', result);

      router.push('/mobilechat/questionnaire-complete');
    } catch (error) {
      console.error('문진표 제출 오류:', error);
      // TODO: 에러 처리 (에러 메시지 표시 등)
    }
  };

  const handleBack = () => {
    router.push('/mobilechat/patient-confirmation');
  };

  if (!patientInfo.name) {
    return null; // or loading spinner
  }

  return (
    <QuestionnairePage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      currentQuestionIndex={currentQuestionIndex}
      currentAnswer={questionnaireData.currentAnswer}
      painLevel={questionnaireData.painLevel}
      otherInputs={questionnaireData.otherInputs}
      onAnswerChange={handleAnswerChange}
      onPainLevelChange={setPainLevel}
      onOtherInputChange={setOtherInput}
      onNext={handleNextQuestion}
      onPrevious={handlePreviousQuestion}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}
