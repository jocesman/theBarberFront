import axios from 'axios';
import Swal from 'sweetalert2';

const validarUsuario = async (values) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { phone, password } = values;
    const body = { 
      accessUserPhone: phone,
      accessUserPassword: password
    };
    
    try {
      const res = await axios.post(`${baseUrl}/login`, body);
      if (res.data) {
        // Si la autenticación es exitosa
        return true;
      } else {
        Swal.fire({
          title: "¡Acceso Denegado!",
          text: "Error al verificar el usuario - Revise sus Datos - Número de teléfono o Contraseña Incorrectas",
          icon: "error",
          confirmButtonText: "Intentar de nuevo"
        });
        return false;
      }
    } catch (err) {
      Swal.fire({
        title: "¡Alerta!",
        text: `Error al verificar el usuario - Revise su conexión a internet - ${err.response?.data?.message || err.message}`,
        icon: "error",
        confirmButtonText: "Intentar de nuevo"
      });
      return false;
    }
}

export default validarUsuario;