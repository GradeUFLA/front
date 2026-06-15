import styles from "./SubjectCard.module.scss";
import type { DisciplinaGrade } from "../../../../../../types/grade";

import { useDraggable } from "@dnd-kit/core";

type Props = {
    disciplina: DisciplinaGrade;
};

export function SubjectCard({ disciplina }: Props) {
    const primeiraTurma = disciplina.turmas[0];

    const { setNodeRef, listeners, attributes, isDragging } =
        useDraggable({
            id: disciplina.disciplinaCursoId,
            data: disciplina,
        });

    const horariosTexto =
        primeiraTurma?.horarios
            .map((horario) => {
                const diaMap: Record<string, string> = {
                    SEGUNDA: "Seg",
                    TERCA: "Ter",
                    QUARTA: "Qua",
                    QUINTA: "Qui",
                    SEXTA: "Sex",
                    SABADO: "Sáb",
                };

                return `${diaMap[horario.dia]} ${horario.horaInicio.slice(0, 2)}h`;
            })
            .join(", ");

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`${styles.container} ${isDragging ? styles.dragging : ""
                }`}
        >
            <div className={styles.header}>
                <span className={styles.codigo}>
                    {disciplina.codigo}
                </span>

                <span className={styles.creditos}>
                    {disciplina.creditos} créditos
                </span>
            </div>

            <h4 className={styles.nome}>
                {disciplina.nome}
            </h4>

            <span className={styles.horarios}>
                {horariosTexto}
            </span>

            <div className={styles.footer}>
                <span className={styles.professor}>
                    Prof. {primeiraTurma?.professor}
                </span>

                <span className={styles.turmas}>
                    {disciplina.turmas.length} turmas
                </span>
            </div>
        </div>
    );
}