export interface RespuestaApi {
  severity: "success" | "error" | "info" | "warn";
  summary: string;
  detail: string;
  error?: string | string[];
}
