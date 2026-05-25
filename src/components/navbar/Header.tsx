import styles from "./Header.module.scss";
import LogoGrade from "../../assets/logo-grade.svg";
import { Info } from "lucide-react";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
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

      <button className={styles.infoBtn}>
        <Info size={16} />
      </button>
    </header>
  );
};
