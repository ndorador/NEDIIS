// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';

// Recibimos la cantidad de items en el carrito como un "prop" desde App.jsx
function Navbar({ cartItemCount = 0 }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo/Nombre de la Empresa */}
        <Link className="navbar-brand" to="/">
          Mi Empresa
        </Link>

        {/* Botón Hamburguesa para Móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menús de Navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/portafolio">
                Portafolio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>

          {/* Icono del Carrito a la Derecha */}
          <Link className="btn btn-outline-light" to="/carrito">
            <i className="bi bi-cart-fill me-1"></i> {/* Ícono del carrito */}
            Carrito
            <span className="badge bg-light text-dark ms-1 rounded-pill">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;