import axios from "axios"
const url =import.meta.env.VITE_CLINICA 
export const newLogin=async(user)=>{
    try{
        const response = await axios.post(`${url}/auth/login`,{
            "usuario":user.usuario,
            "password":user.contraseña
        })
        
        return response
        }catch(e){
            return e;
        }
}