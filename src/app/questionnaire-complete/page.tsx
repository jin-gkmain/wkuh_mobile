'use client';

import { QuestionnaireCompletePage } from '../../components/pages/QuestionnaireCompletePage';
import { useHealthcare } from '../../contexts/HealthcareContext';
import { useRouter } from 'next/navigation';

export default function QuestionnaireCompleteRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    resetAll
  } = useHealthcare();
  
  const router = useRouter();

  const handleBackToMain = () => {
    resetAll();
    router.push('/');
  };

  return (
    <QuestionnaireCompletePage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      onBackToMain={handleBackToMain}
    />
  );
}