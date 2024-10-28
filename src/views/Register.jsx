import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../API/Patient';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate=useNavigate("")
    
    const registerPatient=(data)=>{
        console.log(data)
        createPatient(data).then(resp=>{
            console.log(resp)
            
        })
    }
    return (
        <Container>
            <h1 className='fs-1 text-center my-5'>Registro de paciente</h1>
            <Form className='my-5'onSubmit={handleSubmit(registerPatient)}>
                <Form.Group className="d-flex">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre..."
                        {...register('nombre', {
                            required: 'El nombre es un dato obligatorio',
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors.nombre?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex">
                <Form.Label>Cuil</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese cuil..."
                    {...register('cuil', {
                        required: 'El cuil es un dato obligatorio',
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.cuil?.message}
                </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex">
                <Form.Label>Pasaporte</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese pasaporte..."
                    {...register('pasaporte', {
                        required: 'El pasaporte es un dato obligatorio',
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.pasaporte?.message}
                </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex">
                <Form.Label>Obra Social</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese obra social..."
                    {...register('obraSocial', {
                        required: 'El obraSocial es un dato obligatorio',
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.obraSocial?.message}
                </Form.Text>
                </Form.Group>
                <Form.Group className="d-flex">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Ingrese fecha de nacimiento..."
                    {...register('fechNac', {
                        required: 'El fecha de nacimiento es un dato obligatorio',
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.fechNac?.message}
                </Form.Text>
                </Form.Group>
                <Container className='d-flex flex-column  mt-4'>
                    <Button type='submit' className='p-3 my-2'>Registrar Paciente</Button>
                    <Button onClick={()=>navigate("/Board")} type='submit' variant='danger' className='p-3 mt-2'>Cancelar</Button>
                </Container>
            </Form>
        </Container>
    );
};

export default Register;