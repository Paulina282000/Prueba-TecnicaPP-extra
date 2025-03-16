import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import WordFrequencyTable from "./components/WordFrequencyTable";
import TopWords from "./components/TopWords"; // Importar el nuevo componente
import processText from "./utils/processText";
import "./styles.css"; 

const App = () => {
  const [wordFrequencies, setWordFrequencies] = useState([]);

  const isMaliciousContent = (content) => {
    return /<script>|<\/script>|javascript:/i.test(content);
  };

  const generateHash = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleFileUpload = async (content) => {
    if (isMaliciousContent(content)) {
      alert("⚠️ Error: El archivo contiene código sospechoso.");
      console.warn("Archivo bloqueado por posible inyección de código.");
      return;
    }

    const fileHash = await generateHash(content);
    console.log(`📄 Archivo cargado (${new Date().toLocaleString()}) | Hash: ${fileHash}`);

    const frequencies = processText(content);
    setWordFrequencies(frequencies);
  };

  const handleClearScreen = () => {
    setWordFrequencies([]); 
  };

  const totalWords = wordFrequencies.reduce((sum, [, count]) => sum + count, 0);
  const topWords = wordFrequencies.slice(0, 3).map(([word, count]) => ({
    word,
    count,
    percentage: ((count / totalWords) * 100).toFixed(1),
  }));

  return (
    <div className="container">
      <h1 className="title">📖  Análisis de Frecuencia de Palabras  📖</h1>

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
