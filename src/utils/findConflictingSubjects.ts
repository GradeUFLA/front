import type {
    Horario,
    SelectedSubject,
} from "../types/grade";

export function findConflictingSubjects(
    horarioPreview: Horario,
    gradeSelecionada: SelectedSubject[]
) {

    return gradeSelecionada.filter(
        (materia) =>
            materia.turma.horarios.some(
                (horarioAtual) => {

                    if (
                        horarioAtual.dia !==
                        horarioPreview.dia
                    ) {
                        return false;
                    }

                    return (
                        horarioPreview.horaInicio <
                            horarioAtual.horaFim &&
                        horarioPreview.horaFim >
                            horarioAtual.horaInicio
                    );
                }
            )
    );
}