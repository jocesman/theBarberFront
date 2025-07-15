import CajaAppointments from '../components/CajaAppointments.jsx';
import '../css/Appointments.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserProvider';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const { usuario, createAppointment } = useContext(UserContext);
  const navigate = useNavigate();
  const userTurnos = usuario.appointments;

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarBotonCrear, setMostrarBotonCrear] = useState(true);
  const [fecha, setFecha] = useState(null); // Inicializa con null
  const [hora, setHora] = useState('');

  const toggleFormulario = () => {
    setMostrarBotonCrear(!mostrarBotonCrear);
    setMostrarFormulario(!mostrarFormulario);
    setFecha(null); // Reinicia la fecha
    setHora('');
  }
  
  const manejarCancelar = () => {
    setMostrarFormulario(false);
    setMostrarBotonCrear(true);
    setFecha(null); // Reinicia la fecha
    setHora('');
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    return hoy;
  };

  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    hoy.setMonth(hoy.getMonth() + 1);
    return hoy;
  };

  const horasDisponibles = [];
  for (let i = 8; i <= 18; i++) {
    horasDisponibles.push(`${i.toString().padStart(2, "0")}:00`);
  }

  const manejarCambioHora = (e) => {
    setHora(e.target.value);
  };

  const agendarTurno = async () => {
    const phone = usuario.userPhone;
    const email = usuario.userEmail;
    await createAppointment(phone, fecha.toISOString().split('T')[0], hora);
    Swal.fire({
      title: "Turno Agendado",
      html: `The Barber le informa que su turno ha sido agendado para el ${fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} a las ${hora}<br></br>
      <p>Confirmaciòn de este turno a su email:</p>
      <p><strong>${email}</strong></p><br>
      <p style="font-size: 12px; color: red;"><i>(Si no ha recibido el email, compruebe su carpeta de spam o filtros de correo)</i></p>`,
      icon: "success",
      confirmButtonText: "OK"
    });
    toggleFormulario();
  };

  const filterWeekends = (date) => {
    const day = date.getDay();
    return day !== 0; // 0 es domingo
  };

  useEffect(() => {
    if (usuario && Object.keys(usuario).length <= 0) {
        navigate('/login');
    }
}, [usuario]);

  return (
    <div className='containerAppointments'>
      <div className='h2button'>
        <h2>Listado de tus turnos</h2>
        {mostrarBotonCrear && <button className='crear' onClick={toggleFormulario}>Crear nuevo turno</button>}
      </div>
      
      {mostrarFormulario && (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className='crearTurno' >
          <div>
            <h3 style={{paddindBottom:'0px', margin:'2px 0px'}}>Agendando tu Nuevo Turno</h3>
            <h3 style={{fontStyle:'italic',fontSize:'10px', padding:'0px', marginTop:'0px'}}>La Agenda está abierta para un mes</h3>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <h4 style={{margin:'5px'}}>Fecha:</h4>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              minDate={obtenerFechaMinima()}
              maxDate={obtenerFechaMaxima()}
              filterDate={filterWeekends}
              className="inputFecha"
              placeholderText='Seleccione una fecha'
            />
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <h4 style={{margin:'5px 5px 5px 15px'}}>Hora: </h4>
            <select
              value={hora}
              onChange={manejarCambioHora}
              className="inputHora"
              style={{padding:'5px 15px 5px 25px'}}
            >
              <option value="">Seleccione una hora</option>
              {horasDisponibles.map((h, index) => (
                <option key={index} value={h}>{h}</option>
              ))}
            </select>
          </div>  
            <div className='botonesCrearTurno'>
              <button 
              className='btnCT Agendar' 
              onClick={agendarTurno}
              disabled={!fecha || !hora} // Verifica que ambos valores estén llenos
              >Agendar</button>
              <button className='btnCT CancelarCT' onClick={manejarCancelar}>Cancelar</button>
            </div>
            <div>
              <h5 style={{padding: '10px'}}>HORARIO DE ATENCIÓN</h5>    
              <h5>Lunes a Sábado de 8:00 a 18:00</h5>
              <h5 style={{padding: '5px'}}>Nota: Los turnos se cancelan 24 horas antes de la cita.</h5>
            </div>
          </div>
         </div> 
      )}
      <div className='turnos-flex'>
        {Object.keys(usuario).length > 0 && userTurnos.map((turno) => (
          <CajaAppointments key={turno.appointment} turno={turno} />
        ))}
      </div>
    </div>
  );
}

export default Appointments;

