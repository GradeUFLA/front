// ─── gradeHeader.mocks.ts ─────────────────────────────────────────────────────
// Dados estáticos dos bottom sheets. Substitua pela sua store/API quando necessário.

export interface HowToStep {
  n: number;
  title: string;
  body: string; // aceita HTML simples via dangerouslySetInnerHTML
}

export interface Developer {
  name: string;
  linkedinUrl: string;
}

export const HOW_TO_STEPS: HowToStep[] = [
  {
    n: 1,
    title: "Encontre suas matérias",
    body: "Você verá todas as disciplinas disponíveis de acordo com o curso selecionado, a matriz curricular desejada, o semestre que está cursando e as matérias que ainda não foram concluídas — organizadas em grupos como <strong>Obrigatórias</strong>, <strong>Eletivas</strong> e <strong>Matérias futuras</strong>.",
  },
  {
    n: 2,
    title: "Adicione as matérias ao calendário",
    body: "Na barra lateral esquerda, clique na disciplina desejada, segure e arraste-a até o horário correspondente no calendário (<strong>drag and drop</strong>). Solte para fixar.",
  },
  {
    n: 3,
    title: "Teste diferentes cenários",
    body: "Quer testar diferentes combinações de grades? Utilize a função de <strong>novas guias</strong> para montar e comparar cenários distintos sem perder o que já foi planejado.",
  },
  {
    n: 4,
    title: "Resolva conflitos de horário",
    body: "O sistema detecta automaticamente sobreposições de horário. Se você tentar adicionar uma disciplina que conflita com outra já presente na sua grade, um <strong>modal de confirmação</strong> será exibido, informando o conflito e perguntando se você deseja substituir a matéria existente pela nova.",
  },
  {
    n: 5,
    title: "Exporte ou sincronize",
    body: "Com o calendário montado e sem conflitos, você pode salvar seu horário de duas formas:<br /><strong>Baixar como imagem (.jpg):</strong> ideal para guardar na galeria do celular.<br /><strong>Exportar para o Google Agenda:</strong> sincronize suas aulas e receba notificações antes de cada aula.",
  },
];

export const DEVELOPERS: Developer[] = [
  { name: "Ana Clara Rocha", linkedinUrl: "https://linkedin.com" },
  { name: "Bárbara Fonseca",  linkedinUrl: "https://linkedin.com" },
  { name: "Fernando Scarabeli",  linkedinUrl: "https://linkedin.com" },
  { name: "Jhennifer Campos",  linkedinUrl: "https://linkedin.com" },
  { name: "José Vitor Machado",  linkedinUrl: "https://linkedin.com" },
];

export const GOOGLE_AGENDA_SUBJECT_COUNT = 4;