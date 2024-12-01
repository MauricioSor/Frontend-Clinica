import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Evolution = () => {
    const navigate = useNavigate()
    const idDiagnostic = useParams();
    const [evolucionData, setEvolucionData] = useState([""])
    const [load, seLoad] = useState(false)
    useEffect(() => {

        const uploadDiagnostic = () => {
            const diagnosticos = JSON.parse(localStorage.getItem("Diagnosticos")) || null
            const evolucion = diagnosticos.filter(e => e.id === idDiagnostic.id);
            console.log(evolucion)
            setEvolucionData(evolucion[0])
            seLoad(true)
        }
        uploadDiagnostic()
    }, [])
    return (
        <Container>
            <h1 className='fs-1 text-center my-4'>Evolucion clinica de diagnostico:<b> {evolucionData.nombre}</b></h1>
            <Container className='d-flex my-4 '>
                {
                    load ? (<>
                        {(evolucionData.evoluciones).length > 0 ? (
                            <Card className='p-1' key={index}>
                                <h4 className='mt-3 text-center'>{evolucion.fecha}</h4>
                                <hr />
                                <Card.Body>
                                    {/* <ul>
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
                                        </ul> */}
                                </Card.Body>
                                <Button variant="warning">Modificar Evolucion</Button>
                            </Card>
                        ) : (
                            <h2 className='fs-2 text-center'>No se cargaron evoluciones previamente.</h2>
                        )}
                    </>) : (<Container className='d-flex justify-content-center'><Spinner variant='primary' /></Container>)
                }
            </Container>
            <Container className='d-flex flex-column'>
                <Button onClick={() => navigate("/Evolution/new")} className='mx-5 p-3 my-5' >
                    Nueva Evolucion
                </Button>
            </Container>
        </Container>
    );
};

export default Evolution;