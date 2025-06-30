'use client';

import { MainPage } from '../components/pages/MainPage';
import { useHealthcare } from '../contexts/HealthcareContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { currentLanguage, setCurrentLanguage } = useHealthcare();
  const router = useRouter();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'patient-info':
        router.push('/patient-info');
        break;
      case 'ai-chat':
        router.push('/ai-chat');
        break;
      case 'emergency-guide':
        router.push('/emergency-guide');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <MainPage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      onNavigate={handleNavigate}
    />
  );
}