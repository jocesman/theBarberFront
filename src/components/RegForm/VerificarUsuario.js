import axios from 'axios';
import Swal from 'sweetalert2';

const verificarUser = async (phone, email) =>{
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const usuarios = await axios.get(`${baseUrl}/users`);
      const existePhone = usuarios.data.find(usuario => usuario.userPhone === phone);
      const existeEmail = usuarios.data.find(usuario => usuario.userEmail === email);
      if (existePhone || existeEmail)  return true;
      else  return false;
    } catch (error) {
          Swal.fire({
            title: "¡Alerta!",
            text: "Error al verificar el usuario",
            icon: "error",
            confirmButtonText: "Intentar de nuevo"
          })
          return false;
    }
  }

  export default verificarUser;