import { useState } from "react";
import { Dot, Info, Share2 } from "lucide-react";
import LogoGrade from "../../assets/logo-grade.svg";

import { HowToSheet } from "../HowToSheet/HowToSheet";
import { ShareSheet } from "../ShareSheet/ShareSheet";
import { GoogleAgendaSheet } from "../GoogleAgendaSheet/GoogleAgendaSheet";

import styles from "./GradeHeader.module.scss";
import { useNavigate } from "react-router-dom";
import { useMatricula } from "../../hooks/useMatricula";

type ActiveSheet = "howTo" | "share" | "googleAgenda" | null;

export function GradeHeader() {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);

  const open = (sheet: ActiveSheet) => setActiveSheet(sheet);
  const close = () => setActiveSheet(null);
  const navigate = useNavigate();
  const { matricula, loading } = useMatricula();

  return (
    <>
      <header className={styles.header}>

        <div className={styles.logo} onClick={() => navigate("/")}>
          <span className={styles.LogoArea}>
            <img
              className={styles.imgLogo}
              src={LogoGrade}
              alt="Logo Grade UFLA"
            />
          </span>
          <h4 className={styles.name}>
            Grade<span>UFLA</span>
          </h4>
        </div>

        <div className={styles.headerTexts}>
          <h1 className={styles.titleGrade}>Minha Grade de Horários</h1>

          <div className={styles.description}>
            <div className={styles.matriculaBadge}>
              <span className={styles.dot}>
                <Dot />
              </span>
              <p>
                semestre {matricula?.periodo ?? "----"}
              </p>
            </div>
            <p className={styles.subtitle}>Organize suas disciplinas e otimize seu tempo acadêmico</p>
          </div>
        </div>

        <nav className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => open("howTo")}
            aria-label="Como montar a grade"
            title="Como montar a grade"
          >
            <Info size={16} />
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => {
              console.log("clicou share");
              open("share");
            }}
            aria-label="Compartilhar"
            title="Compartilhar"
          >
            <Share2 size={18} />
          </button>
        </nav>

      </header>

      <HowToSheet
        open={activeSheet === "howTo"}
        onClose={close}
      />
      <ShareSheet
        open={activeSheet === "share"}
        onClose={close}
        onGoogleAgenda={() => open("googleAgenda")}
      />
      <GoogleAgendaSheet
        open={activeSheet === "googleAgenda"}
        onClose={close}
      />
    </>
  );
}