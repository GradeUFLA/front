import type {
    Horario,
    SelectedSubject,
} from "../types/grade";

export function hasScheduleConflict(
    horarioPreview: Horario,
    gradeSelecionada: SelectedSubject[]
) {

    return gradeSelecionada.some((materia) =>
        materia.turma.horarios.some((horarioAtual) => {

            if (
                horarioAtual.dia !==
                horarioPreview.dia
            ) {
                return false;
            }

            const inicioPreview =
                horarioPreview.horaInicio;

            const fimPreview =
                horarioPreview.horaFim;

            const inicioAtual =
                horarioAtual.horaInicio;

            const fimAtual =
                horarioAtual.horaFim;

            return (
                inicioPreview < fimAtual &&
                fimPreview > inicioAtual
            );
        })
    );
}