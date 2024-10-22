import React, { useState } from 'react';
import { Container, Card, Button, Modal, Offcanvas } from 'react-bootstrap';


const MedicalRecord = () => {
    const [show, setShow] = useState(false);
    const handleChange=()=>setShow(!show)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const patientData = [
        { label: 'DNI', value: '31234123' },
        { label: 'Pasaporte', value: '-' },
        { label: 'Nombre', value: 'Mauricio' },
        { label: 'Apellido', value: 'Soria' },
        { label: 'Obra Social', value: 'Swiss Medical' },
        { label: 'Fecha de Nacimiento', value: '02-04-1998' },
    ];
    const DiagnosticData = [
        { label: 'Fiebre' },
        { label: 'Dolor de cabeza' },
        { label: 'Gripe' },
        { label: 'Sefalea' }
    ];
    const sintomasData=[
        {label:'Fiebre'},
        {label:'Dolor de cabeza'},
        {label:'Gripe'},
        {label:'Sefalea'},
        {label:'Rinitis'},
        {label:'Vomito'},
        {label:'Covid'},
    ]

    return (<>
        <Container className="my-5">
            <h1 className='fs-1 text-center mb-4'>Paciente Agustin Mauricio Soria</h1>
            <Container className='d-flex justify-content-around'>
                <Card className="text-center" style={{ width: '24rem' }}>
                    <h2 className='fs-2 mt-3'>Datos</h2>
                    <hr />
                    <Card.Body>
                        {patientData.map((data, index) => (
                            <div key={index} className="d-flex justify-content-between mb-2">
                                <span className="font-weight-bold">{data.label}:</span>
                                <span>{data.value}</span>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
                <Card className="text-center p-2" style={{ width: '24rem' }}>
                    <h2 className='fs-2 mt-3'>Sintomas diagnosticados</h2>
                    <hr />
                    <Card.Body>
                        {DiagnosticData.map((data, index) => (
                            <Button key={index} className='p-3 m-2'>
                                <span className="font-weight-bold">{data.label}</span>
                            </Button>
                        ))}
                    </Card.Body>
                    <Button onClick={()=>handleChange()}>Nuevo diagnostico</Button>
                </Card>
            </Container>
        </Container>
        
        <Offcanvas style={{ background: "#242c4f" }} placement='end' show={show} onHide={handleChange}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='text-white text-center fs-2'>Sintomas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='d-flex flex-column'>
                {
                    sintomasData.map((data, index) => (
                        <Button key={index} className='my-3'>{data.label}</Button>
                    ))
                }
            </Offcanvas.Body>
        </Offcanvas>
    </>);
};

export default MedicalRecord;