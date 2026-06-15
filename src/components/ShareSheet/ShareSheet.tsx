import { X, Image as ImageIcon, CalendarSync, CalendarArrowUp } from "lucide-react";
import styles from "./ShareSheet.module.scss";
import { BottomSheet } from "../Bottomsheet/Bottomsheet";

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  onGoogleAgenda: () => void;
}

export function ShareSheet({ open, onClose, onGoogleAgenda }: ShareSheetProps) {
  function handleGoogleAgenda() {
    onClose();
    setTimeout(onGoogleAgenda, 50);
  }

  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="Compartilhar">
      <div className={styles.body}>

        <div className={styles.header}>
          <h2 className={styles.title}>Compartilhar</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </button>
        </div>

        {/* Baixar Grade */}
        <button className={styles.item}>
          <span className={styles.itemIcon}>
            <ImageIcon size={20} />
          </span>
          <span className={styles.itemContent}>
            <span className={styles.itemTitle}>Baixar Grade</span>
            <span className={styles.itemDesc}>Exportar grade atual como JPG</span>
          </span>
        </button>

        {/* Sincronizar com Google Agenda */}
        <button className={styles.item} onClick={handleGoogleAgenda}>
          <span className={styles.itemIcon}>
            <CalendarSync size={20} />
          </span>
          <span className={styles.itemContent}>
            <span className={styles.itemTitle}>Sincronizar com Google Agenda</span>
            <span className={styles.itemDesc}>Importar horários automaticamente</span>
          </span>
          <span className={styles.itemArrow}>
            <CalendarArrowUp size={18} />
          </span>
        </button>

      </div>
    </BottomSheet>
  );
}