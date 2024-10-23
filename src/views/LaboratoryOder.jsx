import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const LaboratoryOder = () => {
    return (
        <Container>
            <h1 className='fs-1'>Pedido de Laboratório</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder="Ingrese Descripcion"
                    />
                </Form.Group>
            <Button type='submit'>Generar pedido</Button>
            </Form>
        </Container>
    );
};

export default LaboratoryOder;