import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const DigitalPrescription = () => {
    return (
        <Container>
            <h1 className='fs-1'>Receteta Digital</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder="Ingrese Descripcion"
                    />
                </Form.Group>
            <Button type='submit'>Generar receta</Button>
            </Form>
        </Container>
    );
};

export default DigitalPrescription;