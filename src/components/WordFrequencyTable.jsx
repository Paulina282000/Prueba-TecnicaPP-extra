import React from "react";

const WordFrequencyTable = ({ wordFrequencies }) => {
  return (
    <div className="table-container">
      <table className="word-table">
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
    </div>
  );
};

export default WordFrequencyTable;
