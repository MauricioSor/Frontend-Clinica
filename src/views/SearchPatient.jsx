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
            if (response.status === 200) {
                
                setData(response.data);
                setLoad(true);
            } else {
                Swal.fire("Error", "Ocurrio un error con el servidor", "error");
                setLoad(true);
                setData(null);
            }
        })
        .catch((error) => {
            // Aquí también puedes manejar errores
            Swal.fire("Error", "Error al conectar con el servidor", "error");
            setLoad(true);
            setData(null);
        })
    }
    const uploadPatient=(patient)=>(localStorage.setItem("Paciente",JSON.stringify(patient)))
    return (<>
        <Container className='my-5'>
            <Container>
                <h1 className='fs-1 text-center'>Busqueda de Paciente</h1>
            </Container>
            <Form onSubmit={handleSubmit(busquedaDni)} className='my-5 d-flex align-items-center'>
                <Form.Label style={{ width: "290px" }} className='fs-5'>Ingrese DNI del paciente</Form.Label>
                <Container className='d-flex '>
                    <Container className='d-flex flex-column'>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Pj. 12345678"
                                {...register('paramt', {
                                    required: "Debe ingresar dni cuil o pasaporte del paciente"
                                })}
                            />
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Text className='text-danger'>{errors.paramt?.message}</Form.Text>
                    </Container>
                    <Button type="submit" variant='primary'>Buscar</Button>
                </Container>
            </Form>
        </Container>
        {
            load ? (
                <>
                    {data !== null && typeof(data)!==null ? (
                        <Container className='my-5'>
                            <Table responsive striped bordered hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>CUIL</th>
                                        <th>Pasaporte</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Provincia</th>
                                        <th>Pais</th>
                                        <th>Obra social</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Fecha de Alta</th>
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {
                                            [data].map((item, index) =>
                                            (<>
                                                <td>{item.dni}</td>
                                                <td>{item.cuil}</td>
                                                <td>{item.pasaporte}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.apellido}</td>
                                                <td>{item.provincia}</td>
                                                <td>{item.pais}</td>
                                                <td>{item.obraSocial}</td>
                                                <td>{dateParse(item.fechaNacimiento)}</td>
                                                <td>{dateParse(item.historiaClinica.fechaCreacion)}</td>
                                                <td className={item.estadoPersona=="ACTIVO" ? ('text-success') : ('text-danger')}><strong>{item.estadoPersona=="ACTIVO" ? (`Activo`) : (`Inactivo`)}</strong></td>
                                                <td>
                                                    <NavLink end to={`/HC/${item.dni}`} variant="success" size="sm" className="btn btn-success me-2" onClick={()=>uploadPatient(data)}>Ver Historia Clinica</NavLink>
                                                </td>
                                            </>)
                                            )
                                        }
                                    </tr>
                                </tbody>
                            </Table>
                        </Container>
                    ) : (
                        <><h2 className='fs-2 text-center'>No se encontraron resultados</h2></>
                    )
                    }
                </>
            ) : (<></>)
        }
    </>);
};

export default SearchPatient;