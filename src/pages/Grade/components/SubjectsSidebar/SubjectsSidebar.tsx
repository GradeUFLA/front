import { useMemo, useState } from "react";

import styles from "./SubjectsSidebar.module.scss";

import type { GradeResponse } from "../../../../types/grade";

import { SubjectCard } from "./components/SubjectCard/SubjectCard";

type Props = {
    grade: GradeResponse;
};

export function SubjectsSidebar({
    grade,
}: Props) {
    const [search, setSearch] = useState("");

    const [tab, setTab] = useState<
        "TODAS" |
        "OBRIGATORIAS" |
        "ELETIVAS" |
        "FUTURAS"
    >("TODAS");

    const disciplinas = useMemo(() => {
        return grade.semestres.flatMap(
            semestre => semestre.disciplinas
        );
    }, [grade]);

    const disciplinasFiltradas = disciplinas.filter(
        (disciplina) => {

            const matchSearch =
                disciplina.nome
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ||
                disciplina.codigo
                    .toLowerCase()
                    .includes(search.toLowerCase());

            if (!matchSearch) return false;

            if (tab === "OBRIGATORIAS") {
                return disciplina.tipo === "OBRIGATORIA";
            }

            if (tab === "ELETIVAS") {
                return disciplina.tipo === "ELETIVA";
            }

            return true;
        }
    );

    return (
        <div className={styles.container}>

            <div className={styles.list}>
                {disciplinasFiltradas.map((disciplina) => (
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