import React, { useState } from "react";
import FileUpload, { clearUploadedFiles } from "./components/FileUpload";
import WordFrequencyTable from "./components/WordFrequencyTable";
import TopWords from "./components/TopWords";
import processText from "./utils/processText";
import "./styles.css"; 

const App = () => {
  const [wordFrequencies, setWordFrequencies] = useState([]);

  //  verifica si el contenido tiene scripts maliciosos
  const isMaliciousContent = (content) => {
    return /<script>|<\/script>|javascript:/i.test(content);
  };

  // manejar subida de archivos con validaciones de seguridad
  const handleFileUpload = async (content) => {
    if (isMaliciousContent(content)) {
      alert("⚠️ Error: El archivo contiene código sospechoso.");
      console.warn("Archivo bloqueado por posible inyección de código.");
      return;
    }

    // contenido limpio
    const frequencies = processText(content);
    setWordFrequencies(frequencies);
  };

  // limpiar la pantalla y permitir volver a subir el mismo archivo
  const handleClearScreen = () => {
    setWordFrequencies([]); 
    clearUploadedFiles(); 
  };

  // Obtener las 3 palabras más frecuentes para el recuadro lateral + extra ver si no lo saco
  const totalWords = wordFrequencies.reduce((sum, [, count]) => sum + count, 0);
  const topWords = wordFrequencies.slice(0, 3).map(([word, count]) => ({
    word,
    count,
    percentage: ((count / totalWords) * 100).toFixed(1),
  }));

  return (
    <div className="container">
      <h1 className="title">📖 Análisis de Frecuencia de Palabras 📖</h1>

      <div className="content">
       
        <div className="table-section">
          <FileUpload onFileUpload={handleFileUpload} />

          {wordFrequencies.length > 0 && (
            <>
              <button onClick={handleClearScreen} className="clear-button">
                Limpiar pantalla
              </button>
              <WordFrequencyTable wordFrequencies={wordFrequencies} />
            </>
          )}
        </div>

        
        {wordFrequencies.length > 0 && <TopWords topWords={topWords} />} 
      </div>
    </div>
  );
};

export default App;
