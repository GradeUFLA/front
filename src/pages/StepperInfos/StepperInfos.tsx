import { useState } from "react";

import { useStepper } from "../../hooks/useStepper";

import styles from "./StepperInfos.module.scss";

import { CursoStep } from "./steps/CursoStep";
import { MatrizStep } from "./steps/MatrizStep";
import { SemestreStep } from "./steps/SemestreStep";

import { StepperHeader } from "./components/StepperHeader/StepperHeader";

import { useNavigate } from "react-router-dom";

export function StepperInfos() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course: "",
    matriz: "",
    semestre: "",
  });

  const { currentStep, nextStep, prevStep } = useStepper({
    totalSteps: 3,
  });

  const steps = [
    {
      title: "Curso",
      component: (
        <CursoStep
          value={formData.course}
          onChange={(value: string) =>
            setFormData((prev) => ({
              ...prev,
              course: value,
            }))
          }
        />
      ),
    },
    {
      title: "Matriz Curricular",
      component: (
        <MatrizStep
          courseId={formData.course}
          value={formData.matriz}
          onChange={(value: string) =>
            setFormData((prev) => ({
              ...prev,
              matriz: value,
            }))
          }
        />
      ),
    },
    {
      title: "Semestre",
      component: (
        <SemestreStep
          courseId={formData.course}
          matrizId={formData.matriz}
          value={formData.semestre}
          onChange={(value: string) =>
            setFormData((prev) => ({
              ...prev,
              semestre: value,
            }))
          }
        />
      ),
    },
  ];

  const canContinueByStep = [
    !!formData.course,
    !!formData.matriz,
    !!formData.semestre,
  ];

  const canContinue = canContinueByStep[currentStep];

  function handleContinue() {
    if (currentStep === steps.length - 1) {
      navigate("/materias-concluidas", {
        state: {
          courseId: formData.course,
          matrizId: formData.matriz,
          semestre: formData.semestre,
        },
      });
      return;
    }

    nextStep();
  }

  return (
    <div className={styles.container}>
      <div>
        <StepperHeader currentStep={currentStep} steps={steps} />

        <div className={styles.card}>
          <section>{steps[currentStep].component}</section>

          <button
            className={styles.BtnContinuar}
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continuar
          </button>
        </div>
      </div>

      <button
        className={styles.BtnVoltar}
        onClick={prevStep}
        disabled={currentStep === 0}
      >
        Voltar
      </button>
    </div>
  );
}
