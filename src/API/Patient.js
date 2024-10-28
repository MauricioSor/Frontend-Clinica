import axios from "axios";
const url = import.meta.env.VITE_CLINICA

export const createPatient = (Patient) => {
    try {
        const response = axios.post(`${url}/Pacientes/Create`, {
            "nombre": Patient.nombre,
            "cuil": Patient.cuil,
            "pasaporte": Patient.pasaporte,
            "obraSocial": Patient.obraSocial,
            "estado": true,
            "fechaNacimiento": Patient.fechNac
        })
        return response;
    } catch (e) {
        return e;
    }
}
export const searchPatientParam = (param) => {
    try {
        const resp=axios.get(`${url}/Pacientes/getPaciente?parameter=${param.paramt}`)
        return resp;
    } catch (e) {
        return e
    }
}
export const searchDiagnostic=(data)=>{
    
    try{
        const resp= axios.get(`${url}/Pacientes/getHistoriaClinica?idHistoriaClinica=${data.id}`)
        return resp;
    }catch(e){
        return e;
    }
}