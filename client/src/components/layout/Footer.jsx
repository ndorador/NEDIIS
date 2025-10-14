// CORRECTO: Primero defines la función, luego la exportas.
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Mi Empresa. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer; // Ahora sí, 'Footer' ya existe y puede ser exportado.