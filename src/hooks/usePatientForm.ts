'use client';

import { useHealthcare } from '../contexts/HealthcareContext';
import { PatientInfo } from '../types';
import { translations } from '../utils/translations';

export function usePatientForm() {
  const {
    currentLanguage,
    patientInfo,
    setPatientInfo,
    validationErrors,
    setValidationErrors
  } = useHealthcare();
  
  const t = translations[currentLanguage];

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setPatientInfo({ [field]: value });
    
    // Clear specific error when user starts typing
    if (validationErrors[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Patient number validation
    if (!patientInfo.patientNumber.trim()) {
      newErrors.patientNumber = t.patientInfo.validation.patientNumberRequired;
    } else if (patientInfo.patientNumber.trim().length < 3) {
      newErrors.patientNumber = "환자번호는 최소 3자리 이상이어야 합니다.";
    }

    // Birth date validation
    if (!patientInfo.birthDate.trim()) {
      newErrors.birthDate = t.patientInfo.validation.birthDateRequired;
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(patientInfo.birthDate)) {
        newErrors.birthDate = t.patientInfo.validation.birthDateInvalid;
      } else {
        const date = new Date(patientInfo.birthDate);
        const [year, month, day] = patientInfo.birthDate.split('-').map(Number);
        const today = new Date();
        
        // Check if date is valid
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
          newErrors.birthDate = t.patientInfo.validation.birthDateInvalid;
        }
        // Check if date is not in the future
        else if (date > today) {
          newErrors.birthDate = "미래 날짜는 입력할 수 없습니다.";
        }
        // Check if date is reasonable (not too old)
        else if (today.getFullYear() - year > 150) {
          newErrors.birthDate = "올바른 생년월일을 입력해주세요.";
        }
      }
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    patientInfo,
    validationErrors,
    handleInputChange,
    validateForm
  };
}