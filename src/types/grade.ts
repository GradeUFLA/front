export type Horario = {
  id: number;
  dia: string;
  horaInicio: string;
  horaFim: string;
  sala: string;
};

export type Turma = {
  turmaId: number;
  codigo: string;
  professor: string;
  vagas: number;
  periodoLetivo: string;
  horarios: Horario[];
};

export type PreRequisito = {
  disciplinaCursoId: number;
  disciplinaId: number;
  nome: string;
  codigo: string;
  tipoRequisito: string;
};

export type DisciplinaGrade = {
  disciplinaCursoId: number;
  disciplinaId: number;
  nome: string;
  codigo: string;
  creditos: number;
  tipo: string;
  semestreSugerido: number;
  progressoNecessario: number;
  subgrupo: string;
  preRequisitos: PreRequisito[];
  turmas: Turma[];
};

export type SemestreGrade = {
  numero: number;
  disciplinas: DisciplinaGrade[];
};

export type CursoGrade = {
  id: number;
  nome: string;
  codigo: string;
  creditosTotais: number;
};

export type GradeResponse = {
  curso: CursoGrade;
  semestres: SemestreGrade[];
};

export type MontarGradeRequest = {
  semestreAtual: number;
  materiasConcluidasIds: number[];
};

export type SelectedSubject = {
  disciplina: DisciplinaGrade;
  turma: Turma;
};