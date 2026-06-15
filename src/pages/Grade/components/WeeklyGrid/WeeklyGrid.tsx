import styles from "./WeeklyGrid.module.scss";

import { useGrade } from "../../../../context/GradeContext";

import { SubjectBlock } from "./components/SubjectBlock/SubjectBlock";
import { calculateBlockGrid } from "../../../../utils/calculateBlockGrid";
import React from "react";
import { hasScheduleConflict } from "../../../../utils/hasScheduleConflict";
import { findConflictingSubjects } from "../../../../utils/findConflictingSubjects";
import { useDroppable } from "@dnd-kit/core";

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

        previewDisciplina,
        setPreviewDisciplina,

        pendingSubject,
        setPendingSubject,

        adicionarMateria,
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
                        <DroppableCell
                            id={`${dayIndex}-${hourIndex}`}
                            row={hourIndex + 2}
                            col={dayIndex + 2}
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
                        professor={selected.turma.professor}
                        turmaCodigo={selected.turma.codigo}
                        sala={horario.sala}
                        {...calculateBlockGrid(
                            horario.dia,
                            horario.horaInicio,
                            horario.horaFim
                        )}
                    />
                ))
            )}

            {previewDisciplina?.turmas.map(
                (turma, turmaIndex) =>
                    turma.horarios.map((horario) => (
                        <SubjectBlock
                            key={`preview-${turma.turmaId}-${horario.id}`}

                            codigo={previewDisciplina.codigo}
                            nome={previewDisciplina.nome}

                            professor={turma.professor}
                            sala={horario.sala}
                            turmaCodigo={turma.codigo}

                            preview
                            colorIndex={turmaIndex}

                            hasConflict={hasScheduleConflict(
                                horario,
                                gradeSelecionada
                            )}

                            onClick={() => {

                                const novaMateria = {
                                    disciplina: previewDisciplina,
                                    turma,
                                };

                                const conflitos = turma.horarios.flatMap(
                                    (horario) =>
                                        findConflictingSubjects(
                                            horario,
                                            gradeSelecionada
                                        )
                                );

                                const conflitosUnicos = conflitos.filter(
                                    (materia, index, array) =>
                                        index ===
                                        array.findIndex(
                                            (m) =>
                                                m.disciplina.disciplinaCursoId ===
                                                materia.disciplina.disciplinaCursoId
                                        )
                                );

                                if (conflitosUnicos.length > 0) {

                                    setPendingSubject({
                                        materia: novaMateria,
                                        conflitos: conflitosUnicos,
                                    });

                                    return;
                                }

                                adicionarMateria(novaMateria);

                                setPreviewDisciplina(null);
                            }}

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

function DroppableCell({
    id,
    row,
    col,
}: {
    id: string;
    row: number;
    col: number;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: { row, col },
    });

    return (
        <div
            ref={setNodeRef}
            className={styles.cell}
            style={{
                gridColumn: col,
                gridRow: row,
                background: isOver
                    ? "rgba(0,255,204,0.08)"
                    : undefined,
            }}
        />
    );
}