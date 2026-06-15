import styles from "./SubjectBlock.module.scss";

type Props = {
  codigo: string;
  nome: string;

  professor?: string;
  sala?: string;
  turmaCodigo?: string;

  gridColumn: number;
  gridRowStart: number;
  gridRowEnd: number;

  preview?: boolean;
  colorIndex?: number;
  hasConflict?: boolean;

  onClick?: () => void;

  onMouseEnter?: () => void;
};

export function SubjectBlock({
  codigo,
  nome,
  professor,
  sala,
  turmaCodigo,
  gridColumn,
  gridRowStart,
  gridRowEnd,
  preview = false,
  colorIndex = 0,
  hasConflict = false,
  onClick,
}: Props) {
  const previewClass = preview ? styles.preview : "";

  const conflictClass = hasConflict ? styles.conflict : "";

  const colorClass = styles[`color${colorIndex % 6}`];

  return (
    <div
      className={`
                ${styles.container}
                ${previewClass}
                ${conflictClass}
                ${colorClass}
            `}
      style={{
        gridColumn,
        gridRow: `${gridRowStart} / ${gridRowEnd}`,
      }}
      onClick={onClick}
      
    >
      <span className={styles.codigo}>{codigo}</span>

      <h4 className={styles.nome}>{nome}</h4>

      {professor && <p className={styles.info}>Prof. {professor}</p>}

      {sala && <p className={styles.info}>Sala {sala}</p>}

      {turmaCodigo && <p className={styles.info}>{turmaCodigo}</p>}
    </div>
  );
}
