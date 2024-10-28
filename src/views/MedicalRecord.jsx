import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Modal, Offcanvas, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { searchDiagnostic } from '../API/Patient';


const MedicalRecord = () => {
    const [show, setShow] = useState(false);
    const [dataPatient, setDataPatient] = useState("")
    const [dataDiagnostic, setDataDiagnostic] = useState([""])
    const [load, setLoad] = useState(false)
    const handleChange = () => setShow(!show)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    const idPatient = useParams()
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
    const sintomasData = [
        { label: 'Fiebre' },
        { label: 'Dolor de cabeza' },
        { label: 'Gripe' },
        { label: 'Sefalea' },
        { label: 'Rinitis' },
        { label: 'Vomito' },
        { label: 'Covid' },
    ]
    useEffect(() => {
        searchDiagnostic(idPatient).then(resp => {
            console.log(resp)
            setDataDiagnostic(resp.data)
            setLoad(true)
        })
    }, [])
    return (<>
        {
            load ? (
                <Container className="my-5">
                    <h1 className='fs-1 text-center mb-4'>Paciente: {localStorage.getItem("nombre")}</h1>
                    <Container className='d-flex flex-column flex-lg-row justify-content-around'>
                        <Card className="text-center my-2" style={{ width: '24rem' }}>
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
                        <Card className="text-center my-2 " style={{ width: '24rem' }}>
                            <h2 className='fs-2 mt-3'>Sintomas diagnosticados</h2>
                            <hr />
                            <Card.Body>
                                {
                                    dataDiagnostic.map((data, index) => {
                                        return(<Button onClick={() => navigate("/evolution")} key={index} className='p-3 m-2'>
                                            <span className="font-weight-bold">{data.nombre}</span>
                                        </Button>)
                                    }
                                    )
                                }
                            </Card.Body>
                            <Button onClick={() => handleChange()}>Nuevo diagnostico</Button>
                        </Card>
                    </Container>
                </Container>
            ) : (
                <Container className='d-flex justify-content-center align-items-center'>
                    <Spinner variant='primary' />
                </Container>
            )
        }


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