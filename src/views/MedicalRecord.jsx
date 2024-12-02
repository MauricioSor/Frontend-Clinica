import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Modal, Offcanvas, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createDiagnostic, searchDiagnostic } from '../API/Patient';
import Swal from 'sweetalert2';


const MedicalRecord = () => {
    const [show, setShow] = useState(false);
    const [dataPatientFetch, setDataPatientFetch] = useState("")
    const [dataDiagnostic, setDataDiagnostic] = useState([""])
    const [load, setLoad] = useState(false)
    const handleChange = () => setShow(!show)
    const navigate = useNavigate()
    const idPatient = useParams()

    const patientData = [
        { label: 'DNI', value: dataPatientFetch.dni },
        { label: 'Pasaporte', value: dataPatientFetch.pasaporte },
        { label: 'Nombre', value: dataPatientFetch.nombre },
        { label: 'Apellido', value: dataPatientFetch.apellido },
        { label: 'Obra Social', value: dataPatientFetch.obraSocial },
        { label: 'Fecha de Nacimiento', value: dataPatientFetch.fechaNacimiento },
    ];
    const sintomasData = [
        { name: 'Fiebre' },
        { name: 'Dolor de cabeza' },
        { name: 'Gripe' },
        { name: 'Sefalea' },
        { name: 'Rinitis' },
        { name: 'Vomito' },
        { name: 'Dolor de pierna' },
        { name: 'Dolor de brazo' },
        { name: 'Gripe porcina' },
        { name: 'Amnesia' },
    ]
    useEffect(() => {
        const paciente = JSON.parse(localStorage.getItem("Paciente"))
        setDataPatientFetch(paciente)
        fetchDataPatient();
    }, [])
    const fetchDataPatient = () => {
        searchDiagnostic(idPatient).then(resp => {
            setDataDiagnostic(resp.data.diagnosticos)
            setLoad(true)
            localStorage.setItem("Diagnosticos",JSON.stringify(resp.data.diagnosticos))
        })
    }
    
    const handleDiagnostic = (diagnostic) => {
        if (!(JSON.stringify(dataDiagnostic)).includes(diagnostic)) {
            createDiagnostic(dataPatientFetch,diagnostic).then(resp => {
                if (resp.status == 201) {
                    Swal.fire("Diagnostico cargado", "", "success")
                    handleChange()
                    fetchDataPatient();
                } else {
                    Swal.fire("Error al cargar diagnostico", "", "error")
                    handleChange()
                }
            }
            )
        } else {
            Swal.fire("Diagnostico ya existe", "", "warning")
            handleChange();
        }
    }
    return (<>
        {
            load ? (
                <Container className="my-5">
                    <h1 className='fs-1 text-center mb-4'>Paciente: {patientData[2].value+" "+patientData[3].value}</h1>
                    <Button variant="secondary"onClick={()=>navigate(`/Main`)}><h4><i className="bi bi-arrow-left-circle"></i> Volver</h4></Button>
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
                                {dataDiagnostic.length > 0 ? (
                                    dataDiagnostic.map((data, index) => {
                                        return (<Button onClick={() => navigate(`/evolution/${data.id}`)} key={index} className='p-3 m-2'>
                                            <span className="font-weight-bold">{data.nombre}</span>
                                        </Button>)
                                    }
                                    )) : (
                                    <div className="d-flex flex-column">Sin diagnosticos cargados</div>
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
                        <Button key={index} onClick={() => handleDiagnostic(data.name)} className='my-3'>{data.name}</Button>
                    ))
                }
            </Offcanvas.Body>
        </Offcanvas>
    </>);
};

export default MedicalRecord;