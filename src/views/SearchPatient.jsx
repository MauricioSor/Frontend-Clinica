import React from 'react';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import { useNavigate } from 'react-router-dom';

const SearchPatient = () => {
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const busquedaDni = (datos) => {
        console.log("Buscar paciente por DNI" + datos.dni)
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
                            type="number"
                            placeholder="Pj. 12345678"
                            {...register('dni', {
                                minLength: {
                                    value: 8,
                                    message: "DNI debe tener 8 caracteres",
                                },
                                maxLength: {
                                    value: 8,
                                    message: "DNI debe tener 8 caracteres",
                                },
                            })}
                        />
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                    </InputGroup>
                    <Form.Text className='text-danger'>{errors.dni?.message}</Form.Text>
                </Container>
            </Form>
        </Container>
        <Container className='my-5'>
            <Table responsive striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>CUIL</th>
                        <th>Pasaporte</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Obra social</th>
                        <th>Estado</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>31234123</td>
                        <td>-</td>
                        <td>Mauricio</td>
                        <td>Soria</td>
                        <td>Swiss Medical</td>
                        <td><strong style={{color:"green"}}>Activo</strong></td>
                        <td>02-04-1998</td>
                        <td>
                            <Button onClick={()=>navigate("/Hc")} variant="success" size="sm" className="me-2">Ver Historia Clinica</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    </>);
};

export default SearchPatient;