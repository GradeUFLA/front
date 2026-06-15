export function formatDay(dia: string) {

    const dias: Record<string, string> = {
        SEGUNDA: "Seg",
        TERCA: "Ter",
        QUARTA: "Qua",
        QUINTA: "Qui",
        SEXTA: "Sex",
        SABADO: "Sáb",
    };

    return dias[dia] ?? dia;
}