import React from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB consideracion del tama;o segun el programador, se puede cambiar
let uploadedFiles = new Set(); //  almacena hashes de archivos ya subidos

// generar un hash SHA-256 del contenido
const generateHash = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

//  manejar el cambio de archivo con validaciones de seguridad
const handleFileChange = async (event, onFileUpload) => {
  const fileInput = event.target; // Guardamos la referencia al input
  const file = fileInput.files[0];

  if (!file) return;

  // Verifica que solo se suban archivos de texto
  if (file.type !== "text/plain") {
    alert("⚠️ Error: Solo se permiten archivos de texto (.txt).");
    fileInput.value = ""; // Resetea el input
    return;
  }

  // Bloquear archivos sospechosamente grandes
  if (file.size > MAX_FILE_SIZE) {
    alert("⚠️ Error: El archivo es demasiado grande (máximo 2MB).");
    fileInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    let content = e.target.result.trim();

    // Bloquear archivos vacíos
    if (!content || content.length === 0) {
      alert("⚠️ Error: El archivo está vacío.");
      fileInput.value = "";
      return;
    }

    // Verificar si el archivo contiene texto válido
    const hasText = /[a-zA-Z0-9]/.test(content);
    if (!hasText) {
      alert("⚠️ Error: El archivo no contiene cadenas de texto válidas.");
      fileInput.value = "";
      return;
    }

    // Validar contenido sospechoso antes de procesar
    const isMalicious = /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(content) || /javascript:/i.test(content);
    if (isMalicious) {
      alert("⚠️ Error: El archivo contiene código sospechoso y ha sido bloqueado.");
      fileInput.value = "";
      return;
    }

    // Eliminar caracteres sospechosos antes de procesar
    content = content.replace(/[<>]/g, "");

    // Generar hash SHA-256 del contenido
    const fileHash = await generateHash(content);

    // problema de la duplicacion 
    if (uploadedFiles.has(fileHash)) {
      console.warn("El archivo ya se había cargado anteriormente, pero se procederá a reanalizarlo.");
    } else {
      
      uploadedFiles.add(fileHash);
      console.log(`📄 Archivo cargado | Hash: ${fileHash}`);
    }

  
    onFileUpload(content);
    fileInput.value = ""; // Resetea el input para permitir volver a cargar el mismo archivo
  };

  reader.readAsText(file);
};

//  limpia el historial de archivos subidos
export const clearUploadedFiles = () => {
  uploadedFiles.clear();
};

const FileUpload = ({ onFileUpload }) => {
  return (
    <div className="file-upload">
      <label htmlFor="fileInput" className="upload-button">
        Seleccionar archivo de texto
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".txt"
        onChange={(event) => handleFileChange(event, onFileUpload)}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
