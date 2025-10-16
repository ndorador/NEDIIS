// client/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ImageSlider from './components/layout/ImageSlider';
import Footer from './components/layout/Footer';
// ...

function App() {
  return (
    <BrowserRouter> {/* <-- El Router ENVUELVE TODO */}
      <Navbar /> {/* Ahora Navbar está DENTRO y tiene acceso al contexto del router */}
      <main>
        <ImageSlider />
        <Routes>
          {/* Aquí irían tus rutas, por ejemplo: */}
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;