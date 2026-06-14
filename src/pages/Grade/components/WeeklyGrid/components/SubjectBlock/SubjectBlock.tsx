import styles from "./SubjectBlock.module.scss";

type Props = {
  codigo: string;
  nome: string;

  gridColumn: number;
  gridRowStart: number;
  gridRowEnd: number;
};

export function SubjectBlock({
  codigo,
  nome,
  gridColumn,
  gridRowStart,
  gridRowEnd,
}: Props) {
  return (
    <div
      className={styles.container}
      style={{
        gridColumn,
        gridRow: `${gridRowStart} / ${gridRowEnd}`,
      }}
    >
      <span>{codigo}</span>

      <h4>{nome}</h4>
    </div>
  );
}