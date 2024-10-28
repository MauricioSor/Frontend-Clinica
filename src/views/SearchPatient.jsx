import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { searchPatientParam } from '../API/Patient';
import Swal from 'sweetalert2';
import { dateParse } from '../utils/parse';

const SearchPatient = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [load, setLoad] = useState(false)
    const [data, setData] = useState("")
    const busquedaDni = (param) => {
        searchPatientParam(param).then((response) => {
            if(response.status==200){
                setData(response.data)

                setLoad(true)
            }else{
                Swal.fire("Error","Error al conectar con el servidor","error")
            }
        })
    }
    return (<>
        <Container className='my-5'>
            <Container>
                <h1 className='fs-1 text-center'>Busqueda de Paciente</h1>
            </Container>
            <Form onSubmit={handleSubmit(busquedaDni)} className='my-5 d-flex align-items-center'>
                <Form.Label style={{ width: "290px" }} className='fs-5'>Ingrese DNI del paciente</Form.Label>
                <Container className='d-flex flex-column'>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Pj. 12345678"
                            {...register('paramt', {
                                minLength: {
                                    value: 8,
                                    message: "El campo debe tener 8 caracteres",
                                }
                            })}
                        />
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                    </InputGroup>
                    <Button type="submit" variant='primary'>Buscar</Button>
                    <Form.Text className='text-danger'>{errors.paramt?.message}</Form.Text>
                </Container>
            </Form>
        </Container>
        {
            load ? (
                <>
                    <Container className='my-5'>
                        <Table responsive striped bordered hover className="text-center">
                            <thead>
                                <tr>
                                    <th>CUIL</th>
                                    <th>Pasaporte</th>
                                    <th>Nombre</th>
                                    <th>Obra social</th>
                                    <th>Estado</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        [data].map((item, index) => 
                                            (<>
                                                <td>{item.cuil}</td>
                                                <td>{item.pasaporte}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.obraSocial}</td>
                                                <td className={item.estado ? ('text-success') : ('text-danger')}><strong>{item.estado ? (`Activo`) : (`Inactivo`)}</strong></td>
                                                <td>{dateParse(item.fechaNacimiento)}</td>
                                                <td>
                                                    <NavLink  end  to={`/HC/${item.historiaClinica.idHistoriaClinica}`}  variant="success" size="sm" className="btn btn-success me-2">Ver Historia Clinica</NavLink>
                                                </td>
                                                </>)
                                    )
                                    }
                                </tr>
                            </tbody>
                        </Table>
                    </Container>

                </>
            ) : (<></>)
        }
    </>);
};

export default SearchPatient;