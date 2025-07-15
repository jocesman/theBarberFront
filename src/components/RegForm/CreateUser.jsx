import Swal from 'sweetalert2';
import verificarUser from './VerificarUsuario';
import axios from 'axios';

const createUser = async (values, navigate) => {
  const createUserBody = {
    userPhone: values.phone, 
    userName: values.name,
    userLastName: values.lastname,
    userId: values.id,
    userBirthDate: values.birthDate,
    userEmail:  values.email,
    userAddress: values.address,
    userCity: values.city,
    userDateCreated: new Date(),
    userStatus: "Active",
    userTypeUser: "user",
    userPassword: values.password
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (await verificarUser(values.phone, values.email)) {
    Swal.fire({
      title: "¡Alerta!",
      text: `El número de teléfono ${values.phone} o el correo electrónico ${values.email} ya existe.`,
      icon: "error",
      confirmButtonText: "Intentar de nuevo"
    });
  } else {
    try {
      await axios.post(`${baseUrl}/users`, createUserBody);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado',
        html: `El usuario ${values.name} ${values.lastname} ha sido creado exitosamente<br><br>
              Hemos enviado un mensaje de Bienvenida y de confirmación al correo electrónico: <strong>${values.email}</strong><br>
              (Si no aparece en su bandeja de entrada, revise su carpeta de spam)`,
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate("/"); // Si el usuario es creado, se redirige al login
      });
    } catch (err) {
      Swal.fire({
        title: "¡Alerta!",
        text: `El usuario no pudo ser creado: ${err.message}`,
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  }
};

export default createUser;