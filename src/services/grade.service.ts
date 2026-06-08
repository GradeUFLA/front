import { api } from "./api";

export type DisciplinaAnterior = {
    id: number;
    nome: string;
    codigo: string;
    semestre: number;
};

export async function getDisciplinasAnteriores(
    courseId: string,
    matrizId: string,
    semestre: string
): Promise<DisciplinaAnterior[]> {
    const response = await api.get<DisciplinaAnterior[]>(
        `/api/v1/public/grade/disciplinas/${Number(courseId)}/matrizes/${Number(matrizId)}/semestres/${Number(semestre)}`
    );

    return response.data;
}

export async function montarGrade(
  cursoId: number,
  matrizId: number,
  body: any
) {
  const response = await api.post(
    `/api/v1/public/grade/disciplinas/${cursoId}/matrizes/${matrizId}`,
    body
  );

  return response.data;
}