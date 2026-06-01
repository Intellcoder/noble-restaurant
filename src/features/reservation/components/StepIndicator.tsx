import { Check } from "lucide-react";

type Step = { label: string };

type Props = {
  steps: Step[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: Props) => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-red-500 border-red-500 text-white"
                      : isActive
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`w-20 md:w-32 h-px mx-2 mb-5 transition-colors duration-300 ${
                  stepNumber < currentStep ? "bg-red-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
