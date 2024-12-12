import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { dateParse, timeParse } from '../utils/parse';
import jsPDF from "jspdf";
import { searchDiagnostic } from '../API/Patient';
import Swal from 'sweetalert2';

const Evolution = () => {
    const navigate = useNavigate()
    const idDiagnostic = useParams();
    const [evolucionData, setEvolucionData] = useState([""])
    const [load, seLoad] = useState(false)
    const paciente = JSON.parse(localStorage.getItem("Paciente"))


    const uploadDiagnostic =async () => {
        const diagnosticos = await JSON.parse(localStorage.getItem("Diagnosticos"))
        const evolucion = diagnosticos.filter(e => e.id === idDiagnostic.id);
        setEvolucionData(evolucion[0])
        seLoad(true)
    }
    const loadPatient = () => {
        const search = { id: paciente.dni }
        searchDiagnostic(search).then(resp => {
            if (resp.status == 200) {
                localStorage.setItem("Diagnosticos", JSON.stringify(resp.data.diagnosticos))
                uploadDiagnostic()
            } else {
                Swal.fire("Error", "Error al conectar con el servidor", "error")
            }
        })
    }
    useEffect(() => {
        loadPatient();
    }, [])

    return (
        <Container>
            <h1 className='fs-1 text-center my-4'>Evolucion clinica del diagnostico:<b> {evolucionData.nombre}</b></h1>
            <Button variant='secondary' onClick={() => navigate(`/Hc/${paciente.dni}`)}><h4><i className="bi bi-arrow-left-circle" /> Volver</h4></Button>
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
                                                {item.receta !== null ? (
                                                    <li>
                                                        <b>Receta:</b>
                                                        {[item.receta].map((itemReceta, index) => (
                                                            <div className="ms-5" key={index}>
                                                                <b>Código: </b>{itemReceta.codigo} <br />
                                                                <b>Medicamentos: </b>{itemReceta.medicamento.descripcion} <br />
                                                                <b>Formato: </b>{itemReceta.medicamento.formato} <br />
                                                                <b>Estado: </b>
                                                                <span className={itemReceta.estadoReceta === "ACTIVO" ? "text-success" : "text-danger"}>
                                                                    {itemReceta.estadoReceta || "Sin estado"}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </li>
                                                ) : null}
                                                {item.pedidoLaboratorio !== null ? (
                                                    <li><b>Pedido de Laboratorio:</b> {[item.pedidoLaboratorio].map((pedido, index) => (
                                                        <div key={index}>
                                                            <b>Descripcion: </b>{pedido.descripcion} <br />
                                                            <b>Fecha: </b>{dateParse(pedido.fecha)} <br />
                                                        </div>
                                                    ))}</li>
                                                ) : null}
                                            </ul>
                                        </Card.Body>
                                        {
                                            item.receta !== null ? (
                                                <Button onClick={() => navigate(`/Evolution/DigitalPrescription/${paciente.dni}/${idDiagnostic.id}/${item.id}`)} className='my-2' variant="info">Generar receta digital</Button>
                                            ) : null
                                        }
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