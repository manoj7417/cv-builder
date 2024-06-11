import React from "react";

const GetStartedModal = ({onClose}) => {
  return (
    <>
     <div className="fixed bottom-0 left-0 right-0 top-0 bg-black opacity-50 z-50" />
    <div className="fixed bottom-0 left-0 right-0 bg-white p-8 z-50">
      {/* Modal content */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
        <p className="text-gray-600">This is the content of the modal.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    </>
  );
};

export default GetStartedModal;
