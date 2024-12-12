import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { dateParse, timeParse } from '../utils/parse';

const Evolution = () => {
    const navigate = useNavigate()
    const idDiagnostic = useParams();
    const [evolucionData, setEvolucionData] = useState([""])
    const [load, seLoad] = useState(false)
    const paciente= JSON.parse(localStorage.getItem("Paciente"))

    useEffect(() => {
        const uploadDiagnostic = () => {
            const diagnosticos = JSON.parse(localStorage.getItem("Diagnosticos")) || null
            const evolucion = diagnosticos.filter(e => e.id === idDiagnostic.id);
            setEvolucionData(evolucion[0])
            seLoad(true)
        }
        uploadDiagnostic()
    }, [])
    return (
        <Container>
            <h1 className='fs-1 text-center my-4'>Evolucion clinica del diagnostico:<b> {evolucionData.nombre}</b></h1>
            <Button variant='secondary' onClick={()=>navigate(`/Hc/${paciente.dni}`)}><h4><i className="bi bi-arrow-left-circle"/> Volver</h4></Button>
            <Container className='d-flex my-4 '>
                {
                    load ? (<>
                        {(evolucionData.evoluciones).length > 0 ? (
                            evolucionData.evoluciones.map((item, index) => {
                                return (
                                    <Card className='p-1 mx-2' key={index}>
                                        <h4 className='mt-3 text-center'>{dateParse(item.fecha)}</h4>
                                        <hr />
                                        <Card.Body>
                                            <ul>
                                                <li><b>Informe:</b>{item.informe}</li>
                                                <li><b>Medico:</b> {item.medico.nombre + " " + item.medico.apellido}</li>
                                                <li><b>Hora:</b> {timeParse(item.fecha)}</li>
                                                <li><b>Estado:</b> {item.estadoEvolucion}</li>
                                                <li><b>Receta:</b> {[item.receta].map((itemReceta, index) => 
                                                {
                                                    return(
                                                    <div className='ms-5' key={index}>
                                                        <b>Codigo: </b>{itemReceta.codigo} <br />
                                                        <b>Medicamentos: </b>{itemReceta.medicamento.descripcion} <br />
                                                        <b>Formato: </b>{itemReceta.medicamento.formato} <br />
                                                        <b>Estado:</b><span className={`${itemReceta.estadoReceta=="ACTIVO" ? ('text-success') : ('text-danger')}`}> {itemReceta.estadoReceta ? itemReceta.estadoReceta : itemReceta.estadoReceta}</span>
                                                    </div>
                                                )}
                                                )}</li>
                                                <li><b>Pedido de Laboratorio:</b> {[item.pedidoLaboratorio].map((pedido, index) => (
                                                    <div key={index}>
                                                        <b>Descripcion: </b>{pedido.descripcion} <br />
                                                        <b>Fecha: </b>{dateParse(pedido.fecha)} <br />
                                                        <b>Hora: </b>{timeParse(pedido.fecha)} <br />
                                                    </div>
                                                ))}</li>
                                            </ul>
                                        </Card.Body>
                                        <Button variant="warning">Modificar Evolucion</Button>
                                    </Card>
                                )
                            })
                        ) : (
                            <h2 className='fs-2 text-center'>No se cargaron evoluciones previamente.</h2>
                        )}
                    </>) : (<Container className='d-flex justify-content-center'><Spinner variant='primary' /></Container>)
                }
            </Container>
            <Container className='d-flex flex-column'>
                <Button onClick={() => navigate(`/Evolution/new/${idDiagnostic.id}`)} className='mx-5 p-3 my-5' >
                    Nueva Evolucion
                </Button>
            </Container>
        </Container>
    );
};

export default Evolution;