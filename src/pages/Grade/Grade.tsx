import { ConflictModal } from "../../components/ConflictModal/ConflictModal";
import styles from "./Grade.module.scss";

import { DragOverlay, DndContext } from "@dnd-kit/core";

import { SelectedSidebar } from "./components/SelectedSidebar/SelectedSidebar";
import { SubjectsSidebar } from "./components/SubjectsSidebar/SubjectsSidebar";
import { WeeklyGrid } from "./components/WeeklyGrid/WeeklyGrid";

import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";

import { useGrade } from "../../context/GradeContext";
import { findConflictingSubjects } from "../../utils/findConflictingSubjects";
import type { SelectedSubject } from "../../types/grade";
import { calculateBlockGrid } from "../../utils/calculateBlockGrid";

export function Grade() {
  const location = useLocation();
  const { grade, semestreAtual, materiasConcluidasIds, materiasPendentesIds } =
    location.state;

  const [activeDisciplina, setActiveDisciplina] = useState<any>(null);

  const {
    setPreviewDisciplina,
    adicionarMateria,
    setPendingSubject,
    gradeSelecionada,
  } = useGrade();

  function handleDragStart(event: any) {
    const disciplina = event.active.data.current;

    setActiveDisciplina(disciplina);
    setPreviewDisciplina(disciplina);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    setActiveDisciplina(null);
    setPreviewDisciplina(null);

    if (!over) return;

    const disciplina = active.data.current;
    const slot = over.data.current;

    if (!disciplina || !slot) return;

    const [dayIndex, hourIndex] = over.id.toString().split("-").map(Number);

    const coluna = dayIndex + 2;
    const linha = hourIndex + 2;

    const turma = disciplina.turmas.find((turma: any) =>
      turma.horarios.some((horario: any) => {
        const bloco = calculateBlockGrid(
          horario.dia,
          horario.horaInicio,
          horario.horaFim,
        );

        if (!bloco) return false;

        return (
          bloco.gridColumn === coluna &&
          linha >= bloco.gridRowStart &&
          linha < bloco.gridRowEnd
        );
      }),
    );

    if (!turma) return;

    const novaMateria = {
      disciplina,
      turma,
    };

    const conflitos: SelectedSubject[] = turma.horarios.flatMap(
      (horario: any) => findConflictingSubjects(horario, gradeSelecionada),
    );

    const conflitosUnicos = Array.from(
      new Map(
        conflitos.map((item: SelectedSubject) => [
          item.disciplina.disciplinaCursoId,
          item,
        ]),
      ).values(),
    );

    if (conflitosUnicos.length > 0) {
      setPendingSubject({
        materia: novaMateria,
        conflitos: conflitosUnicos,
      });
      return;
    }

    adicionarMateria(novaMateria);
  }

  const primeiraTurma = activeDisciplina?.turmas?.[0];

  const horariosTexto = useMemo(() => {
    if (!primeiraTurma) return "";

    const diaMap: Record<string, string> = {
      SEGUNDA: "Seg",
      TERCA: "Ter",
      QUARTA: "Qua",
      QUINTA: "Qui",
      SEXTA: "Sex",
      SABADO: "Sáb",
      ANP: "ANP",
    };

    return primeiraTurma.horarios
      .map((h: any) => {
        if (!h.horaInicio) {
          return diaMap[h.dia] ?? h.dia;
        }

        return `${diaMap[h.dia] ?? h.dia} ${h.horaInicio.slice(0, 2)}h`;
      })
      .join(", ");
  }, [primeiraTurma]);

  return (
    <div className={styles.container}>
      <ConflictModal />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={styles.content}>
          <SubjectsSidebar
            grade={grade}
            semestreAtual={semestreAtual}
            materiasPendentesIds={materiasPendentesIds}
          />
          <WeeklyGrid />
          <SelectedSidebar />
        </div>

        <DragOverlay>
          {activeDisciplina ? (
            <div className={styles.dragPreview}>
              <div className={styles.header}>
                <span className={styles.codigo}>{activeDisciplina.codigo}</span>

                <span className={styles.creditos}>
                  {activeDisciplina.creditos} créditos
                </span>
              </div>

              <h4 className={styles.nome}>{activeDisciplina.nome}</h4>

              <span className={styles.horarios}>{horariosTexto}</span>

              <div className={styles.footer}>
                <span className={styles.professor}>
                  Prof. {primeiraTurma?.professor}
                </span>

                <span className={styles.turmas}>
                  {activeDisciplina.turmas?.length} turmas
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
