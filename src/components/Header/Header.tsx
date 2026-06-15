import styles from "./Header.module.scss";
import LogoGrade from "../../assets/logo-grade.svg";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {

  const navigate = useNavigate();

  return (
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

      <button className={styles.infoBtn}>
        <Info size={16} />
      </button>
    </header>
  );
};
