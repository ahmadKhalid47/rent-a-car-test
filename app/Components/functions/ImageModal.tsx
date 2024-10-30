"use client"; // Only needed for app directory
import { useState } from "react";

export default function ImageModal({ src, classes }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <img
        src={src}
        className={`transition duration-300 hover:opacity-70 ${classes}`}
        onClick={openModal}
      />

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <span
            className="absolute top-4 right-8 text-white text-4xl font-bold cursor-pointer transition hover:text-gray-400"
            onClick={closeModal}
          >
            &times;
          </span>
          <div className="text-center">
            <img src={src} className="w-[700px] mx-auto animate-zoom" />
          </div>
        </div>
      )}
    </div>
  );
}
