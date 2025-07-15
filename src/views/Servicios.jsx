import '../css/Servicios.css';
import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';


const Servicios = () => {

  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario && Object.keys(usuario).length <= 0) {
        navigate('/login');
    }
}, [usuario]);

  return (
    <>
    <div className="servicios-container">
        <img src="https://images.fresha.com/locations/location-profile-images/360262/2149835/f3be52df-dcff-4986-91e4-a637bcb63715-BlackHouseBarberCddelValle-MX-Nayarit-Tepic-Fresha.jpg?class=width-small" />
        <h1>Nuestros Servicios</h1>
        <h3>Precisión, Estilo y Cuidado Personal</h3>

        <p>En <i><b>The Barber</b></i>, nos esforzamos por ofrecer un servicio de alta calidad, diseñado para tus necesidades y preferencias. Nuestros servicios van más allá de un simple corte de cabello, ofrecemos afeitados con toalla caliente, perfilado de barba con técnicas de precisión, tratamientos capilares revitalizantes y asesoría personalizada para que luzcas impecable en todo momento. Trabajamos con productos de alta calidad, diseñados para el cuidado de tu piel y cabello, porque sabemos que un buen estilo comienza con un buen tratamiento.</p><br/>

        <h3>¿Qué ofrecemos? </h3>

        <p><b>Corte de Cabello: </b> Desde estilos clásicos hasta tendencias modernas, nuestros barberos te asesorarán para lograr el look perfecto, adaptado a tu personalidad y estilo de vida.</p><br/>

        <p><b>Afeitado Clásico con Toalla Caliente: </b> Un ritual de cuidado y relajación. Disfruta de un afeitado tradicional con toalla caliente, espuma rica y navaja de precisión para un acabado limpio y suave.</p><br/>

        <p><b>Perfilado y Arreglo de Barba: </b> Definimos tu barba con técnica y exactitud, logrando un look prolijo y elegante. Utilizamos productos premium para hidratar y nutrir tu piel.</p><br/>

        <p><b>Tratamientos Capilares Revitalizantes: </b> Cuida tu cuero cabelludo y piel con nuestros tratamientos revitalizantes. Desde hidratación profunda hasta exfoliaciones faciales, diseñados para un bienestar total.</p><br/>

        <p><b>Servicios Especiales para Eventos: </b>  Luce impecable en ocasiones especiales. Ofrecemos paquetes para bodas, reuniones corporativas y sesiones de estilo personalizadas.</p><br/>  

        <p>En <b>The Barber</b>, no solo transformamos tu imagen, sino que elevamos tu confianza. Ven y vive la experiencia de una barbería que combina tradición, innovación y el mejor servicio para ti.</p><br />
           
        <h3><i>¡Te esperamos!</i></h3>
    </div>
    </>
  )
}

export default Servicios;