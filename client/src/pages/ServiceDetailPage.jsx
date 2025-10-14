// src/pages/ServiceDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatChileanPeso } from '../utils/formatters.js';

function ServiceDetailPage({ addToCart }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Hook para leer el ':id' de la URL

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/services/${id}`);
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <p>Cargando detalle del servicio...</p>;
  if (!service) return <p>Servicio no encontrado.</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={service.image || 'https://via.placeholder.com/600x400'} className="img-fluid rounded" alt={service.nombre} />
        </div>
        <div className="col-md-6">
          <h2>{service.nombre}</h2>
          <ReactMarkdown>{service.descripcion}</ReactMarkdown>
          <h3 className="my-3">{formatChileanPeso(service.price)}</h3>
          <button className="btn btn-primary btn-lg" onClick={() => addToCart(service)}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailPage;