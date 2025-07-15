import { useState, useEffect, useContext } from 'react';
import '../css/Contactos.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { UserContext } from "../contexts/UserProvider";
import { useNavigate } from 'react-router-dom';

const Contacto = () => {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const { usuario } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${baseUrl}/contacto/${formData.email}`);
            Swal.fire({
                title: "¡Datos Enviados!",
                html: `Sus datos los recibimos exitosamente, y le hemos enviado una confirmación al correo electrónico: <strong>${formData.email}</strong>.<br><br>Si no aparece esta confirmación en su bandeja de entrada, revise su carpeta de spam.`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            setFormData({ nombre: '', email: '', mensaje: '' });
        } catch (err) {
            Swal.fire({
                title: "¡Alerta!",
                html: `Su datos no pudieron ser enviados:<br><br>${err.message}`,
                icon: "error",
                confirmButtonText: "Intentar de nuevo"
            });
        }
    };

    useEffect(() => {
        if (usuario && Object.keys(usuario).length <= 0) {
            navigate('/login');
        }
    }, [usuario]);

    return (
        <div className="contacto-container">
            <div className="contacto-container2">
            <h2>Buzón de Contacto</h2>
            <form onSubmit={handleSubmit} className="contacto-form">
                <div className="form-group">
                    <label >Nombre:</label>
                    <input
                        className='nombre'
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn contacto-btn">Enviar</button>
            </form>
            </div>
        </div>
    );
};

export default Contacto;
