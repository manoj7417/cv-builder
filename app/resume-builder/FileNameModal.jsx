import { useState } from 'react';

export const FileNameModal = ({ onSave, onClose }) => {
  const [filename, setFilename] = useState("generated.pdf");

  const handleSave = () => {
    if (filename.trim()) {
      onSave(filename.trim());
    } else {
      alert("Filename cannot be empty");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Save As</h3>
        <input 
          type="text" 
          value={filename} 
          onChange={(e) => setFilename(e.target.value)} 
          placeholder="Enter file name" 
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
