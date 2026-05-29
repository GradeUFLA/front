import { api } from "./api";

export type Course = {
  id: number;
  nome: string;
  codigo: string;
  creditosTotais: number;
}

export async function getCourses(): Promise<Course[]> {
  const response = await api.get<Course[]>("/api/v1/public/cursos");

  return response.data;
}

export async function getCourseMatrizes(courseId: string): Promise<string[]> {
  const response = await api.get<string[]>(
    `/api/v1/public/cursos/matrizes/${Number(courseId)}`
  );

  return response.data;
}

export async function getCourseSemestres(courseId: string, matrizId: string): Promise<number[]> {
  const response = await api.get<number[]>(
    `/api/v1/public/cursos/${Number(courseId)}/matrizes/${Number(matrizId)}/semestres`
  );

  return response.data;
}