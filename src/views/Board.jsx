import React from 'react';
import { Card, Container,Button, Image } from 'react-bootstrap';
import SearchPatient from './SearchPatient';
import SearchIcon from "../assets/searchPacientIcon.png"
import RegisterIcon from "../assets/icons8-escritura-96.png"
import { useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate=useNavigate("")

    return (
        <Container style={{ backgroundColor: "#242c4f" }} className='my-5'>
            <Container className='py-4 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='fs-1 text-white'>¡Bienvenido Dr.Mauricio Soria!</h1>
                <h4 className='fs-4 text-white'>Seleccione una opcion</h4>
                <Container className='d-flex  justify-content-around align-items-center'>
                    <Button>
                        <Card className='mt-4' style={{ width: "300px", height: "300px", backgroundColor: "yellow" }}>
                            <Card.Body>
                                <Card.Title className='fs-3 text-white'>Registrar Paciente</Card.Title>
                                <Image src={RegisterIcon} className=" object-fit-contain" width={200} />
                            </Card.Body>
                        </Card>
                    </Button>
                    <Button onClick={()=>navigate("/Main")}>
                        <Card className='mt-4' style={{ width: "300px", height: "300px", backgroundColor: "blue" }}>
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