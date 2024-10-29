import React from 'react';
import { motion } from 'framer-motion';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <motion.div
        className="bg-white rounded-lg p-6 max-w-md mx-auto"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "-100vh" }}
      >
        <h2 className="text-xl font-bold mb-4">How to Play the Tower of Hanoi</h2>
        <p className="mb-2">
          The Tower of Hanoi is a classic puzzle game. The objective is to move all the discs from the source tower to the destination tower, following these rules:
        </p>
        <ul className="list-disc ml-4 mb-4">
          <li>Only one disc can be moved at a time.</li>
          <li>A disc can only be placed on top of a larger disc or on an empty tower.</li>
          <li>You can use any of the three towers to move discs to the last tower.</li>
        </ul>
        <p>
          Click on a tower to select a disc and then click on another tower to place it there.
        </p>

        <h3 className="mt-4 font-semibold">Settings:</h3>
        <p>You can change the number of discs in the settings modal.</p>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DemoModal;
