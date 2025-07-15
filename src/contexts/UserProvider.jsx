import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const organizarAppointments = (turnos) => {
        const activos = turnos
            .filter(turno => turno.appointmentStatus === 'active')
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    
        const cancelados = turnos
            .filter(turno => turno.appointmentStatus === 'cancelled')
            .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    
        return [...activos, ...cancelados];
    };

    const getUser = async (phone) => {
        try {
            const res = await axios.get(`${baseUrl}/users/${phone}`);
            const usuarioConTurnosOrganizados = {
                ...res.data,
                appointments: organizarAppointments(res.data.appointments)
            };
            setUsuario(usuarioConTurnosOrganizados);
        } catch (err) {
            console.error(err);
        }
    };
    
    const createAppointment = async (phone, fecha, hora) => {
        try {
            const appointment = {
                appointmentUserPhone: phone,
                appointmentDate: `${fecha}T12:00:00`,
                appointmentTime: new Date(`${fecha} ${hora}`),
                appointmentStatus: 'active'
            };
    
            const res = await axios.post(`${baseUrl}/turns/${phone}`, appointment);
    
            // Actualizar estado de usuario correctamente
            setUsuario(prevUsuario => ({
                ...prevUsuario,
                appointments: [...(prevUsuario.appointments || []), res.data] // Evita errores si appointments es undefined
            }));
    
            // Mostrar alerta de confirmación
            Swal.fire({
                title: "Turno agendado",
                text: `Tu turno ha sido agendado para el ${fecha} a las ${hora} y se ha creado.`,
                icon: "success",
                confirmButtonText: "OK" 
            });
    
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al agendar el turno.",
                    icon: "error",
                    confirmButtonText: "Cerrar"
                });
            }
    };

    // Cargar usuario desde localStorage si existe
    const [usuario, setUsuario] = useState(() => {
        const storedUser = localStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : {}; // Asegurar que sea un objeto
    });

    const navigate = useNavigate();

    // Guardar usuario en localStorage cuando cambia
    useEffect(() => {
        if (usuario && Object.keys(usuario).length > 0) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } else {
            localStorage.removeItem("usuario");
        }
    }, [usuario]);
    
    const modifyAppointment = async (id) => {
        const turno = usuario.appointments.find(t => t.appointment === id);
            if (!turno) {
                Swal.fire({
                    title: "Error",
                    text: "No se encontró el turno.",
                    icon: "error",
                    confirmButtonText: "Cerrar"
                });
                return;
            }
        
        const futureDate = new Date(turno.appointmentTime); // Fecha futura
        const now = new Date(); // Fecha actual
    
        const diffInMilliseconds = futureDate - now; // Diferencia en milisegundos
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convertir a horas
    
        // Verificar si ya pasó la hora límite para cancelar la cita
        if (diffInHours < 24) {
            Swal.fire({
                title: "Cancelación no permitida",
                html: `No puedes cancelar el turno: <strong>${turno.appointment}</strong><br> porque ya pasó la hora límite para cancelar la cita.<br><br>Solo puedes cancelar un turno hasta 24 horas antes de la cita.`,
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
    
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción cancelará tu turno y no se podrá revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, mantener",
             confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${baseUrl}/turns/${id}`);
    
                    // Actualizar estado de usuario correctamente
                    setUsuario(prevUsuario => ({
                        ...prevUsuario,
                        appointments: prevUsuario.appointments.map(turno =>
                        turno.appointment === id
                        ? { ...turno, appointmentStatus: "cancelled" }
                        : turno
                        )
                    }));
    
                    // Mostrar confirmación de cancelación
                    Swal.fire({
                        title: "Turno cancelado",
                        html: 'Tu turno ha sido cancelado exitosamente <br><br>Confirmación de este turno CANCELADO en su email<br><br>(<i>Si no ha recibido el email, compruebe su carpeta de spam o filtros de correo)</i>',
                        icon: "success",
                        confirmButtonText: "OK"
                    });
    
                    } catch (err) {
                        console.error(err);
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al cancelar el turno.",
                            icon: "error",
                            confirmButtonText: "Cerrar"
                        });
                    }
                }
            });
        };
   
    // Cerrar sesión
    const logout = () => {
        setUsuario({});
        localStorage.removeItem("usuario");
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ 
            usuario, 
            setUsuario, 
            getUser,
            createAppointment,
            modifyAppointment,
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
