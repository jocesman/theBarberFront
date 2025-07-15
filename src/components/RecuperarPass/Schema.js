import * as yup from 'yup';

const Schema = yup.object().shape({
    phone: yup.string()
        .matches(/^[0-9]+$/, "Solo se permiten números")
        .min(7, "Debe tener al menos 7 dígitos")
        .max(15, "No puede tener más de 15 dígitos")
        .required("Número de Teléfono es obligatorio"),
});

export default Schema;