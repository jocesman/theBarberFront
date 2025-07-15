import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';


const Home = () => {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
          if (usuario && Object.keys(usuario).length <= 0) {
              navigate('/login');
          }
      }, [usuario]);
  return (
        <>
        <div className="welcome-section">
            {/* <img src="https://images.vexels.com/content/78166/preview/the-barber-logo-7fb895.png"/> */}
            <h1>Bienvenido a The Barber</h1>

            <h2>Donde el Estilo se Encuentra con la Precisión</h2>
            <p>En The Barber, cada corte es una obra de arte y cada cliente es un lienzo en blanco listo para ser transformado. No somos solo una barbería; somos un espacio donde la tradición y la modernidad se fusionan para crear estilos que reflejan tu personalidad. Desde cortes clásicos hasta tendencias vanguardistas, aquí encontrarás un equipo de barberos apasionados, listos para ofrecerte la mejor versión de ti mismo.</p><br/>

            <p>Nuestros servicios van más allá de un simple corte de cabello. En The Barber, ofrecemos afeitados con toalla caliente, perfilado de barba con técnicas de precisión, tratamientos capilares revitalizantes y asesoría personalizada para que luzcas impecable en todo momento. Trabajamos con productos de alta calidad, diseñados para el cuidado de tu piel y cabello, porque sabemos que un buen estilo comienza con un buen tratamiento.</p><br/>

            <p>Cuando cruzas la puerta de The Barber, entras en un ambiente que combina elegancia, comodidad y un toque de exclusividad. Relájate en nuestros sillones de cuero, disfruta de una bebida mientras nuestros expertos trabajan en tu imagen, y sal con la confianza de quien sabe que lleva el mejor look. No se trata solo de un corte, se trata de una experiencia. ¡Bienvenido a The Barber!</p><br/>
      </div>
    </>
  )
}

export default Home;