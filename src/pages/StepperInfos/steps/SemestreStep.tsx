import { useEffect, useState } from "react";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";
import styles from "../StepperInfos.module.scss";
import { getCourseSemestres } from "../../../services/cursos.service";

type SemestreStepProps = {
  courseId: string;
  matrizId: string;
  value: string;
  onChange: (value: string) => void;
};

export function SemestreStep({
  courseId,
  matrizId,
  value,
  onChange,
}: SemestreStepProps) {
  const [semestres, setSemestres] = useState<number[]>([]);

  useEffect(() => {
    async function fetchSemestres() {
      try {
        if (!courseId || !matrizId) {
          setSemestres([]);
          return;
        }

        const data = await getCourseSemestres(courseId, matrizId);
        setSemestres(data);
      } catch (error) {
        console.error("Error ao buscar semestres:", error);
      }
    }

    fetchSemestres();
  }, [courseId, matrizId]);

  return (
    <div className={styles.stepperContent}>
      <h1>
        Qual é o <span>seu semestre?</span>
      </h1>

      <p>Selecione o semestre que você está cursando</p>

      <CustomSelect
        options={semestres.map((semestre) => ({
          label: `${semestre}º Semestre`,
          value: String(semestre),
        }))}
        value={value}
        onChange={onChange}
        placeholder="Selecione seu semestre"
        className={styles.customSelect}
      />
    </div>
  );
}
