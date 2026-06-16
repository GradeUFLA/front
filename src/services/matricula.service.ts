import { api } from "./api";

export async function getMatricula() {
  return api.get("/api/v1/public/matriculas/periodo");
}