import { Schema, model } from 'mongoose';

let employee = new Schema({
    apellido1:{
        type: String,
        required: true
    },
    apellido2:{
        type: String,
        required: false
    },
    nombre1:{
        type: String,
        required: true
    },
    otroNombre:{
        type: String,
        required: false
    },
    pais:{
        type: String,
        required: true
    },
    tipo_identificacion:{
        type: String,
        required: true
    },
    nro_identificacion:{
        type: String,
        required: true,
        unique: true
    },
    correo:{
        type: String
    },
    ingreso:{
        type: String
    },
    area: {
        type: String
    },
    estado: {
        type: String
    },
    registro: {
        type: String
    },
    ingresoDate: {
        type: Date
    },
    edicion: {
        type: String
    }
})

export default model('employees', employee);
