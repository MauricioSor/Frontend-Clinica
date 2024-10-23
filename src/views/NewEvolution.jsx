import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PedidoLab, Receta } from '../utils/alerts';

const NewEvolution = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm();

    const enviar = () => {
        PedidoLab();
        Receta();
    }
    return (
        <Container>
            <h1 className='fs-1 text-center'>Nueva Evolucion clinica</h1>
            <Container className='my-5 d-flex justify-content-around'>
                <Form className='border d-flex flex-column justify-content-center p-5' onSubmit={handleSubmit(enviar)}>
                    <h4 className='fs-4 text-center my-2'>Datos de evolucion</h4>
                    <Form.Group className='d-flex'>
                        <Form.Label className='mx-2 mt-2'>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Descripcion de evolucion clinica...'
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
                    <Button className='mt-2' variant="primary" type='submit'>Guardar</Button>
                </Form>
                <Button variant='warning' className='mt-5 rounded-circle btn-circle'>
                    Plantillas
                </Button>
            </Container>
        </Container>
    );
};

export default NewEvolution;