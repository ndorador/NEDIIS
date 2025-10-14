// src/utils/formatters.js

/**
 * Formatea un número como Peso Chileno (CLP).
 * @param {number} number El número a formatear.
 * @returns {string} El número formateado como CLP (ej: $1.500).
 */
export function formatChileanPeso(number) {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });
  return formatter.format(number);
}