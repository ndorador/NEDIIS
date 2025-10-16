// client/src/components/layout/ImageSlider.jsx

import React from 'react';
import './ImageSlider.css'; // Importaremos estilos personalizados en el siguiente paso

// Importa las imágenes que usarás en el carrusel
import slide1 from '../../assets/images/slider-1.jpg';
import slide2 from '../../assets/images/slider-2.jpg';
import slide3 from '../../assets/images/slider-3.jpg';


const ImageSlider = () => {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores (los puntos de abajo) */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Contenido del carrusel (las imágenes) */}
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active">
          <img src={slide1} className="d-block w-100" alt="Servicio de desarrollo web" />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="display-4 fw-bold">Transforma Tu Visión Digital</h1>
            <p className="lead">Creamos experiencias web impactantes y a medida.</p>
          </div>
        </div>
        {/* Slide 2 */}
        <div className="carousel-item">
          <img src={slide2} className="d-block w-100" alt="Diseño de software a medida" />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="display-4 fw-bold">Soluciones de Software Innovadoras</h1>
            <p className="lead">Impulsamos tu negocio con tecnología de vanguardia.</p>
          </div>
        </div>
        {/* Slide 3 */}
        <div className="carousel-item">
          <img src={slide3} className="d-block w-100" alt="Consultoría tecnológica" />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="display-4 fw-bold">Tu Socio Tecnológico Ideal</h1>
            <p className="lead">Te guiamos en cada paso de la transformación digital.</p>
          </div>
        </div>
      </div>

      {/* Controles (flechas de anterior/siguiente) */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageSlider;