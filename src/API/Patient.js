import axios from "axios";
const url = import.meta.env.VITE_CLINICA

export const createPatient = async(Patient) => {
    try {
        const response = await axios.post(`${url}/pacientes`, {
            dni:Patient.dni,
            cuil:Patient.cuil,
            apellido:Patient.apellido,
            nombre:Patient.nombre,
            fechaNacimiento:Patient.fechaNacimiento,
            direccion:Patient.direccion,
            localidad:Patient.localidad,
            provincia:Patient.provincia,
            pais:Patient.pais,
            email:Patient.email,
            telefono:Patient.telefono,
            pasaporte:Patient.pasaporte,
            obraSocial:Patient.obraSocial,
            nroAfiliado:Patient.nroAfiliado,
        })
        return response;
    } catch (e) {
        return e;
    }
}
export const searchPatientParam = async(param) => {
    try {
        const resp= await axios.get(`${url}/pacientes/${param.paramt}`)
        return resp;
    } catch (e) {
        return e
    }
}
export const searchDiagnostic=async(data)=>{
    try{
        const resp= await axios.get(`${url}/pacientes/${data.id}/historia-clinica`)
        return resp;
    }catch(e){
        return null;
        throw(e)
    }
}
export const createDiagnostic=async(patient,diagnostic)=>{
    try{
        const resp= await axios.post(`${url}/pacientes/${patient.dni}/historia-clinica/diagnosticos`,{
            "nombre": diagnostic
        })
        return resp
    }catch (e){
        return e;
    }
}
