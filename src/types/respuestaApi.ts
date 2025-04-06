export interface RespuestaApi {
  status: string;
  severity: "success" | "error" | "info" | "warn";
  summary: string;
  detail: string;
  error?: string | string[];
}
