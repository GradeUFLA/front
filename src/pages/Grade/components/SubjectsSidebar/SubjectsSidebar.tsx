import { useMemo, useState } from "react";
import styles from "./SubjectsSidebar.module.scss";
import type { GradeResponse } from "../../../../types/grade";
import { SubjectCard } from "./components/SubjectCard/SubjectCard";
import { useGrade } from "../../../../context/GradeContext";
import { Funnel, Search, SlidersHorizontal } from "lucide-react";

type Props = {
  grade: GradeResponse;
  semestreAtual: number;
  materiasPendentesIds: number[];
};

export function SubjectsSidebar({
  grade,
  semestreAtual,
  materiasPendentesIds,
}: Props) {
  const { gradeSelecionada } = useGrade();

  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");

  const [tab, setTab] = useState<
    "TODAS" | "OBRIGATORIAS" | "ELETIVAS" | "FUTURAS"
  >("TODAS");

  const [tipoFiltro, setTipoFiltro] = useState("");
  const [diaFiltro, setDiaFiltro] = useState("");
  const [horaInicioFiltro, setHoraInicioFiltro] = useState("");
  const [horaFimFiltro, setHoraFimFiltro] = useState("");
  const [creditosFiltro, setCreditosFiltro] = useState("");

  const disciplinas = useMemo(() => {
    const obrigatorias = grade.semestres.flatMap(
      (semestre) => semestre.disciplinas,
    );

    return [...obrigatorias, ...grade.eletivas];
  }, [grade]);

  function limparFiltros() {
    setTipoFiltro("");
    setDiaFiltro("");
    setHoraInicioFiltro("");
    setHoraFimFiltro("");
    setCreditosFiltro("");
  }

  const disciplinasFiltradas = disciplinas.filter((disciplina) => {
    const jaSelecionada = gradeSelecionada.some(
      (item) =>
        item.disciplina.disciplinaCursoId === disciplina.disciplinaCursoId,
    );

    if (jaSelecionada) return false;

    const matchSearch =
      disciplina.nome.toLowerCase().includes(search.toLowerCase()) ||
      disciplina.codigo.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (tipoFiltro && disciplina.tipo !== tipoFiltro) {
      return false;
    }

    if (diaFiltro) {
      const possuiDia = disciplina.turmas.some((turma) =>
        turma.horarios.some((horario) => horario.dia === diaFiltro),
      );

      if (!possuiDia) {
        return false;
      }
    }

    if (creditosFiltro && disciplina.creditos !== Number(creditosFiltro)) {
      return false;
    }

    if (horaInicioFiltro) {
      const possuiHorarioInicio = disciplina.turmas.some((turma) =>
        turma.horarios.some(
          (horario) => horario.horaInicio?.slice(0, 5) === horaInicioFiltro,
        ),
      );

      if (!possuiHorarioInicio) {
        return false;
      }
    }

    if (horaFimFiltro) {
      const possuiHorarioFim = disciplina.turmas.some((turma) =>
        turma.horarios.some(
          (horario) => horario.horaFim?.slice(0, 5) === horaFimFiltro,
        ),
      );

      if (!possuiHorarioFim) {
        return false;
      }
    }

    if (tab === "OBRIGATORIAS") {
      return (
        disciplina.tipo === "OBRIGATORIA" &&
        (disciplina.semestreSugerido === semestreAtual ||
          materiasPendentesIds.includes(disciplina.disciplinaId))
      );
    }

    if (tab === "ELETIVAS") {
      return grade.eletivas.some(
        (eletiva) => eletiva.disciplinaCursoId === disciplina.disciplinaCursoId,
      );
    }

    if (tab === "FUTURAS") {
      return (
        disciplina.tipo !== "ELETIVA" &&
        disciplina.semestreSugerido > semestreAtual
      );
    }

    return true;
  });

  const disciplinasAgrupadas = useMemo(() => {
    return disciplinasFiltradas.reduce(
      (acc, disciplina) => {
        const semestre = disciplina.semestreSugerido;

        if (!acc[semestre]) {
          acc[semestre] = [];
        }

        acc[semestre].push(disciplina);

        return acc;
      },
      {} as Record<number, typeof disciplinasFiltradas>,
    );
  }, [disciplinasFiltradas]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.searchContainer}>
          <button
            className={styles.filterButton}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Funnel size={18} />
          </button>

          <Search size={16} className={styles.searchIcon} />

          <input
            placeholder="Pesquisar disciplina"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {showFilters && (
        <div className={styles.filterCard}>
          <div className={styles.filterGroup}>
            <label>Tipo</label>

            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="OBRIGATORIA">Obrigatórias</option>
              <option value="ELETIVA">Eletivas</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Dia</label>

            <select
              value={diaFiltro}
              onChange={(e) => setDiaFiltro(e.target.value)}
            >
              <option value="">Qualquer dia</option>
              <option value="SEGUNDA">Segunda</option>
              <option value="TERCA">Terça</option>
              <option value="QUARTA">Quarta</option>
              <option value="QUINTA">Quinta</option>
              <option value="SEXTA">Sexta</option>
              <option value="SABADO">Sábado</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Hora início</label>

            <input
              type="time"
              value={horaInicioFiltro}
              onChange={(e) => setHoraInicioFiltro(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Hora fim</label>

            <input
              type="time"
              value={horaFimFiltro}
              onChange={(e) => setHoraFimFiltro(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label>Créditos</label>

            <select
              value={creditosFiltro}
              onChange={(e) => setCreditosFiltro(e.target.value)}
            >
              <option value="">Qualquer</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.clearFilters} onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          className={tab === "TODAS" ? styles.activeTab : styles.disabledTab}
          onClick={() => setTab("TODAS")}
        >
          Todas
        </button>

        <button
          className={
            tab === "OBRIGATORIAS" ? styles.activeTab : styles.disabledTab
          }
          onClick={() => setTab("OBRIGATORIAS")}
        >
          Obrigatórias
        </button>

        <button
          className={tab === "ELETIVAS" ? styles.activeTab : styles.disabledTab}
          onClick={() => setTab("ELETIVAS")}
        >
          Eletivas
        </button>

        <button
          className={tab === "FUTURAS" ? styles.activeTab : styles.disabledTab}
          onClick={() => setTab("FUTURAS")}
        >
          Futuras
        </button>
      </div>

      <div className={styles.list}>
        {tab === "FUTURAS"
          ? Object.entries(disciplinasAgrupadas).map(
              ([semestre, disciplinas]) => (
                <div key={semestre} className={styles.futureGroup}>
                  <h3 className={styles.futureTitle}>{semestre}º período</h3>

                  {disciplinas.map((disciplina) => (
                    <SubjectCard
                      key={disciplina.disciplinaCursoId}
                      disciplina={disciplina}
                    />
                  ))}
                </div>
              ),
            )
          : disciplinasFiltradas.map((disciplina) => (
              <SubjectCard
                key={disciplina.disciplinaCursoId}
                disciplina={disciplina}
              />
            ))}
      </div>
    </div>
  );
}
