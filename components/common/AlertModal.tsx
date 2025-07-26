"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type AlertModalProps = {
  message: string;
  onClose: () => void;
};

export default function AlertModal({ message, onClose }: AlertModalProps) {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4">Notice</h2>
        <p className="text-gray-700">{message}</p>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
