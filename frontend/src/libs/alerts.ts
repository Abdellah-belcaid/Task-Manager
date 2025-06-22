import type { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import Swal from "sweetalert2";

const customStyles: SweetAlertOptions = {
  customClass: {
    container: "custom-swal-container",
  },
};

const customOptions: SweetAlertOptions = {
  target: document.getElementById("root"),
  showConfirmButton: false,
  timerProgressBar: true,
  timer: 3000,
};

export const alertSuccess = async (
  message: string,
  title = "Success"
): Promise<void> => {
  return Swal.fire({
    title: title,
    icon: "success",
    text: message,
    ...customStyles,
    ...customOptions,
  }).then(() => {});
};

export const alertError = async (
  message: string,
  title = "Error"
): Promise<void> => {
  return Swal.fire({
    title: title,
    icon: "error",
    text: message,
    ...customStyles,
    ...customOptions,
  }).then(() => {});
};

export const alertWarning = async (message: string): Promise<void> => {
  return Swal.fire({
    title: "Warning",
    icon: "warning",
    text: message,
    ...customStyles,
    ...customOptions,
  }).then(() => {});
};

export const alertInfo = async (message: string): Promise<void> => {
  return Swal.fire({
    title: "Information",
    icon: "info",
    text: message,
    ...customStyles,
    ...customOptions,
  }).then(() => {});
};

export const alertConfirmation = async (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    ...customStyles,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
};
