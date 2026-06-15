import { useGrade } from "../../../../context/GradeContext";
import styles from "./SelectedSidebar.module.scss";
import { formatDay } from "../../../../utils/formatDay";

export function SelectedSidebar() {
    const { gradeSelecionada, removerMateria } = useGrade();

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
                    <div className={styles.header}>
                        <div className={styles.codeArea}>
                            <div className={styles.dot} />

                            <span>
                                {item.disciplina.codigo}
                            </span>
                        </div>

                        <button
                            className={styles.remove}
                            onClick={() =>
                                removerMateria(
                                    item.disciplina.disciplinaCursoId
                                )
                            }
                        >
                            ×
                        </button>
                    </div>

                    <h4>{item.disciplina.nome}</h4>

                    <p>Prof. {item.turma.professor}</p>

                    <div className={styles.schedule}>
                        {item.turma.horarios.map((horario) => (
                            <span key={horario.id}>
                                {formatDay(horario.dia)}{" "}
                                {horario.horaInicio}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}