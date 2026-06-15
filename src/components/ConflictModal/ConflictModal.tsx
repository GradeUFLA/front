import { useGrade } from "../../context/GradeContext";
import styles from "./ConflictModal.module.scss";

export function ConflictModal() {

    const {
        pendingSubject,
        setPendingSubject,

        adicionarMateria,
        setPreviewDisciplina,
        removerMaterias
    } = useGrade();

    if (!pendingSubject) {
        return null;
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h3>
                    Conflito de horário
                </h3>

                <p>
                    Esta turma possui conflito com
                    uma disciplina já adicionada.
                </p>

                <ul>
                    {pendingSubject.conflitos.map(
                        (materia) => (
                            <li
                                key={
                                    materia.disciplina
                                        .disciplinaCursoId
                                }
                            >
                                {materia.disciplina.codigo}
                                {" - "}
                                {materia.disciplina.nome}
                            </li>
                        )
                    )}
                </ul>

                <div className={styles.actions}>

                    <button
                        onClick={() =>
                            setPendingSubject(null)
                        }
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={() => {

                            removerMaterias(
                                pendingSubject.conflitos
                            );

                            adicionarMateria(
                                pendingSubject.materia
                            );

                            setPreviewDisciplina(
                                null
                            );

                            setPendingSubject(
                                null
                            );
                        }}
                    >
                        Substituir
                    </button>

                </div>

            </div>

        </div>
    );
}