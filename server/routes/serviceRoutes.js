import express from 'express';
import {
    getAllServices,
    getServiceById, // <-- 1. Importa la nueva función
    createService,
    updateService,
    deleteService
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Rutas Públicas ---
// Para que los clientes vean los servicios
router.get('/', getAllServices);
router.get('/:id', getServiceById); // <-- 2. Añade la nueva ruta para obtener un solo servicio

// --- Rutas Protegidas ---
// Para que solo el administrador pueda gestionar los servicios
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;