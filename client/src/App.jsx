// --- 1. IMPORTACIONES ---
// Se importan las herramientas necesarias de React y otras librerías.
import { useState } from 'react'; // Hook para manejar el estado de los componentes.
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Componentes para manejar la navegación entre páginas.
import Swal from 'sweetalert2'; // Librería para mostrar alertas modernas y atractivas.

// Se importan los componentes de la interfaz (Layout) y las diferentes páginas.
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

// --- 2. COMPONENTE PRINCIPAL 'App' ---
// Este es el componente central que organiza toda la aplicación.
function App() {
  
  // --- 3. MANEJO DEL ESTADO ---
  // Se crea una variable de estado 'cart' para guardar los productos del carrito.
  // 'setCart' es la única función que se debe usar para modificar 'cart'.
  // Comienza como un array vacío.
  const [cart, setCart] = useState([]);
  
  // Hook de React Router que permite cambiar de página desde una función.
  const navigate = useNavigate();

  // --- 4. LÓGICA DE NEGOCIO (FUNCIONES) ---

  // Función para añadir un producto al carrito.
  const addToCart = (productToAdd) => {
    const productInCart = cart.find(p => p.id === productToAdd.id);

    if (productInCart) {
      // Si el producto ya existe, se incrementa su cantidad.
      setCart(cart.map(p =>
        p.id === productToAdd.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      // Si es un producto nuevo, se añade al carrito con cantidad 1.
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }
    
    // Alerta interactiva que se muestra después de añadir un producto.
    Swal.fire({
      title: '¡Añadido!',
      text: `${productToAdd.nombre} fue añadido a tu carrito.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ir al Carrito',
      cancelButtonText: 'Seguir Comprando',
    }).then((result) => { // Lógica que se ejecuta después de que el usuario interactúa con la alerta.
      if (result.isConfirmed) {
        navigate('/carrito'); // Si presiona 'Ir al Carrito', se navega a esa página.
      } else if (result.isDismissed) {
        navigate('/servicios'); // Si presiona 'Seguir Comprando', se navega a la lista de servicios.
      }
    });
  };

  // Función para eliminar un producto del carrito.
  const removeFromCart = (productId) => {
    setCart(cart.filter(p => p.id !== productId));
  };

  // Función para finalizar la compra y enviar los datos al back-end.
  const finalizePurchase = async () => {
    if (cart.length === 0) return; // No hace nada si el carrito está vacío.

    // Se construye el objeto con los detalles de la orden.
    const orderDetails = {
      customer_name: "Cliente de la Web",
      customer_email: "cliente@email.com",
      service_details: cart.map(item => `${item.nombre} (x${item.quantity})`).join(', ')
    };

    // Se envía la petición POST al back-end.
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) throw new Error('No se pudo crear la orden.');

      await response.json();
      Swal.fire('¡Solicitud Enviada!', 'Gracias por tu confianza.', 'success');
      setCart([]); // Se limpia el carrito.
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al enviar tu solicitud.', 'error');
    }
  };

  // --- 5. RENDERIZADO DEL COMPONENTE (LO QUE SE VE EN PANTALLA) ---
  return (
    // Contenedor principal para un layout de página completa (footer siempre abajo).
    <div className="d-flex flex-column min-vh-100">
      
      {/* Componente de la barra de navegación. Se le pasa la cantidad de items del carrito. */}
      <Navbar cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      
      {/* Contenedor principal del contenido de la página. */}
      <main className="flex-grow-1 my-4">
        {/* Sistema de Rutas: define qué componente mostrar según la URL. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage addToCart={addToCart} />} />
          <Route path="/servicios/:id" element={<ServiceDetailPage addToCart={addToCart} />} />
          <Route path="/carrito" element={<CartPage cart={cart} removeFromCart={removeFromCart} finalizePurchase={finalizePurchase} />} />
        </Routes>
      </main>
      
      {/* Componente del pie de página. */}
      <Footer />
    </div>
  );
}

// --- 6. COMPONENTE CONTENEDOR PARA EL ROUTER ---
// Para que 'useNavigate' funcione en el componente 'App', este debe estar "envuelto" por el 'Router'.
// Este componente se encarga de esa tarea.
function AppContainer() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// --- 7. EXPORTACIÓN ---
// Se exporta el 'AppContainer' para que pueda ser renderizado por 'main.jsx'.
export default AppContainer;