import type {
  Horario,
  SelectedSubject,
} from "../types/grade";

export function findConflictingSubjects(
  horarioPreview: Horario,
  gradeSelecionada: SelectedSubject[],
) {
  return gradeSelecionada.filter((materia) =>
    materia.turma.horarios.some((horarioAtual) => {

      // ANP nunca gera conflito
      if (
        horarioPreview.dia === "ANP" ||
        horarioAtual.dia === "ANP"
      ) {
        return false;
      }

      // horários nulos também não geram conflito
      if (
        !horarioPreview.horaInicio ||
        !horarioPreview.horaFim ||
        !horarioAtual.horaInicio ||
        !horarioAtual.horaFim
      ) {
        return false;
      }

      if (horarioAtual.dia !== horarioPreview.dia) {
        return false;
      }

      return (
        horarioPreview.horaInicio < horarioAtual.horaFim &&
        horarioPreview.horaFim > horarioAtual.horaInicio
      );
    }),
  );
}