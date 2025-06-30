"use client";

import { PatientInfoPage } from "../../components/pages/PatientInfoPage";
import { useHealthcare } from "../../contexts/HealthcareContext";
import { useRouter } from "next/navigation";
import { PatientInput } from "../../types";
import { fetchPatientInfo } from "@/utils/api";

export default function PatientInfoRoute() {
  const {
    currentLanguage,
    setCurrentLanguage,
    patientInput,
    setPatientInput,
    setPatientData,
    setPatientInfo,
    validationErrors,
    setValidationErrors,
  } = useHealthcare();

  const router = useRouter();

  const handleInputChange = (field: keyof PatientInput, value: string) => {
    setPatientInput({ [field]: value });

    // Clear specific error when user starts typing
    if (validationErrors[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {};

    // Patient number validation
    if (!patientInput.patientNumber.trim()) {
      newErrors.patientNumber = "환자번호를 입력해주세요.";
    }

    // Birth date validation
    if (!patientInput.birthDate.trim()) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(patientInput.birthDate)) {
        newErrors.birthDate = "올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)";
      } else {
        const date = new Date(patientInput.birthDate);
        const [year, month, day] = patientInput.birthDate
          .split("-")
          .map(Number);
        const today = new Date();

        // Check if date is valid
        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() !== day
        ) {
          newErrors.birthDate = "올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)";
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

    // If there are validation errors, don't proceed with API call
    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return false;
    }

    // Fetch patient info from API
    try {
      const patientInfoResponse = await fetchPatientInfo(
        patientInput.patientNumber,
        patientInput.birthDate.split("-").join("")
      );

      console.log(patientInfoResponse);

      // Store API response in patientData
      const patientDataWithAge = {
        ...patientInfoResponse,
        age:
          new Date().getFullYear() -
          new Date(patientInfoResponse.p_birthday).getFullYear(),
      };
      setPatientData(patientDataWithAge);

      // Update legacy patientInfo for backward compatibility
      setPatientInfo({
        patientNumber: patientInfoResponse.p_idx.toString(),
        birthDate: patientInfoResponse.p_birthday,
        name: patientInfoResponse.p_name_eng,
        age: patientDataWithAge.age,
        height: patientInfoResponse.p_tall,
        weight: patientInfoResponse.p_weight,
        gender: patientInfoResponse.p_sex,
      });

      setValidationErrors({});
      return true;
    } catch (error) {
      console.error("환자 정보 조회 오류:", error);

      // Set error message based on the error
      if (error instanceof Error) {
        newErrors.patientNumber = error.message;
        newErrors.birthDate = error.message;
      } else {
        newErrors.patientNumber =
          "환자 정보를 조회하는 중 오류가 발생했습니다.";
      }

      setValidationErrors(newErrors);
      return false;
    }
  };

  const handleConfirm = async () => {
    if (await validateForm()) {
      router.push("/patient-confirmation");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <PatientInfoPage
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
      patientInfo={patientInput}
      errors={validationErrors}
      onInputChange={handleInputChange}
      onConfirm={handleConfirm}
      onBack={handleBack}
    />
  );
}
