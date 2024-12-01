import axios from "axios"

export const loadMedicineAll = async (pageNumber) => {
    try {
        const resp = await axios.get(`https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos/todos?pagina=${pageNumber}&limite=100`)
        return resp
    } catch (e) {
        return e;
    }
}
export const searchByName=async(parameter)=>{
    try {
        const resp = await axios.get(`https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos?descripcion=${parameter}`)
        return resp
    } catch (e) {
        return e;
    }
}