export function hourToRow(hour: string) {
  const hora = Number(hour.split(":")[0]);

  return hora - 7;
}