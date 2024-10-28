import axios from "axios";
const url =import.meta.env.VITE_CLINICA 

export const createPatient=(Patient)=>{
    try{
        const response= axios.post(`${url}/Pacientes/Create`,{
            "nombre": Patient.nombre,
            "cuil": Patient.cuil,
            "pasaporte": Patient.pasaporte,
            "obraSocial": Patient.obraSocial,
            "estado": true,
            "fechaNacimiento": Patient.fechNac
        })
        console.log(response)
        return response;
    }catch(e){
        return e;
    }
}