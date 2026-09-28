import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { StepIndicator } from './StepIndicator';

type CvFormLayoutProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
};

export function CvFormLayout({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  children,
}: CvFormLayoutProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>{children}</div>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className={
            currentStep === 1 ? 'invisible cursor-pointer' : 'cursor-pointer'
          }
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          className="h-8 w-14 cursor-pointer"
          disabled={currentStep === totalSteps}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
