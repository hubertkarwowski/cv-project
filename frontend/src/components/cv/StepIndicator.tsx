import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <nav className="flex flex-col gap-2">
      <div className="text-lg font-semibold">
        Krok {currentStep} z {totalSteps}
      </div>

      <ol className="flex items-center gap-2" aria-label="Progress">
        {steps.map((step) => {
          const isActive = step === currentStep;
          const isDone = step < currentStep;

          return (
            <li
              key={step}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border text-base',
                isActive &&
                  'bg-primary border-chart-3 bg-chart-3 font-bold text-white',
                isDone && 'bg-muted text-muted-foreground'
              )}
            >
              {step}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
