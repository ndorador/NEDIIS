import express from 'express';
// Importamos la función para probar la conexión desde nuestro nuevo archivo
import { testConnection } from './config/db.js';

const app = express();
const PORT = 5000;

// Llamamos a la función para probar la conexión
testConnection();

app.get('/api/test', (req, res) => {
  res.json({ message: '¡Hola desde el servidor!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});