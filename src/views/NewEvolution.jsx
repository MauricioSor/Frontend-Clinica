import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PedidoLab, Receta } from '../utils/alerts';
import { loadMedicineAll, searchByName } from '../API/Medicine';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadEvolution } from '../API/Patient';

const NewEvolution = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [modalShow, setModalShow] = useState(false);
    const [diagnostic, setDiagnostic] = useState()
    const [page, setPage] = useState(1)
    const [data, setData] = useState("")
    const [parameterFilter, setParameterFilter] = useState()
    const [load, setLoad] = useState(false)
    const [medicines, setMedicines] = useState(null)
    const handleChangeModal = () => setModalShow(!modalShow)
    const idDiagnostico = useParams()
    const navigate = useNavigate()

    const [informe, setInforme] = useState()
    const [receta, setReceta] = useState({ descripcion: '', dosis: '', codigo: '' });
    const [pedidoLab, setPedidoLab] = useState({ descripcion: '', fecha: '' })

    const enviar = () => {
        const paciente = JSON.parse(localStorage.getItem("Paciente"))
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        const evolution = {
            informe: informe,
            medicoDni: usuario.dni,
            ...(pedidoLab !== null && {
                pedidoLaboratorio: {
                    descripcion: pedidoLab.descripcion,
                    fecha: pedidoLab.fecha,
                },
            }),
            ...(medicines !== null && {
                receta: {
                    codigoMedicamento: medicines.codigo,
                    dosis: medicines.formato,
                },
            }),
        };
        uploadEvolution(evolution, paciente.dni, idDiagnostico.id).then((resp) => {
            if (resp.status == 201) {
                Swal.fire("Evolucion creada", "", "success")
                navigate(`/Evolution/${idDiagnostico.id}`)
            } else {
                Swal.fire("Error", "Error al conectar con el servidor", "error")
            }
        })
    }
    const handleSelectMed = (Med) => {
        setMedicines(Med)
        handleChangeModal()
    }
    const handleMed = () => {
        handleChangeModal()
        loadMedicineAll(page).then(resp => {
            if (resp.status == 200) {
                setData(resp.data)
                setLoad(true)
            } else {
                setData(null)
                Swal.fire("Error", "Ocurrió un error al contectar con el servidor. Intente nuevamente", "error")
            }
        })
    }
    const searchMed = (med) => {
        setLoad(false)
        searchByName(med).then(resp => {
            if (resp.status == 200) {
                setData(resp.data)
            }
            if (resp.status == 500) {
                Swal.fire("Error", "No se encontraron coincidencias", "error")
                handleMed()
                setParameterFilter("")
            }
            setLoad(true)
        })
    }
    const diagnostico = () => {
        const diagnosticos = JSON.parse(localStorage.getItem("Diagnosticos")) || null
        const evolucion = diagnosticos.filter(e => e.id === idDiagnostico.id);
        return (evolucion[0].nombre)
    }
    return (
        <>
            <Container>
                <h1 className='fs-1 text-center'>Nueva Evolucion clinica del diagnostico: {diagnostico()}</h1>
                <Button variant="secondary" onClick={() => navigate(`/Evolution/${idDiagnostico.id}`)}><h4><i className="bi bi-arrow-left-circle"></i> Volver</h4></Button>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-2 text-center my-2'>Datos de evolucion</h4>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <input
                                type="text"
                                style={{ width: "300px", height: "40px" }}
                                placeholder='Informe de evolucion clinica...'
                                onChange={(e) => setInforme(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Text className="text-danger">
                            {errors.evolucion?.message}
                        </Form.Text>
                    </Form>
                    <Button variant='warning' className='mt-5 rounded-circle btn-circle'>
                        Plantillas
                    </Button>
                </Container>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-2 text-center my-2'>Receta</h4>
                        <Form.Group className='d-flex my-2'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <Form.Control
                                readOnly
                                type="text"
                                className='text-start '
                                placeholder='Seleccione un medicamento'
                                value={medicines !== null ? (medicines.descripcion) : null}
                                onChange={(e) => setReceta({ ...receta, descripcion: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Dosis</Form.Label>
                            <Form.Control
                                readOnly
                                type="text"
                                placeholder='Seleccione un medicamento'
                                value={medicines !== null ? (medicines.formato) : null}
                                onChange={(e) => setReceta({ ...receta, dosis: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                    <Button variant='primary' onClick={() => handleMed()} className='mt-5 rounded-circle btn-circle'>
                        Buscar medicamento
                    </Button>
                </Container>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-2 text-center my-2'>Pedido de laboratorio</h4>
                        <Form.Group className='d-flex my-2'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Descripcion de pedido...'
                                onChange={(e) => setPedidoLab({ ...pedidoLab, descripcion: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setPedidoLab({ ...pedidoLab, fecha: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Container >
            <Container className='d-flex justify-content-center align-items-center'>
                <Button onClick={() => enviar()} className='my-2 w-100' variant="primary" type='submit'>Guardar todo</Button>
            </Container>

            <Modal
                show={modalShow}
                onHide={handleChangeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Busqueda de medicamentos
                        <Container className='my-4 d-flex justify-content-center'>
                            <Form.Label className='mx-2 mt-2'>Filtrar</Form.Label>
                            <input
                                type="text"
                                placeholder="Descripcion de Medicamento..."
                                onChange={(e) => { setParameterFilter(e.target.value); }}
                                value={parameterFilter || ""}
                                style={{ width: "500px" }}
                            />
                            <Button type='submit' className='ms-1' variant='secondary' onClick={() => searchMed(parameterFilter)}>Buscar</Button>
                        </Container>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex flex-column'>
                        {
                            load ? (
                                data.map((item, index) => {
                                    return (
                                        <Button key={index} className="my-2" onClick={() => handleSelectMed(item)}>
                                            {item.descripcion}
                                            {item.formato}
                                        </Button>
                                    )
                                })
                            ) : (
                                <>
                                    <Container className='d-flex justify-content-center'>
                                        Cargando... <Spinner />
                                    </Container>
                                </>
                            )
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => handleChangeModal()}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewEvolution;