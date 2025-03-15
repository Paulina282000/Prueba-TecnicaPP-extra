import React from "react";

const WordFrequencyTable = ({ wordFrequencies }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Palabra</th>
          <th>Frecuencia</th>
        </tr>
      </thead>
      <tbody>
        {wordFrequencies.map(([word, count], index) => (
          <tr key={index}>
            <td>{word}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WordFrequencyTable;
