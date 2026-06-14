import styles from "./GridBackground.module.scss";

const dias = Array.from({ length: 6 });

const horarios = Array.from(
  { length: 17 },
  (_, index) => `${index + 7}:00`
);

export function GridBackground() {
  return (
    <div className={styles.grid}>
      {horarios.map((hora) => (
        <div key={hora} className={styles.row}>
          <div className={styles.time}>
            {hora}
          </div>

          {dias.map((_, index) => (
            <div
              key={`${hora}-${index}`}
              className={styles.cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}