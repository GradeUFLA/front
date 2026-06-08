import { api } from "./api";

export type Course = {
  id: number;
  nome: string;
  codigo: string;
  creditosTotais: number;
}

export type Matriz = {
  id: number;
  cursoId: number;
  codigo: string;
  ano: number;
  ativa: boolean;
};

export async function getCourses(): Promise<Course[]> {
  const response = await api.get<Course[]>("/api/v1/public/cursos");

  return response.data;
}

export async function getCourseMatrizes(
  courseId: string
): Promise<Matriz[]> {
  const response = await api.get<Matriz[]>(
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