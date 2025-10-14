import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatChileanPeso } from '../utils/formatters.js';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <div className="container mt-5"><p>Cargando servicios...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p>Error: {error}</p></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nuestros Servicios</h2>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              
              {/* --- IMAGEN AÑADIDA AQUÍ --- */}
              {/* Se usa directamente la ruta guardada en la base de datos (ej: /images/servicio.jpg) */}
              <img src={service.image} className="card-img-top" alt={service.nombre} />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{service.nombre}</h5>
                <p className="card-text">{service.descripcion.substring(0, 100)}...</p>
                <p className="card-text"><strong>{formatChileanPeso(service.price)}</strong></p>
                
                <Link to={`/servicios/${service.id}`} className="btn btn-outline-primary mt-auto">
                  Ver Detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;