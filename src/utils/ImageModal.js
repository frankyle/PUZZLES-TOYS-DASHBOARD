import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-[90vh] object-contain cursor-pointer rounded-lg"
          onClick={onClose}
        />
        <button
          className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </motion.div>
    </div>
  );
};

export default ImageModal;
