import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
}

export function toast({ title, description, type = "info" }: ToastOptions) {
  sonnerToast[type](`${title} - ${description}`);
}