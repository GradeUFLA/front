import styles from "./WeeklyGrid.module.scss";

import { useGrade } from "../../../../context/GradeContext";

import { SubjectBlock } from "./components/SubjectBlock/SubjectBlock";
import { calculateBlockGrid } from "../../../../utils/calculateBlockGrid";

import React from "react";
import { hasScheduleConflict } from "../../../../utils/hasScheduleConflict";
import { useDroppable } from "@dnd-kit/core";

const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const horarios = Array.from({ length: 17 }, (_, i) => `${i + 7}:00`);

export function WeeklyGrid() {
  const {
    gradeAtual,
    trocarGrade,
    gradeSelecionada,
    previewDisciplina,
  } = useGrade();

  return (
    <div className={styles.grid}>
      <button
        className={styles.gradeButton}
        onClick={trocarGrade}
        style={{ gridColumn: 1, gridRow: 1 }}
      >
        {gradeAtual}
      </button>

      {dias.map((dia, index) => (
        <div
          key={dia}
          className={styles.dayHeader}
          style={{ gridColumn: index + 2, gridRow: 1 }}
        >
          {dia}
        </div>
      ))}

      {horarios.map((hora, hourIndex) => (
        <React.Fragment key={hora}>
          <div
            className={styles.timeCell}
            style={{ gridColumn: 1, gridRow: hourIndex + 2 }}
          >
            {hora}
          </div>

          {dias.map((_, dayIndex) => (
            <DroppableCell
              key={`${dayIndex}-${hourIndex}`}
              id={`${dayIndex}-${hourIndex}`}
              row={hourIndex + 2}
              col={dayIndex + 2}
            />
          ))}
        </React.Fragment>
      ))}

      {(() => {
        let anpIndex = 0;

        return (
          <>
            {gradeSelecionada.map((selected) =>
              selected.turma.horarios.map((horario) => {
                if (horario.dia === "ANP") return null;

                const grid = calculateBlockGrid(
                  horario.dia,
                  horario.horaInicio,
                  horario.horaFim
                );

                if (!grid) return null;

                return (
                  <SubjectBlock
                    key={`${selected.turma.turmaId}-${horario.id}`}
                    codigo={selected.disciplina.codigo}
                    nome={selected.disciplina.nome}
                    professor={selected.turma.professor}
                    turmaCodigo={selected.turma.codigo}
                    sala={horario.sala}
                    {...grid}
                  />
                );
              })
            )}

            {gradeSelecionada.map((selected) =>
              selected.turma.horarios.map((horario) => {
                if (horario.dia !== "ANP") return null;

                const index = anpIndex++;

                return (
                  <SubjectBlock
                    key={`anp-${selected.turma.turmaId}-${horario.id}`}
                    codigo={selected.disciplina.codigo}
                    nome={selected.disciplina.nome}
                    professor={selected.turma.professor}
                    turmaCodigo={selected.turma.codigo}
                    sala={horario.sala}
                    gridColumn={7}
                    gridRowStart={index + 2}
                    gridRowEnd={index + 3}
                  />
                );
              })
            )}

            {previewDisciplina?.turmas.map((turma, turmaIndex) =>
              turma.horarios.map((horario) => {
                if (horario.dia !== "ANP") return null;

                const index = anpIndex++;

                return (
                  <SubjectBlock
                    key={`preview-anp-${turma.turmaId}-${horario.id}`}
                    codigo={previewDisciplina.codigo}
                    nome={previewDisciplina.nome}
                    professor={turma.professor}
                    sala={horario.sala}
                    turmaCodigo={turma.codigo}
                    preview
                    colorIndex={turmaIndex}
                    gridColumn={7}
                    gridRowStart={index + 2}
                    gridRowEnd={index + 3}
                  />
                );
              })
            )}

            {previewDisciplina?.turmas.map((turma, turmaIndex) =>
              turma.horarios.map((horario) => {
                if (horario.dia === "ANP") return null;

                const grid = calculateBlockGrid(
                  horario.dia,
                  horario.horaInicio,
                  horario.horaFim
                );

                if (!grid) return null;

                return (
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
                    {...grid}
                  />
                );
              })
            )}
          </>
        );
      })()}
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
        background: isOver ? "rgba(0,255,204,0.08)" : undefined,
      }}
    />
  );
}