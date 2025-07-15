import "../css/CajaAppointments.css";
import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

const CajaAppointments = ({turno}) => {

    const { modifyAppointment } = useContext(UserContext);

    const {appointment,
        appointmentDate,
        appointmentTime,
        appointmentStatus} = turno;

    const formattedDate = new Date(appointmentDate).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedTime = new Date(appointmentTime).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Activa el formato de 12 horas
    });

    const statusClass = appointmentStatus === 'active' ? 'active-status' : 'cancelled-status';
    const cardClass = appointmentStatus === 'active' ? 'active-card' : 'cancelled-card';
        
    return (
        <div className={`card ${cardClass}`}>
                <div className='header'>
                    <h3>Turno: {appointment}</h3>
                </div>
                <div className='body'>
                    <h5 className={statusClass}>Estado: {appointmentStatus.toUpperCase()}</h5>
                </div>
                <div className='body'>
                    <p>Fecha: {formattedDate}</p>
                    <p>Hora: {formattedTime}</p>
                </div>
                <div className="cancelButton">
                    <button 
                    className='cancelar'
                    disabled={appointmentStatus === 'cancelled'}
                    onClick={() => { 
                        modifyAppointment(appointment)
                    }}
                    >Cancelar</button>
                </div>
            </div>
            
    );
}

export default CajaAppointments;
