'use client';

import { useHealthcare } from '../contexts/HealthcareContext';
import { translations } from '../utils/translations';
import { QuestionnaireAnswer } from '../types';

export function useQuestionnaire() {
  const {
    currentLanguage,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    questionnaireData,
    setQuestionnaireAnswers,
    setCurrentAnswer,
    setPainLevel
  } = useHealthcare();
  
  const t = translations[currentLanguage];

  const handleNextQuestion = () => {
    // Save current answer
    let answerToSave = questionnaireData.currentAnswer;
    if (t.questionnaire.questions[currentQuestionIndex].type === 'pain-scale') {
      answerToSave = questionnaireData.painLevel[0];
    }

    const newAnswer: QuestionnaireAnswer = {
      questionId: t.questionnaire.questions[currentQuestionIndex].id,
      answer: answerToSave
    };
    
    const updatedAnswers = questionnaireData.answers.filter(a => a.questionId !== newAnswer.questionId);
    updatedAnswers.push(newAnswer);
    
    setQuestionnaireAnswers(updatedAnswers);

    if (currentQuestionIndex < t.questionnaire.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Load existing answer if available
      const existingAnswer = updatedAnswers.find(a => a.questionId === t.questionnaire.questions[nextIndex].id);
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
      return false; // Not completed
    }
    return true; // Completed
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // Load existing answer if available
      const existingAnswer = questionnaireData.answers.find(a => a.questionId === t.questionnaire.questions[prevIndex].id);
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

  return {
    currentQuestionIndex,
    questionnaireData,
    handleNextQuestion,
    handlePreviousQuestion,
    setCurrentAnswer,
    setPainLevel
  };
}