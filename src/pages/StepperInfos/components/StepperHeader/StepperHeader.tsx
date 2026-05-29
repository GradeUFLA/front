import styles from "./StepperHeader.module.scss";

type Step = {
  title: string;
};

type StepperHeaderProps = {
  currentStep: number;
  steps: Step[];
};

export function StepperHeader({ currentStep, steps }: StepperHeaderProps) {
  return (
    <div className={styles.stepperHeader}>
      {/* Linha superior: círculos + conectores */}
      <div className={styles.stepsRow}>
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          return (
            <div className={styles.stepTop} key={step.title}>
              <div
                className={`
                  ${styles.stepCircle}
                  ${isActive ? styles.active : ""}
                  ${isCompleted ? styles.completed : ""}
                `}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    ${styles.stepLine}
                    ${isCompleted ? styles.lineCompleted : ""}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.labelsRow}>
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          return (
            <div className={styles.labelWrapper} key={step.title}>
              <span
                className={`
                  ${styles.stepLabel}
                  ${isActive ? styles.labelActive : ""}
                `}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
