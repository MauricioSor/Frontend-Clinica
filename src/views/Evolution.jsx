import React, { useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Evolution = () => {
    const navigate=useNavigate()
    const idDiagnostic=useParams();
    const evolucionData = [
        {
            id: 1,
            fecha: "02/04/2024",
            texto: "Se midió la temperatura el cual daba 38.5 grados",
            hora: "14:30",
            estado: true,
            medico: "Augusto Cordoba",
            receta: [
                {
                    codigoBarra: 123123123,
                    nombre: "Paracetamol",
                    estado: false
                }
            ],
            pedidoLaboratorio: [
                {
                    idPedido: 1,
                    texto: "Ecografía de tórax"
                }
            ]
        },
    ];
    useEffect(()=>{

    },[])
    return (
        <Container>
            <h1 className='fs-1 text-center my-4'>Evolucion clinica de <b> Fiebre</b></h1>
            <Container className='d-flex my-4 '>
                {
                    evolucionData.map((evolucion, index) => {
                        return (
                            <Card className='p-1' key={index}>
                                <h4 className='mt-3 text-center'>{evolucion.fecha}</h4>
                                <hr />
                                <Card.Body>
                                    <ul>
                                        <li>{evolucion.texto}</li>
                                        <li><b>Medico:</b> {evolucion.medico}</li>
                                        <li><b>Hora:</b> {evolucion.hora}</li>
                                        <li><b>Estado:</b> {evolucion.estado ? "Completo" : "Incompleto"}</li>
                                        <li><b>Receta:</b> {evolucion.receta.map(rec => (
                                            <div className='ms-5' key={rec.codigoBarra}>
                                                <b>Medicamento: </b>{rec.nombre} <br />
                                                <b> Estado:</b><span className={`${rec.estado ? ('text-success') : ('text-danger')}`}> {rec.estado ? "Usado" : "Sin usar"}</span>
                                            </div>
                                        ))}</li>
                                        <li><b>Pedido de Laboratorio:</b> {evolucion.pedidoLaboratorio.map(pedido => (
                                            <div key={pedido.idPedido}>
                                                {pedido.texto}
                                            </div>
                                        ))}</li>
                                    </ul>
                                </Card.Body>
                                <Button variant="warning">Modificar Evolucion</Button>
                            </Card>
                        )
                    })
                }
            </Container>
            <Container className='d-flex flex-column'>
                <Button onClick={()=>navigate("/Evolution/new")}className='mx-5 p-3 my-5' >
                    Nueva Evolucion
                </Button>
            </Container>
        </Container>
    );
};

export default Evolution;