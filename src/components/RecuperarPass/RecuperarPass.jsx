import '../../css/RecuperarPass.css';
import TheBarber from "../../Images/TheBarber.png"
import { useFormik } from 'formik';
import axios from 'axios';
import Schema from './Schema'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';

const RecuperarPass = () => {
  const [desactivarButton, setDesactivarButton] = useState(false);
  const navigate = useNavigate();

  const validarUsuario = async (values) => {
    setDesactivarButton(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { phone } = values;
    try {
      const res = await axios.get(`${baseUrl}/recuperarAcceso/${phone}`);
      if (res.data) {
        
        const { userEmail }= res.data;
        await axios.post(`${baseUrl}/resetPassword`, { userEmail });
        Swal.fire({
          title: "¡Datos Recuperados!",
          text: `Los datos para recuperar su acceso, fueron enviados al correo electrónico: ${userEmail}`,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
        navigate('/');
      }
    } catch (err) {
      setDesactivarButton(false);
      Swal.fire({
        title: "¡Alerta!",
        text: `Sus datos de recuperación de acceso no fueron encontrados: ${err.message}`,
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      });
    }
  }

  const {handleSubmit, handleChange, errors, values} = useFormik({
    initialValues: {
        phone: '',
    },
    onSubmit: validarUsuario,
    validationSchema: Schema
});


  return (
    <div className="container">
      <div className="modal">
        <div className="containerLogo">
          <img src={TheBarber} alt="Logo The Barber" />
        </div>
        <div className="authWrapper">
          <div className="containerRecuperarPass">
            <h3 className='titleRecuperarContrasena'>Recuperar contraseña</h3>
            <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Ingrese su número de teléfono" 
                  value={values.phone}
                  onChange={handleChange}
                  name="phone"
                />
                {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
                <button 
                className='button'
                type="submit"
                disabled={desactivarButton}
                >Recuperar</button>
                <button 
                className='button' 
                type="button" 
                disabled={desactivarButton}
                onClick = {() => navigate('/')}> 
                Cancelar</button>
                </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPass;


