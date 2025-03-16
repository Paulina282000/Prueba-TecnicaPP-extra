import React from "react";

const TopWords = ({ topWords }) => {
  return (
    <div className="top-words">
      <h2>🔝 Palabras más usadas</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Palabra</th>
            <th>Veces</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {topWords.map(({ word, count, percentage }) => (
            <tr key={word}>
              <td>{word}</td>
              <td>{count}</td>
              <td>{percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopWords;
