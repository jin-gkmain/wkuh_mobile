'use client';

import { PatientConfirmationPage } from '../../components/pages/PatientConfirmationPage';
import { useHealthcare } from '../../contexts/HealthcareContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PatientConfirmationRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    patientInfo,
    resetQuestionnaire
  } = useHealthcare();
  
  const router = useRouter();

  // Redirect if no patient info
  useEffect(() => {
    if (!patientInfo.patientNumber) {
      router.push('/patient-info');
    }
  }, [patientInfo.patientNumber, router]);

  const handleStart = () => {
    resetQuestionnaire();
    router.push('/questionnaire');
  };

  const handleBack = () => {
    router.push('/patient-info');
  };

  if (!patientInfo.patientNumber) {
    return null; // or loading spinner
  }

  return (
    <PatientConfirmationPage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      patientInfo={patientInfo}
      onStart={handleStart}
      onBack={handleBack}
    />
  );
}