import { isAxiosError } from "axios";
import { ToastMessageOptions } from "primereact/toast";
export function toastSuccess(data: unknown): ToastMessageOptions {
  return { ...(data as ToastMessageOptions), life: 3000 };
}
export function toastError(data: unknown): ToastMessageOptions {
  if (isAxiosError(data)) {
    console.log(data?.response);
    return { severity: data.response?.data.severity, summary: data.response?.data.summary, detail: data.response?.data.detail + " " + data.response?.data.error, life: 3000 };
  } else {
    return { severity: "error", summary: "Error", detail: data, life: 3000 };
  }
}
