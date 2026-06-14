import styles from "./WeeklyGrid.module.scss";

import { useGrade } from "../../../../context/GradeContext";

import { SubjectBlock } from "./components/SubjectBlock/SubjectBlock";
import { calculateBlockGrid } from "../../../../utils/calculateBlockGrid";
import React from "react";

const dias = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
];

const horarios = Array.from(
    { length: 17 },
    (_, i) => `${i + 7}:00`
);

export function WeeklyGrid() {
    const {
        gradeAtual,
        trocarGrade,
        gradeSelecionada,
    } = useGrade();

    return (
        <div className={styles.grid}>

            <button
                className={styles.gradeButton}
                onClick={trocarGrade}
                style={{
                    gridColumn: 1,
                    gridRow: 1,
                }}
            >
                {gradeAtual}
            </button>

            {dias.map((dia, index) => (
                <div
                    key={dia}
                    className={styles.dayHeader}
                    style={{
                        gridColumn: index + 2,
                        gridRow: 1,
                    }}
                >
                    {dia}
                </div>
            ))}

            {horarios.map((hora, hourIndex) => (
                <React.Fragment key={hora}>
                    <div
                        className={styles.timeCell}
                        style={{
                            gridColumn: 1,
                            gridRow: hourIndex + 2,
                        }}
                    >
                        {hora}
                    </div>

                    {dias.map((_, dayIndex) => (
                        <div
                            key={`${hora}-${dayIndex}`}
                            className={styles.cell}
                            style={{
                                gridColumn: dayIndex + 2,
                                gridRow: hourIndex + 2,
                            }}
                        />
                    ))}
                </React.Fragment>
            ))}

            {gradeSelecionada.map((selected) =>
                selected.turma.horarios.map((horario) => (
                    <SubjectBlock
                        key={`${selected.turma.turmaId}-${horario.id}`}
                        codigo={selected.disciplina.codigo}
                        nome={selected.disciplina.nome}
                        {...calculateBlockGrid(
                            horario.dia,
                            horario.horaInicio,
                            horario.horaFim
                        )}
                    />
                ))
            )}

        </div>
    );
}