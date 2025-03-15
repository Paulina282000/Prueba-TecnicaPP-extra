const processText = (text) => {
  if (!text || typeof text !== "string") return [];

  // Convertir a minúsculas y eliminar signos de puntuación al inicio y final de cada palabra
  const words = text
    .toLowerCase()
    .replace(/[¿¡?"'.,;:()!¡]/g, "") // ✅ Elimina símbolos como ¿, ¡, ., ", etc.
    .split(/\s+/) // ✅ Divide en palabras ignorando múltiples espacios
    .filter(word => word.trim() !== ""); // ✅ Elimina palabras vacías

  // Contar frecuencia de palabras usando Map para mayor eficiencia
  const wordFrequency = new Map();
  words.forEach((word) => {
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  });

  // Ordenar palabras por frecuencia y seleccionar las 10 más usadas
  return [...wordFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
};

export default processText;
