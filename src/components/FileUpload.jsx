import React from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const uploadedFiles = new Set(); // Para almacenar hashes de archivos ya subidos

// Función para generar un hash SHA-256 del contenido
const generateHash = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

// Función para manejar el cambio de archivo con validaciones de seguridad
const handleFileChange = async (event, onFileUpload) => {
  const file = event.target.files[0];

  if (!file) return;

  // Verificar que solo se suban archivos de texto
  if (file.type !== "text/plain") {
    alert("⚠️ Error: Solo se permiten archivos de texto (.txt).");
    return;
  }

  // ✅ Bloquear archivos sospechosamente grandes
  if (file.size > MAX_FILE_SIZE) {
    alert("⚠️ Error: El archivo es demasiado grande (máximo 2MB).");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    let content = e.target.result.trim();

    // ✅ Bloquear archivos vacíos
    if (!content || content.length === 0) {
      alert("⚠️ Error: El archivo está vacío.");
      return;
    }

    // ✅ Verificar si el archivo contiene texto
    // (Puedes ajustar la expresión regular según tus necesidades)
    const hasText = /[a-zA-Z0-9]/.test(content);
    if (!hasText) {
      alert("⚠️ Error: El archivo no contiene cadenas de texto válidas.");
      return;
    }

    // ✅ Validar contenido sospechoso antes de procesar
    const isMalicious = /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(content) || /javascript:/i.test(content);
    if (isMalicious) {
      alert("⚠️ Error: El archivo contiene código sospechoso y ha sido bloqueado.");
      return;
    }

    // ✅ Eliminar caracteres sospechosos antes de procesar
    content = content.replace(/[<>]/g, "");

    // ✅ Generar hash SHA-256 del contenido
    const fileHash = await generateHash(content);

    // ✅ Bloquear archivos duplicados
    if (uploadedFiles.has(fileHash)) {
      alert("⚠️ Error: Este archivo ya ha sido cargado anteriormente.");
      return;
    }

    // Registrar archivo como subido
    uploadedFiles.add(fileHash);
    console.log(`📄 Archivo cargado | Hash: ${fileHash}`);

    // Llamar a la función `onFileUpload` proporcionada como prop
    onFileUpload(content);
  };

  reader.readAsText(file);
};

// Componente FileUpload
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
