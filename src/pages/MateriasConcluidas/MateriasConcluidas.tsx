import { useNavigate } from "react-router-dom";
import styles from "./MateriasConcluidas.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDisciplinasAnteriores,
  montarGrade,
} from "../../services/grade.service";

type DisciplinaAnterior = {
  id: number;
  nome: string;
  codigo: string;
  semestre: number;
  concluida: boolean;
};

export function MateriasConcluidas() {
  const navigate = useNavigate();
  const location = useLocation();
  const [disciplinas, setDisciplinas] = useState<DisciplinaAnterior[]>([]);

  const { courseId, matrizId, semestre } = location.state;

  useEffect(() => {
    async function fetchData() {
      const data = await getDisciplinasAnteriores(courseId, matrizId, semestre);

      const dataFormatada = data.map((disciplina) => ({
        ...disciplina,
        concluida: true,
      }));

      setDisciplinas(dataFormatada);
    }

    fetchData();
  }, [courseId, matrizId, semestre]);

  function toggleDisciplina(id: number) {
    setDisciplinas((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
            ...d,
            concluida: !d.concluida,
          }
          : d,
      ),
    );
  }

  const disciplinasPorSemestre = disciplinas.reduce(
    (acc, disciplina) => {
      if (!acc[disciplina.semestre]) {
        acc[disciplina.semestre] = [];
      }

      acc[disciplina.semestre].push(disciplina);

      return acc;
    },
    {} as Record<number, DisciplinaAnterior[]>,
  );

  async function handleGerarGrade() {
    const payload = {
      semestreAtual: Number(semestre),
      materiasConcluidasIds: disciplinas
        .filter((d) => d.concluida)
        .map((d) => d.id),
    };

    try {
      const response = await montarGrade(courseId, matrizId, payload);

      navigate("/grade-curricular", {
        state: {
          grade: response,

          semestreAtual: Number(semestre),

          materiasConcluidasIds: disciplinas
            .filter((d) => d.concluida)
            .map((d) => d.id),

          materiasPendentesIds: disciplinas
            .filter((d) => !d.concluida)
            .map((d) => d.id),
        },
      });
    } catch (error) {
      console.error("Erro ao gerar grade:", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Matérias</h1>
        <p className={styles.description}>
          Desmarque as matérias que você ainda NÃO cursou
        </p>
      </div>

      <div className={styles.materiasArea}>
        {Object.entries(disciplinasPorSemestre).map(
          ([semestre, disciplinasDoSemestre]) => (
            <div key={semestre} className={styles.card}>
              <h2>{semestre}º Semestre</h2>

              {disciplinasDoSemestre.map((d) => (
                <div key={d.id} className={styles.disciplinaContainer}>
                  <label className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      checked={d.concluida}
                      onChange={() => toggleDisciplina(d.id)}
                      className={styles.hiddenCheckbox}
                    />

                    <span className={styles.customCheckbox} />

                    <span className={styles.disciplinaContent}>
                      <p className={styles.nomeDisciplina}>{d.nome}</p>
                      <p className={styles.codeDisciplina}>{d.codigo}</p>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          ),
        )}
      </div>

      <div className={styles.buttons}>
        <button className={styles.continueBtn} onClick={handleGerarGrade}>
          Continuar para Montagem
        </button>

        <button
          className={styles.BtnVoltar}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
