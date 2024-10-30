"use client";
import { useState } from "react";

export default function ImageModal({ src, classes }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1); // Scale factor for zoom

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setScale(1); // Reset zoom when modal is closed
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // Max zoom 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 1)); // Min zoom 1x

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
          {/* Close Button */}
          <span
            className="absolute top-4 right-8 text-white text-4xl font-bold cursor-pointer transition hover:text-gray-400"
            onClick={closeModal}
          >
            &times;
          </span>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-8 flex gap-4 z-[52]">
            <button
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              onClick={zoomIn}
            >
              Zoom In +
            </button>
            <button
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
              onClick={zoomOut}
            >
              Zoom Out -
            </button>
          </div>

          {/* Image with zoom effect */}
          <div className="text-center z-[51]">
            <img
              src={src}
              style={{ transform: `scale(${scale})` }}
              className="w-[700px] mx-auto transition-transform duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}
