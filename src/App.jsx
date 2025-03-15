import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import WordFrequencyTable from "./components/WordFrequencyTable";
import processText from "./utils/processText";

const App = () => {
  const [wordFrequencies, setWordFrequencies] = useState([]);

  const handleFileUpload = (content) => {
    const frequencies = processText(content);
    setWordFrequencies(frequencies);
  };

  return (
    <div className="app-container">
      <h1>📖 Análisis de Frecuencia de Palabras</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {wordFrequencies.length > 0 && <WordFrequencyTable wordFrequencies={wordFrequencies} />}
    </div>
  );
};

export default App;

