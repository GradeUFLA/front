import { useEffect } from "react";
import styles from "./BottomSheet.module.scss";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function BottomSheet({ open, onClose, children, ariaLabel }: BottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`}
      >
        <div className={styles.dragHandle} />
        {children}
      </div>
    </>
  );
}