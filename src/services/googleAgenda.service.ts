import { api } from "./api";

export async function exportarGoogleAgenda(payload: any) {
  return api.post("/api/v1/export/google-agenda", payload);
}