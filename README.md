<<<<<<< HEAD
# Prueba-TecnicaPP-extra#

Análisis de Frecuencia de Palabras


**TASK**
- leer un archivo en formato txt proporcionado por el usuario
- procesar el contenido del archivo para limpiar caracteres especiales
- contar la frecuencia de cada palabra ignorando mayusculas/minusculas y signos de puntuacion
- mostrar las 10 palabras mas frecuentes en una tabla.
  
**Caracteristicas extras**
- recuandor con las 3 palabras principales con la frecuencia y porcentaje.
- validar el tamaño del archivo (maximo 2MB) y evitar cargas duplicadas utilizando un hash SHA-256 del contenido.
- verifica que el archivo contenga texto valido y no este vacio.
- bloquea archivos qeu superen 2MB o contengan contenido malicioso
- elimina caracteres no deseados como =,<,> entre otros
- Utiliza un hash SHA-256 para detectar y permitir reanalizar signos de puntuacion y etiquedas
      
**Tecnologias Utilizadas**


-Vite + React:
Para la creación y construcción de la interfaz de usuario de forma rápida y moderna.
-JavaScript:
Lenguaje principal para la lógica del programa.
-HTML y CSS:
Para la estructura y el diseño de la aplicación.
-Web Crypto API:
Se utiliza para generar un hash SHA-256 y detectar archivos duplicados.

**Medidas de seguridad**


- validacion de archivos: se verifica que el archivo sea de tipo .txt y que no supere los 2MB
- sanitizacion del contenido> se limpia el contenido del archivo para eliminar etiquetas HTML, scripts y caracteres especiales.

