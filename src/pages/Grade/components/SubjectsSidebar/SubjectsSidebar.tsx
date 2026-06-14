import { useMemo } from "react";
import { useGrade } from "../../../../context/GradeContext";

import styles from "./SubjectsSidebar.module.scss";

import type { GradeResponse } from "../../../../types/grade";

import { SubjectCard } from "./components/SubjectCard/SubjectCard";

type Props = {
    grade: GradeResponse;
};

export function SubjectsSidebar({
    grade,
}: Props) {

    const { creditosAtuais } = useGrade();

    const disciplinas = useMemo(() => {
        return grade.semestres.flatMap(
            semestre => semestre.disciplinas
        );
    }, [grade]);

    return (
        <div className={styles.container}>

            <h3>Matérias</h3>

            <span>
                Créditos atuais: {creditosAtuais}
            </span>

            <div className={styles.list}>
                {disciplinas.map((disciplina) => (
                    <SubjectCard
                        key={
                            disciplina.disciplinaCursoId
                        }
                        disciplina={disciplina}
                    />
                ))}
            </div>

        </div>
    );
}