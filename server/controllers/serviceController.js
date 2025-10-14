import pool from '../config/db.js';

// @desc    Obtener todos los servicios
// @route   GET /api/services
// @access  Public
export const getAllServices = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM servicios');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// --- FUNCIÓN AÑADIDA ---
// @desc    Obtener un solo servicio por su ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener el servicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// @desc    Crear un nuevo servicio
// @route   POST /api/services
// @access  Private (Admin)
export const createService = async (req, res) => {
    const { nombre, descripcion, price, image } = req.body;
    if (!nombre || !descripcion || !price) {
        return res.status(400).json({ message: 'Nombre, descripción y precio son requeridos.' });
    }
    try {
        const sql = 'INSERT INTO servicios (nombre, descripcion, price, image) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(sql, [nombre, descripcion, price, image]);
        res.status(201).json({ message: 'Servicio creado exitosamente.', serviceId: result.insertId });
    } catch (error) {
        console.error('Error al crear el servicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// @desc    Actualizar un servicio
// @route   PUT /api/services/:id
// @access  Private (Admin)
export const updateService = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, price, image } = req.body;
    if (!nombre || !descripcion || !price) {
        return res.status(400).json({ message: 'Nombre, descripción y precio son requeridos.' });
    }
    try {
        const sql = 'UPDATE servicios SET nombre = ?, descripcion = ?, price = ?, image = ? WHERE id = ?';
        const [result] = await pool.query(sql, [nombre, descripcion, price, image, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }
        res.json({ message: 'Servicio actualizado exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar el servicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// @desc    Eliminar un servicio
// @route   DELETE /api/services/:id
// @access  Private (Admin)
export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM servicios WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }
        res.json({ message: 'Servicio eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};