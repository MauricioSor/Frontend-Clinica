import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from 'react-router-dom';
import { searchPatientParam } from '../API/Patient';
import Swal from 'sweetalert2';
import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { dateParse } from '../utils/parse';

const DigitalPrescription = () => {
    const [patientData, setPatientData] = useState()
    const [prescriptionData, setPrescriptionData] = useState()
    const [evolution, setEvolutionData] = useState("")
    const [load, setLoad] = useState(false)
    const printRef = useRef(null);  

    const params = useParams()


    const loadPatientData = () => {
        const search = { paramt: params.idPatient }
        searchPatientParam(search).then(resp => {
            if (resp.status == 200) {
                setPatientData(resp.data)
                searchDiagnostic(resp.data)
            } else {
                Swal.fire("Error", "Error al conectarse con el servidor", "error")
            }
        })
    }

    const searchDiagnostic = async (patientData) => {
        if (!patientData) {
            return null;
        }
        const diagnostico = await patientData.historiaClinica.diagnosticos.find(
            (diag) => diag.id === params.idDiagnostic
        );
        (diagnostico)
        setPrescriptionData(diagnostico);
    }

    const searchEvolution = async () => {
        const evolucion = await prescriptionData.evoluciones.find(
            (evo) => evo.id === params.idEvolutino
        );
        setEvolutionData(evolucion)
    }

    useEffect(() => {
        if (params) {
            loadPatientData()
        }
    }, [])

    useEffect(() => {
        if (prescriptionData !== undefined && prescriptionData !== "") {
            searchEvolution()
        }
    }, [prescriptionData])

    useEffect(() => {
        if (evolution || Object.keys(evolution).length !== 0) {
            setLoad(true)
        }
    }, [evolution])

    const generatePDF = () => {
        setTimeout(() => {
            const input = printRef.current; 

            if (!input) {
                console.error("El contenedor de la referencia no es válido");
                return;
            }

            html2canvas(input, { useCORS: true }).then((canvas) => {  
                const imgData = canvas.toDataURL("image/png");
                const doc = new jsPDF();
                doc.addImage(imgData, "PNG", 10, 10);
                doc.save("receta_clinica.pdf");
            }).catch((error) => {
                console.error("Error al generar el PDF", error);
            });
        }, 0);  
    };

    return (
        <Container>
            {
                load ? (<>
                    <h1 className='fs-1 text-center my-2'><u>Receta Clinica</u></h1>
                    <Container>
                        <h2 className='fs-2 text-center my-3'><b>Paciente</b></h2>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Nombre:&nbsp;</h3><p className='fs-3'>{patientData.nombre} {patientData.apellido}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Dni:&nbsp;</h3><p className="fs-3">{patientData.dni}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Obra social:&nbsp;</h3><p className="fs-3">{patientData.siglaObraSocial}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Codigo de obra social:&nbsp;</h3><p className="fs-3">{patientData.codigoObraSocial}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Diagnostico:&nbsp;</h3><p className="fs-3">{prescriptionData.nombre}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Fecha:&nbsp;</h3><p className="fs-3">{dateParse(evolution.fecha)}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Informe:&nbsp;</h3><p className="fs-3"> {evolution.informe}</p>
                        </Container>
                        <Container>
                            <h2 className='fs-2 text-center my-3'><b>Receta</b></h2>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Medicamentos:&nbsp;</h3><p className='fs-3'>{evolution.receta.medicamento.descripcion} {evolution.receta.medicamento.formato} &nbsp;&nbsp;codigo:&nbsp;{evolution.receta.medicamento.codigo}</p>
                        </Container>
                        <Container>
                            <h3 className='fs-2 text-center my-4'><b>Medico</b></h3>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Nombre:&nbsp;</h3><p className='fs-3'>{evolution.medico.nombre}{evolution.medico.apellido}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Matricula:&nbsp;</h3><p className='fs-3'>{evolution.medico.matricula}</p>
                        </Container>
                        <Container className='d-flex'>
                            <h3 className='fs-2'>Firma:&nbsp;</h3><p className='fs-3'>{evolution.receta.firma}</p>
                        </Container>
                    </Container>
                    <Container className='text-center my-5'>
                        <Button onClick={() => generatePDF()} type='submit'>Generar pdf</Button>
                    </Container>
                </>) : (
                    <Container>
                        <Spinner variant='primary' />
                    </Container>)
            }
        </Container>
    );
};

export default DigitalPrescription;