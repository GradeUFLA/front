import { CalendarSync } from "lucide-react";
import styles from "./GoogleAgendaSheet.module.scss";
import { BottomSheet } from "../Bottomsheet/Bottomsheet";
import { GOOGLE_AGENDA_SUBJECT_COUNT } from "../../mocks/Gradeheader.mocks";

interface GoogleAgendaSheetProps {
  open: boolean;
  onClose: () => void;
}

export function GoogleAgendaSheet({ open, onClose }: GoogleAgendaSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="Sincronizar com Google Agenda">
      <div className={styles.body}>

        <div className={styles.googleIcon}>31</div>

        <h2 className={styles.title}>Sincronizar com Google Agenda?</h2>
        <p className={styles.desc}>
          {GOOGLE_AGENDA_SUBJECT_COUNT} matérias da sua grade atual serão
          exportadas como eventos recorrentes no Google Agenda.
        </p>

        <button className={styles.btnConfirm}>
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