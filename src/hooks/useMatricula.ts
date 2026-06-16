import { useEffect, useState } from "react";
import { getMatricula } from "../services/matricula.service";

type Matricula = {
  periodo: string;
};

export function useMatricula() {
  const [matricula, setMatricula] = useState<Matricula | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const response = await getMatricula();
        setMatricula(response.data);

      } catch (err) {
        console.error("Erro ao buscar matrícula:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    matricula,
    loading,
    error,
  };
}