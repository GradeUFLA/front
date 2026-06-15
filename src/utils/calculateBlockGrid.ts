import { START_HOUR } from "./scheduleGrid";

const dayMap: Record<string, number> = {
  SEGUNDA: 2,
  TERCA: 3,
  QUARTA: 4,
  QUINTA: 5,
  SEXTA: 6,
  SABADO: 7,
};

function hourToGridStart(time: string) {
  const [hour] = time.split(":");
  return Number(hour);
}

function hourToGridEnd(time: string) {
  const [hour, minute] = time.split(":");

  if (Number(minute) > 0) {
    return Number(hour) + 1;
  }

  return Number(hour);
}

export function calculateBlockGrid(
  dia: string,
  horaInicio: string | null,
  horaFim: string | null
) {
  if (!horaInicio || !horaFim) {
    return null;
  }

  const inicio =
    hourToGridStart(horaInicio) - START_HOUR + 2;

  const fim =
    hourToGridEnd(horaFim) - START_HOUR + 2;

  return {
    gridColumn: dayMap[dia],
    gridRowStart: inicio,
    gridRowEnd: fim,
  };
}

export function calculateANPGrid(slotIndex: number) {
  return {
    gridColumn: 7, // sábado
    gridRowStart: slotIndex + 2,
    gridRowEnd: slotIndex + 3,
  };
}