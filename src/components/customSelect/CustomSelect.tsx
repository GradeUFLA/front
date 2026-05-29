import { useState } from "react";
import styles from "./CustomSelect.module.scss";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CustomSelect({
  placeholder = "Selecione uma opção",
  options,
  value,
  onChange,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  function handleSelect(optionValue: string) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div className={`${styles.selectContainer} ${className || ""}`}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setOpen(!open)}
      >
        <span>{selectedOption?.label || placeholder}</span>

        <ChevronDown
          size={20}
          className={`${styles.icon} ${open ? styles.open : ""}`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={styles.option}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
