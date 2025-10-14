import express from 'express';
import cors from 'cors'; 
// Solo importamos lo necesario para este paso
import { testConnection } from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js'; 


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Llamamos a la función para probar la conexión al arrancar
testConnection();

// Usamos las rutas de órdenes
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes); 

// Dejamos una ruta de prueba simple
app.get('/', (req, res) => {
  res.send('El servidor está funcionando correctamente.');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});