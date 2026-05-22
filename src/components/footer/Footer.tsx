import styles from "./Footer.module.scss";
import CountUp from '../reactbits/effects/CountUp/CountUp';
import { Dot } from 'lucide-react';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        <p>
          &copy; 2026 GradeUFLA <Dot /> Desenvolvido para a comunidade
          acadêmica.
        </p>
      </div>

      <div className={styles.metrics}>
        <p>
          Usuários ativos{" "}
          <span>
            <CountUp
              from={0}
              to={1000}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
            +
          </span>
        </p>
        <p>
          Grades criadas{" "}
          <span>
            <CountUp
              from={0}
              to={5000}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
            +
          </span>
        </p>
      </div>
    </div>
  );
};
