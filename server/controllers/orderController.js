import pool from '../config/db.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
  const { customer_name, customer_email, service_details } = req.body;

  if (!customer_name || !customer_email || !service_details) {
    return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
  }

  try {
    const sql = 'INSERT INTO orders (customer_name, customer_email, service_details) VALUES (?, ?, ?)';
    const [result] = await pool.query(sql, [customer_name, customer_email, service_details]);
    res.status(201).json({ message: 'Orden creada exitosamente.', orderId: result.insertId });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener todas las órdenes
export const getAllOrders = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}
// @desc    Actualizar el estado de una orden
// @route   PUT /api/orders/:id
// @access  Private (para el admin)
export const updateOrderStatus = async (req, res) => {
  // Obtenemos el ID de la orden de los parámetros de la URL
  const { id } = req.params;
  // Obtenemos el nuevo estado del cuerpo de la petición
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'El nuevo estado es requerido.' });
  }

  try {
    const sql = 'UPDATE orders SET status = ? WHERE id = ?';
    const [result] = await pool.query(sql, [status, id]);

    // `affectedRows` nos dice si se actualizó alguna fila. Si es 0, la orden no se encontró.
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }

    res.json({ message: 'Estado de la orden actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// @desc    Eliminar una orden
// @route   DELETE /api/orders/:id
// @access  Private (para el admin)
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM orders WHERE id = ?';
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }

    res.json({ message: 'Orden eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};