import styles from "./SubjectCard.module.scss";
import type { DisciplinaGrade } from "../../../../../../types/grade";

type Props = {
    disciplina: DisciplinaGrade;
};

export function SubjectCard({
    disciplina,
}: Props) {

    const primeiraTurma = disciplina.turmas[0];

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
        <div className={styles.container}>

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