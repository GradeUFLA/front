import { useGrade } from "../../../../../../context/GradeContext";
import styles from "./WeeklyGridHeader.module.scss";

const dias = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export function WeeklyGridHeader() {
  const { gradeAtual, trocarGrade } = useGrade();

  return (
    <div className={styles.container}>
      <button
        className={styles.gradeButton}
        onClick={trocarGrade}
      >
        {gradeAtual}
      </button>

      {dias.map((dia) => (
        <div key={dia} className={styles.day}>
          {dia}
        </div>
      ))}
    </div>
  );
}