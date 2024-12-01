import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PedidoLab, Receta } from '../utils/alerts';
import { loadMedicineAll } from '../API/Medicine';
import Swal from 'sweetalert2';

const NewEvolution = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const [modalShow, setModalShow] = useState(false);
    const [page, setPage] = useState(1)
    const [data, setData] = useState("")
    const [medicines, setMedicines] = useState([])
    const handleChangeModal = () => setModalShow(!modalShow)
    const enviar = () => {
        PedidoLab();
        Receta();
    }
    const handleSelectMed=(Med)=>setMedicines(Med)
    const handleMed = () => {
        loadMedicineAll(page).then(resp => {
            if (resp.status == 200) {
                setData(resp.data)
            } else {
                setData(null)
            }
        })
        handleChangeModal()
    }
    const searchMed = (med) => {
        searchByName(med.medicamento).then(resp => {
            if (resp.status == 200) {
                setData(resp.data)
            } else {
                Swal.fire("Error", "Error al conectar con el servidor", "error")
            }
        })
    }

    return (
        <>
            <Container>
                <h1 className='fs-1 text-center'>Nueva Evolucion clinica del diagnostico: { }</h1>
                <Container className='my-5 d-flex justify-content-around'>
                    <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                        <h4 className='fs-4 text-center my-2'>Datos de evolucion</h4>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Informe de evolucion clinica...'
                                {...register('evolucion', {
                                    required: "La descripcion de evolucion es un dato obligatorio"
                                    , minLength: {
                                        value: 2,
                                        message: "La cantidad minima de caracteres es de 2 y maximo de 20"
                                    },
                                    maxLength: {
                                        value: 60
                                        , message: "La cantidad minima de caracteres es de 2 y maximo de 60"
                                    }
                                })}
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
                                value={medicines.codigo||null}
                                {...register('evolucion', {
                                })}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Dosis</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Dosis de Medicameno...'
                                value={medicines.formato||null}
                                {...register('evolucion', {
                                })}
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
                                placeholder='Descripcion de evolucion clinica...'
                                {...register('descripcion', {
                                })}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex'>
                            <Form.Label className='mx-2 mt-2'>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('fecha', {
                                })}
                            />
                        </Form.Group>
                    </Form>
                </Container>
                <Button className='mt-2 ' variant="primary" type='submit'>Guardar todo</Button>
            </Container>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Busqueda de medicamentos
                        <Form onSubmit={handleSubmit(searchMed)}>
                            <Form.Group className='d-flex'>
                                <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='Descripcion de Medicamento...'
                                    {...register('medicamento', {
                                        required: "Debe ingresar un medicamento para buscar"
                                    })}
                                />
                            </Form.Group>
                        </Form>
                        <Form>
                        </Form>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='d-flex flex-column'>
                        {
                            data.localeCompare((item,index)=>{
                                return(
                                    <Button key={index} className="my-2"onClick={()=>handleSelectMed(item)}>
                                        {item.descripcion}
                                        {item.formato}
                                        </Button>
                                )
                            })
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleChangeModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewEvolution;