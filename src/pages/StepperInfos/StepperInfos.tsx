import { useStepper } from "../../hooks/useStepper";
import styles from './StepperInfos.module.scss'

import { CursoStep } from "./steps/CursoStep";
import { MatrizStep } from "./steps/MatrizStep";
import { SemestreStep } from "./steps/SemestreStep";

import { StepperHeader } from "./components/StepperHeader/StepperHeader";

export function StepperInfos() {
  const steps = [
    {
      title: "Curso",
      component: <CursoStep />,
    },
    {
      title: "Matriz Curricular",
      component: <MatrizStep />,
    },
    {
      title: "Semestre",
      component: <SemestreStep />,
    },
  ];

  const { currentStep, nextStep, prevStep } = useStepper({
    totalSteps: steps.length,
  });

  return (
    <div className={styles.container}>
      <div>
        <StepperHeader currentStep={currentStep} steps={steps} />
      </div>

      <section>{steps[currentStep].component}</section>

      <footer>
        <button onClick={nextStep}>Continuar</button>
      </footer>

      <button onClick={prevStep}>Voltar</button>
    </div>
  );
}
