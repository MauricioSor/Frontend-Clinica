import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../API/Patient';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate("")

    const registerPatient = (data) => {
        createPatient(data).then(resp => {
            if (resp.status == 200) {
                Swal.fire("Paciente creado", "Paciente creado exitosamente", 'success');
                navigate("/Board")
            } else {
                Swal.fire("Error", "Error al conectar con el servidor. Intente mas tarde", 'error');
            }
        })
    }
    return (
        <Container>
            <h1 className='fs-1 text-center my-5'>Registro de paciente</h1>
            <Form className='my-5' onSubmit={handleSubmit(registerPatient)}>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Nombre</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese nombre..."
                            {...register('nombre', {
                                required: '*El nombre es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.nombre?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        style={{ width: "400px" }}
                        type="text"
                        placeholder="Ingrese apellido..."
                        {...register('apellido', {
                            required: '* El apellido es un dato obligatorio* ',
                        })}
                    />
                    <Form.Text className="ms-3 fs-5 text-danger">
                        {errors.apellido?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Dni</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="number"
                            placeholder="Ingrese dni..."
                            {...register('dni', {
                                required: 'El dni es un dato obligatorio',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.dni?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Cuil</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese cuil..."
                            {...register('cuil', {
                                required: '* El cuil es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.cuil?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Pasaporte</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese pasaporte..."
                            {...register('pasaporte', {
                                required: '* El pasaporte es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.pasaporte?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Pais</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese pais..."
                            {...register('pais', {
                                required: '* El pais es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.pais?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Provincia</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese provincia..."
                            {...register('provincia', {
                                required: '* El provincia es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.provincia?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Localidad</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese localidad..."
                            {...register('localidad', {
                                required: '* Localidad es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.localidad?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Direccion</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese direccion..."
                            {...register('direccion', {
                                required: '* La direccion es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.direccion?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Correo</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese correo..."
                            {...register('email', {
                                required: '* El correo es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.email?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Telefono</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese telefono..."
                            {...register('telefono', {
                                required: '* El telefono es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.telefono?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Obra Social</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="text"
                            placeholder="Ingrese su obra social..."
                            {...register('obraSocial', {
                                required: '* Obra Social es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.obraSocial?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Numero de afiliado</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="number"
                            placeholder="Ingrese su numero de afiliado..."
                            {...register('nroAfiniliado', {
                                required: '* El numero de afiliado es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.nroAfiniliado?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Form.Group className="d-flex my-3 align-items-center">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Container className='d-flex mx-2'>
                        <Form.Control
                            style={{ width: "400px" }}
                            type="date"
                            placeholder="Ingrese fecha de nacimiento..."
                            {...register('fechNac', {
                                required: '* Fecha de nacimiento es un dato obligatorio *',
                            })}
                        />
                        <Form.Text className="ms-3 fs-5 text-danger">
                            {errors.fechNac?.message}
                        </Form.Text>
                    </Container>
                </Form.Group>
                <Container className='d-flex flex-column  mt-4'>
                    <Button type='submit' className='p-3 my-2'>Registrar Paciente</Button>
                    <Button onClick={() => navigate("/Board")} type='submit' variant='danger' className='p-3 mt-2'>Cancelar</Button>
                </Container>
            </Form>
        </Container>
    );
};

export default Register;