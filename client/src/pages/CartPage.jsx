// src/pages/CartPage.jsx

// 1. --- IMPORTACIONES ---
// Se importa el componente 'Link' de la librería 'react-router-dom'.
// 'Link' se usa para crear enlaces de navegación que no recargan la página,
// haciendo que la aplicación se sienta más rápida y fluida.
import { Link } from 'react-router-dom';
import { formatChileanPeso } from '../utils/formatters.js';

// 2. --- DEFINICIÓN DEL COMPONENTE ---
// Se define el componente 'CartPage'.
// Recibe tres "props" (propiedades) desde App.jsx:
// - 'cart': El array con los productos que el usuario ha añadido.
// - 'removeFromCart': La función para eliminar un producto del carrito.
// - 'finalizePurchase': La función que se ejecuta al finalizar la compra.
function CartPage({ cart, removeFromCart, finalizePurchase }) {

  // 3. --- CÁLCULO DEL TOTAL ---
  // Se usa el método 'reduce' para calcular el costo total del carrito.
  // Itera sobre cada 'item' en el array 'cart', multiplica su precio por su cantidad,
  // y lo suma a un acumulador ('sum') que empieza en 0.
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 4. --- RENDERIZADO DEL COMPONENTE (JSX) ---
  // Esto es lo que se mostrará en la pantalla.
  return (
    <div className="container mt-5">
      <h2>🛒 Tu Carrito de Compras</h2>

      {/* 5. RENDERIZADO CONDICIONAL: ¿EL CARRITO ESTÁ VACÍO? */}
      {/* Se usa un operador ternario (condición ? si_verdadero : si_falso) */}
      {cart.length === 0 ? (
        // Si el carrito está vacío, muestra este mensaje.
        <div className="alert alert-info mt-4" role="alert">
          Tu carrito está vacío. ¡Añade algunos servicios para comenzar!
        </div>
      ) : (
        // Si el carrito TIENE productos, muestra esta sección.
        <div className="mt-4">
          
          {/* 6. LISTADO DE PRODUCTOS EN EL CARRITO */}
          {/* Se usa el método 'map' para crear un bloque de HTML por cada 'item' en el carrito. */}
          {cart.map(item => (
            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm">
              <div>
                <h5>{item.nombre}</h5>
                <p className="mb-0">Cantidad: {item.quantity} x {formatChileanPeso(item.price)}</p>
              </div>
              <div className="d-flex align-items-center">
                <strong className="me-4">{formatChileanPeso(item.price * item.quantity)}</strong>
                {/* Botón para eliminar un item, llama a la función 'removeFromCart' */}
                <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          
          <hr />

          {/* 7. SECCIÓN DE TOTAL Y ACCIONES */}
          <div className="text-end">
            <h3>Total: {formatChileanPeso(total)}</h3>
            
            {/* Botón para volver a la lista de servicios */}
            <Link to="/servicios" className="btn btn-secondary mt-2 btn-lg me-2">
              Seguir Comprando
            </Link>

            {/* Botón para finalizar la compra, llama a la función 'finalizePurchase' */}
            <button className="btn btn-success mt-2 btn-lg" onClick={finalizePurchase}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 8. --- EXPORTACIÓN DEL COMPONENTE ---
// Se exporta el componente 'CartPage' como el valor por defecto del archivo,
// permitiendo que otros archivos (como App.jsx) puedan importarlo y usarlo.
export default CartPage;