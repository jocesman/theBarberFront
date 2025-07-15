import * as yup from 'yup';

const Schema = yup.object().shape({
    phone: yup.string()
        .matches(/^[0-9]+$/, "Solo se permiten números")
        .min(7, "Debe tener al menos 7 dígitos")
        .max(15, "No puede tener más de 15 dígitos")
        .required("Número de Teléfono es obligatorio"),
    password: yup.string().min(8, "Contraseña debe tener al menos 8 caracteres")
        .required("Contraseña es obligatoria"),
});

export default Schema;