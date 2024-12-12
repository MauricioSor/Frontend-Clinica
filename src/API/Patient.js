import axios from "axios";
const url = import.meta.env.VITE_CLINICA

const token=JSON.parse(localStorage.getItem("token"))
const config = {
    headers: {
        'Authorization': 'Bearer ' +token
    }
}
export const createPatient = async (Patient) => {
    try {
        const response = await axios.post(`${url}/pacientes`,
            {
                dni: Patient.dni,
                cuil: Patient.cuil,
                apellido: Patient.apellido,
                nombre: Patient.nombre,
                fechaNacimiento: Patient.fechNac,
                direccion: Patient.direccion,
                localidad: Patient.localidad,
                provincia: Patient.provincia,
                pais: Patient.pais,
                email: Patient.email,
                telefono: Patient.telefono,
                pasaporte: Patient.pasaporte,
                codigoObraSocial: Patient.nroAfiniliado,
            },config)
        return response;
    } catch (e) {
        return e;
    }
}

export const searchPatientParam = async (param) => {
    try {
        const resp = await axios.get(`${url}/pacientes/${param.paramt}`,config)
        return resp;
    } catch (e) {
        return e
    }
}

export const searchDiagnostic = async (data) => {
    try {
        const resp = await axios.get(`${url}/pacientes/${data.id}/historia-clinica`,config)
        return resp;
    } catch (e) {
        return null;
        throw (e)
    }
}

export const createDiagnostic = async (patient, diagnostic) => {
    try {
        const resp = await axios.post(`${url}/pacientes/${patient.dni}/historia-clinica/diagnosticos`, {
            "nombre": diagnostic
        },config)
        return resp
    } catch (e) {
        return e;
    }
}

export const uploadEvolution = async (data, dni, diagnostic) => {
    try {
        const resp = axios.post(`${url}/pacientes/${dni}/historia-clinica/diagnosticos/${diagnostic}/evoluciones`, data,config)
        return resp
    } catch (e) {
        return e
    }
}

export const loadServices = async (item)=>{
    try{
        const  resp = await axios.get("http://localhost:4000/api/servicio-salud/obras-sociales"+(item!=null?("/"+item):""))
        return resp
    }catch (e){
        return e
    }
}