import { useEffect, useState } from "react";
import { getCourses } from "../../../services/cursos.service";
import styles from "../StepperInfos.module.scss";
import { CustomSelect } from "../../../components/customSelect/CustomSelect";

type Course = {
  id: number;
  nome: string;
  codigo: string;
  creditosTotais: number;
};

type CursoStepProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CursoStep({ value, onChange }: CursoStepProps) {  
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses();

        setCourses(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className={styles.stepperContent}>
      <h1>
        Qual é o <span>seu curso?</span>
      </h1>

      <p>Selecione o curso que você está cursando</p>

      <CustomSelect
        value={value}
        onChange={onChange}
        placeholder="Selecione seu curso"
        options={courses.map((course) => ({
          label: `${course.codigo} - ${course.nome}`,
          value: String(course.id),
        }))}
        className={styles.customSelect}
      />
    </div>
  );
}
