import { useApp } from "../context/AppContext";

export function ProgressBar() {
  const { currentStep } = useApp();
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-body text-muted-foreground tracking-wide">
          {currentStep} de {totalSteps}
        </span>
      </div>
      <div className="h-0.5 bg-border-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
