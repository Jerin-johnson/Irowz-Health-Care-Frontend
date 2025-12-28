import Swal from "sweetalert2";

export const confirmAction = async (options: {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "error" | "warning" | "info";
}) => {
  const {
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "warning",
  } = options;

  const result = await Swal.fire({
    title,
    text: description,
    icon: type,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};
