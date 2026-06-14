import { useGrade } from "../../../../context/GradeContext";
import styles from "./SelectedSidebar.module.scss";

export function SelectedSidebar() {
  const { gradeSelecionada } = useGrade();

  return (
    <div className={styles.container}>
      <h3>Matérias Selecionadas</h3>

      {gradeSelecionada.length === 0 && (
        <span>Nenhuma matéria adicionada.</span>
      )}

      {gradeSelecionada.map((item) => (
        <div
          key={item.turma.turmaId}
          className={styles.card}
        >
          <strong>
            {item.disciplina.codigo}
          </strong>

          <span>
            {item.disciplina.nome}
          </span>

          <small>
            Turma {item.turma.codigo}
          </small>
        </div>
      ))}
    </div>
  );
}