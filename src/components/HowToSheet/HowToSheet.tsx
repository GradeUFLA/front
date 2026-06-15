// ─── HowToSheet.tsx ───────────────────────────────────────────────────────────
// Bottom sheet "Como montar a sua grade".

import { X, LayoutGrid, ExternalLink } from "lucide-react";
import styles from "./HowToSheet.module.scss";
import { BottomSheet } from "../Bottomsheet/Bottomsheet";
import { DEVELOPERS, HOW_TO_STEPS } from "../../mocks/Gradeheader.mocks";

interface HowToSheetProps {
  open: boolean;
  onClose: () => void;
}

export function HowToSheet({ open, onClose }: HowToSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} ariaLabel="Como montar a sua grade">
      <div className={styles.body}>

        {/* Eyebrow + close */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <LayoutGrid size={14} />
            <span>Como montar a sua grade</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </button>
        </div>

        {/* Intro */}
        <p className={styles.intro}>
          Bem-vindo(a) ao{" "}
          <strong>
            grade<span className={styles.accent}>UFLA</span>
          </strong>
          ! Organizar o seu horário para o próximo semestre nunca foi tão
          simples. Esta ferramenta foi criada para que você visualize suas aulas
          de forma prática e evite conflitos de horário antes mesmo da matrícula.
        </p>

        {/* Steps */}
        <p className={styles.sectionLabel}>Passo a passo</p>

        <ul className={styles.stepList}>
          {HOW_TO_STEPS.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.badge}>{s.n}</span>
              <div>
                <p className={styles.stepTitle}>{s.title}</p>
                <p
                  className={styles.stepBody}
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Warning */}
        <div className={styles.warning}>
          <strong>Atenção:</strong> Esta é uma ferramenta de simulação e{" "}
          <strong>não tem vínculo com a UFLA</strong>. Use-a para planejar
          diferentes cenários antes do período de matrícula, mas não se esqueça
          de efetivar sua matrícula no SIG. Os horários exibidos são baseados
          nos dados oficiais, porém podem ser alterados pela universidade a
          qualquer momento. Sempre confirme as informações no SIG antes de
          decidir sua grade horária.
        </div>

        {/* Developers */}
        <div className={styles.devSection}>
          <p className={styles.devLabel}>Desenvolvido por</p>
          {DEVELOPERS.map((dev) => (
            <a
              key={dev.name}
              href={dev.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devRow}
            >
              <span className={styles.devName}>{dev.name}</span>
              <span className={styles.devLink}>
                LinkedIn&nbsp;
                <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle" }} />
              </span>
            </a>
          ))}
        </div>

      </div>
    </BottomSheet>
  );
}