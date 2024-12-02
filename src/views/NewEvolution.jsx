import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PedidoLab, Receta } from '../utils/alerts';
import { loadMedicineAll, searchByName } from '../API/Medicine';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { uploadEvolution } from '../API/Patient';

const NewEvolution = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const [modalShow, setModalShow] = useState(false);
    const [diagnostic,setDiagnostic]=useState()
    const [page, setPage] = useState(1)
    const [data, setData] = useState("")
    const [parameterFilter, setParameterFilter] = useState()
    const [load, setLoad] = useState(false)
    const [medicines, setMedicines] = useState(null)
    const handleChangeModal = () => setModalShow(!modalShow)
    const idDiagnostico=useParams()
    
    const[informe,setInforme]=useState()
    const[receta,setReceta]=useState({descripcion: '',dosis: '',codigo:''});
    const[pedidoLab,setPedidoLab]=useState({descripcion:'',fecha:''})
    
    const enviar = () => {
        console.log(informe)
        console.log(pedidoLab)
        console.log(receta)
        const usuario=JSON.parse(localStorage.getItem("usuario"))
        const paciente =JSON.parse(localStorage.getItem("Paciente"))
        const evolution={
            informe:informe,
            medicoDni:usuario.dni,
            pedidoLaboratorio:{
                descripcion:pedidoLab.descripcion,
                fecha:pedidoLab.fecha
            },
            receta:{
                codigoMedicamento:medicines.codigo,
                dosis:medicines.formato
            }
        }
        uploadEvolution(evolution,paciente.dni,idDiagnostico.id).then((resp)=>{
            console.log(resp)
            console.log(resp.status)
        })
    }
    const handleSelectMed = (Med) => {
        setMedicines(Med)
        handleChangeModal()
    }
    const handleMed = () => {
        handleChangeModal()
        loadMedicineAll(page).then(resp => {
            console.log(resp.status)
            if (resp.status == 200) {
                setData(resp.data)
                setLoad(true)
            } else {
                setData(null)
            }
        })
    }
    const searchMed = (med) => {
        searchByName(med).then(resp => {
            if (resp.status == 200) {
                setData(resp.data)
            } else {
                Swal.fire("Error", "Error al conectar con el servidor", "error")
            }
        })
    }
    const diagnostico = () => {
        const diagnosticos = JSON.parse(localStorage.getItem("Diagnosticos")) || null
        const evolucion = diagnosticos.filter(e => e.id === idDiagnostico.id);
        return(evolucion[0].nombre)
    }
    return (
        <>
            <Container>
                <h1 className='fs-1 text-center'>Nueva Evolucion clinica del diagnostico: { diagnostico()}</h1>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-4 text-center my-2'>Datos de evolucion</h4>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <input
                                type="text"
                                placeholder='Informe de evolucion clinica...'
                                onChange={(e)=>setInforme(e.target.value)}
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
                        <h4 className='fs-4 text-center my-2'>Receta</h4>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Descripcion de evolucion clinica...'
                                value={medicines !== null ? (medicines.descripcion) : null}
                                onChange={(e)=>setReceta({...receta,descripcion:e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Dosis</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Dosis de Medicameno...'
                                value={medicines !== null ? (medicines.formato) : null}
                                onChange={(e)=>setReceta({...receta,dosis:e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                    <Button variant='primary' onClick={() => handleMed()} className='mt-5 rounded-circle btn-circle'>
                        Buscar medicamento
                    </Button>
                </Container>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-4 text-center my-2'>Pedido de laboratorio</h4>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Descripcion de pedido...'
                                onChange={(e)=>setPedidoLab({...pedidoLab,descripcion:e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e)=>setPedidoLab({...pedidoLab,fecha:e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Container >
            <Container className='d-flex justify-content-center align-items-center'>
                <Button onClick={()=>enviar()} className='my-2 w-100' variant="primary" type='submit'>Guardar todo</Button>
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
                            />
                            <Button type='submit' variant='secondary' onClick={() => searchMed(parameterFilter)}>Buscar</Button>
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
                                <Spinner />
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