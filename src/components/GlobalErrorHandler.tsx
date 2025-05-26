import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showGlobalError(message: string) {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
  });
}
