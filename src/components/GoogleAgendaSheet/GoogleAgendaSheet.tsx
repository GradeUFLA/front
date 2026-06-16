import { CalendarSync } from "lucide-react";
import { useGrade } from "../../context/GradeContext";
import { redirectToGoogleOAuth } from "../../auth/googleOAuth";
import { exportarGoogleAgenda } from "../../services/googleAgenda.service";
import { BottomSheet } from "../Bottomsheet/Bottomsheet";
import { GOOGLE_AGENDA_SUBJECT_COUNT } from "../../mocks/Gradeheader.mocks";
import styles from './GoogleAgendaSheet.module.scss'

export function GoogleAgendaSheet({ open, onClose }: any) {
  const { gradeSelecionada } = useGrade();

  async function handleExport() {
  const code = localStorage.getItem("google_auth_code");

  if (!code) {
    redirectToGoogleOAuth();
    return;
  }

  const payload = {
    authorizationCode: code,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    turmas: gradeSelecionada.map((item) => ({
      disciplinaNome: item.disciplina.nome,
      disciplinaCodigo: item.disciplina.codigo,
      turmaCodigo: item.turma.codigo,
      professor: item.turma.professor,
      horarios: item.turma.horarios.map((h: any) => ({
        diaSemana: h.dia,
        horaInicio: h.horaInicio,
        horaFim: h.horaFim,
        sala: h.sala,
      })),
    })),
    dataInicioSemestre: "2026-02-01",
    dataFimSemestre: "2026-07-01",
  };

  await exportarGoogleAgenda(payload);

  alert("Sincronizado com sucesso!");
  onClose();
}

  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="Sincronizar com Google Agenda">
      <div className={styles.body}>

        <div className={styles.googleIcon}>31</div>

        <h2 className={styles.title}>Sincronizar com Google Agenda?</h2>
        <p className={styles.desc}>
          {GOOGLE_AGENDA_SUBJECT_COUNT} matérias da sua grade atual serão
          exportadas como eventos recorrentes no Google Agenda.
        </p>

        <button className={styles.btnConfirm} onClick={handleExport}>
          <CalendarSync size={18} />
          Sim, sincronizar agora
        </button>

        <button className={styles.btnCancel} onClick={onClose}>
          Cancelar
        </button>

      </div>
    </BottomSheet>
  );
}