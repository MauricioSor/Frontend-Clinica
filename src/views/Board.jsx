import React from 'react';
import { Card, Container,Button, Image } from 'react-bootstrap';
import SearchIcon from "../assets/searchPacientIcon.png"
import RegisterIcon from "../assets/icons8-escritura-96.png"
import { useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate=useNavigate("")
    const usuario=JSON.parse(localStorage.getItem("usuario"))
    console.log(usuario);
    const parseText=(usuario)=>{
        return usuario.charAt(0).toUpperCase() + usuario.slice(1);
    }
    return (
        <Container style={{ backgroundColor: "#242c4f" }} className='my-5'>
            <Container className='py-4 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='fs-1 text-white'>¡Bienvenido {parseText(usuario.tipoUsuario)+" "+usuario.nombre}!</h1>
                <h4 className='fs-4 text-white'>Seleccione una opcion</h4>
                <Container className='d-flex flex-column flex-lg-row justify-content-around align-items-center'>
                <Button className='mt-4 bg-warning'style={{borderColor:"#ffc107"}} onClick={()=>navigate("/Register")}>
                        <Card  className='bg-warning' style={{ width: "300px", height: "300px",borderColor:"#ffc107" }}>
                            <Card.Body>
                                <Card.Title className='fs-3 text-white'>Registrar Paciente</Card.Title>
                                <Image src={RegisterIcon} className=" object-fit-contain" width={200} />
                            </Card.Body>
                        </Card>
                    </Button>
                    <Button className='mt-4' onClick={()=>navigate("/Main")}>
                        <Card  className='bg-primary border-primary' style={{ width: "300px", height: "300px" }}>
                            <Card.Body>
                                <Card.Title className='fs-3 text-white'>Buscar Paciente</Card.Title>
                                <Image src={SearchIcon} className=" object-fit-contain" width={200} />
                            </Card.Body>
                        </Card>
                    </Button>
                </Container>
            </Container>
        </Container>
    );
};

export default Board;