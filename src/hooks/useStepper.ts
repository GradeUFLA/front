import { useState } from "react";

type UseStepperProps = {
  totalSteps: number;
};

export function useStepper({
  totalSteps,
}: UseStepperProps) {
  const [currentStep, setCurrentStep] =
    useState(0);

  function nextStep() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function goToStep(step: number) {
    setCurrentStep(step);
  }

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
  };
}