// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  // Obtener el token del encabezado 'authorization'
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Extraer el token (formato: "Bearer TOKEN")
      const token = authHeader.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, 'mi_secreto_super_secreto'); // Usa la misma llave secreta

      // Añadir los datos del usuario a la petición para usarlo después
      req.user = decoded.user;
      next(); // El token es válido, continuar a la siguiente función (el controlador)
    } catch (error) {
      res.status(401).json({ message: 'Token no válido.' });
    }
  } else {
    res.status(401).json({ message: 'No autorizado, no hay token.' });
  }
};