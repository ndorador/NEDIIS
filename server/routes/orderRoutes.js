// server/routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // <-- 1. Importa al guardia

const router = express.Router();

// --- Ruta Pública ---
// Cualquiera puede crear una orden
router.post('/', createOrder);

// --- Rutas Protegidas ---
// Solo un admin con token válido puede acceder a estas
router.get('/', protect, getAllOrders);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

export default router;