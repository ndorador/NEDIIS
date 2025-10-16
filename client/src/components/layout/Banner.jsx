import React from 'react';
import './Banner.css'; // Importa los estilos para este componente

const Banner = () => {
  return (
    <section className="banner-section d-flex align-items-center justify-content-center text-white text-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 mx-auto">
            <h1 className="display-4 fw-bold mb-3">
              Transforma Tu Visión Digital
            </h1>
            <p className="lead mb-4">
              Creamos experiencias web impactantes y soluciones a medida que impulsan tu negocio.
            </p>
            <button className="btn btn-primary btn-lg mt-3">
              Descubre Nuestros Servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;