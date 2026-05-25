import { ArrowDown, Dot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.scss";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.matriculaBadge}>
        <span className={styles.dot}>
          <Dot />
        </span>
        <p>MATRÌCULAS 2026/2 ABERTAS</p>
      </div>

      <div className={styles.description}>
        <h2 className={styles.title}>
          Monte sua grade <span>em segundos.</span>
        </h2>
        <p className={styles.subtitle}>
          A ferramenta definitiva para o planejamento acadêmico na UFLA.
          Organize seu semestre com inteligência, evite conflitos e otimize seu
          tempo.
        </p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.continueBtn} onClick={() => navigate("/stepper")}>
          Começar Agora <ArrowDown />{" "}
        </button>
      </div>
    </div>
  );
};
