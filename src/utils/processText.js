const processText = (text) => {
  if (!text || typeof text !== "string") return [];

  // Evita caracteres maliciosos y eliminar HTML/Scripts
  const cleanedText = text
    .toLowerCase()
    .replace(/[¿¡!?,.()"':;<>=]/g, "") // elimina los caracteres que especiales
    .replace(/<\/?[^>]+(>|$)/g, ""); // eliminacualquier intento de HTML/Scripts

  // Separar palabras
  const words = cleanedText.split(/\s+/).filter(word => word.trim() !== "");

  // Contar frecuencia
  const wordFrequency = new Map();
  words.forEach((word) => {
    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
  });

  // Devolver top 10 palabras más frecuentes
  return [...wordFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
};

export default processText;
