import React, { useEffect, useState } from "react";

const GetStartedModal = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // Delay to match the transition duration
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white p-8 z-50 transition-transform duration-300 transform ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Modal content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
          <p className="text-gray-600">This is the content of the modal.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default GetStartedModal;
