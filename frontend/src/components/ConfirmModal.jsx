import { useEffect, useState } from "react";

export default function ConfirmModal({
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  confirmColor = "bg-blue-600", // Tailwind class for button color
  cancelText = "Cancel",
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${animate ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-sm p-6 mx-4 transition-all duration-300 transform ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg text-white hover:opacity-90 transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
