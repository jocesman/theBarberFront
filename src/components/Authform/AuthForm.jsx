import '../../css/AuthForm.css';
import TheBarber from "../../Images/TheBarber.png"
import Schema from './Schema'
import { useFormik } from 'formik';
import validarUsuario  from './ValidarUsuario';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserProvider';

const AuthForm = () => {

  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  const {handleSubmit, handleChange, errors, values} = useFormik({
    initialValues: {
        phone: '',
        password: ''
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      const isValid = await validarUsuario(values);
      if (isValid) {
        //Aqui voy a llenar el contexto
        await getUser(values.phone)
        navigate('/turnos');
      }
    }
  });

  return (
    <div className="container">
      <div className="modal">
        <div className="containerLogo">
          <img src={TheBarber} alt="Logo The Barber" />
        </div>
        <div className="authWrapper">
          <div>
            <h3 className='titleIniciarSesion'>Iniciar Sesión</h3>
            <form onSubmit={handleSubmit} className="reg-form">
              <input 
              type="text" 
              placeholder="Ingrese número de teléfono registrado"
              value={values.phone}
              onChange={handleChange}
              name="phone"
              />
              {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
              <input 
              type="password" 
              placeholder="Ingrese su contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              />
              {errors.password && <p className='errorMessage'>{errors.password}</p>}
              <button type="submit" className='button'>Iniciar Sesión</button>
            </form>
            <div className="linksQueHacer">
              <label><Link to="/RecuperarContrasena" className='link'>Recuperar contraseña</Link></label>
              <label><Link to="/CrearCuenta" className='link'>Crear cuenta nueva</Link></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

