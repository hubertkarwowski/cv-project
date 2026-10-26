import { useRef } from 'react';

import { CvFormLayout } from '@/components/cv/CvFormLayout';
import {
  PersonalInfoStep,
  type PersonalInfoStepHandle,
} from '@/components/cv/steps/PersonalInfoStep';
import { useCvStore } from '@/stores/cv-store';

const TOTAL_STEPS = 4;

export function CvCreatePage() {
  const currentStep = useCvStore((state) => state.currentStep);
  const goToStep = useCvStore((state) => state.actions.goToStep);

  const personalInfoStepRef = useRef<PersonalInfoStepHandle>(null);

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await personalInfoStepRef.current?.submit();

      if (!isValid) return;
    }

    goToStep(Math.min(currentStep + 1, TOTAL_STEPS));
  };

  const handleBack = () => goToStep(Math.max(currentStep - 1, 1));

  function renderStep(step: number) {
    switch (step) {
      case 1: {
        return <PersonalInfoStep ref={personalInfoStepRef} />;
      }
      case 2: {
        return <div>Krok 2: Doświadczenie (placeholder)</div>;
      }
      case 3: {
        return <div>Krok 3: Edukacja (placeholder)</div>;
      }
      case 4: {
        return <div>Krok 4: Podsumowanie (placeholder)</div>;
      }
      default: {
        // eslint-disable-next-line unicorn/no-null
        return null;
      }
    }
  }

  return (
    <CvFormLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      onNext={handleNext}
      onBack={handleBack}
    >
      {renderStep(currentStep)}
    </CvFormLayout>
  );
}
