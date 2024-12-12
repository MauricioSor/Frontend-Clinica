import axios from "axios";

export const loadMedicineAll = async (pageNumber) => {
    try {
        const resp = await axios.get(`http://localhost:4000/api/medicamentos/todos?pagina=1&limite=100`)
        return resp; 
    } catch (error) {
        console.error("Error al cargar los medicamentos:", error);
        throw error; 
    }
};

export const searchByName = async (parameter) => {
    try {
        const resp = await axios.get(`http://localhost:4000/api/servicio-salud/medicamentos?descripcion=${parameter}`, {
            headers: {
                'Accept': '*/*'
            }
        });
        return resp; 
    } catch (error) {
        console.error("Error al buscar medicamentos por nombre:", error);
        throw error; 
    }
};

