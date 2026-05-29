import { useEffect, useState } from "react";
import { getCourseMatrizes } from "../../../services/cursos.service";
import styles from "../StepperInfos.module.scss";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";

type MatrizStepProps = {
  courseId: string;
  value: string;
  onChange: (value: string) => void;
};

export function MatrizStep({ courseId, value, onChange }: MatrizStepProps) {
  const [matrizes, setMatrizes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMatrizes() {
      try {
        if (!courseId) {
          setMatrizes([]);
          return;
        }

        const data = await getCourseMatrizes(courseId);
        setMatrizes(data);
      } catch (error) {
        console.error("Error ao buscar matrizes:", error);
      }
    }

    fetchMatrizes();
  }, [courseId]);

  return (
    <div className={styles.stepperContent}>
      <h1>
        Qual é a <span>sua matriz curricular?</span>
      </h1>

      <p>Selecione a matriz curricular que você está cursando</p>

      <CustomSelect
        options={matrizes.map((codigo) => ({
          label: `Matriz ${codigo}`,
          value: codigo,
        }))}
        value={value}
        onChange={onChange}
        placeholder="Selecione sua matriz"
        className={styles.customSelect}
      />
    </div>
  );
}
