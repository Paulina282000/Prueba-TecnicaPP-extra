import React from "react";

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Error: Solo se permiten archivos de texto (.txt).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileUpload(content);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label htmlFor="fileInput" className="upload-label">
        Seleccionar archivo de texto
      </label>
      <input type="file" id="fileInput" accept=".txt" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
