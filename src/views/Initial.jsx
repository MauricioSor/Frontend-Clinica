import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Video from "../assets/VideoClinica.mp4"
import { Link } from 'react-router-dom';

const Initial = () => {
    return (
        <>
            <section id="video" className="position-relative overflow-hidden">
                <section className="pb-5 container-fluid">
                    <div id="tituloFraseGrande">
                        <div className="display-2 d-flex flex-column flex-md-column justify-content-center align-items-center gap-md-3 py-3" id="animacionPrincipal">
                            <div className="contenedorTextoAnimacion">
                                <span id="TextoGrupo1" className="slide-texto-fromBottom text-white fw-bold">¡Bienvenido a Mi Clinica!
                                </span>
                            </div>
                            <div className="contenedorTextoAnimacion">
                                <span id="TextoGrupo2" className=" slide-texto-fromTop  rollingVet-naranja fw-bold">Inicie sesión para comenzar con la gestión</span>
                            </div>
                        </div>
                    </div>
                </section>
                <video className="position-absolute z-n1 d-none d-md-block" src={Video} autoPlay muted loop />
                <img className="position-absolute top-50 start-50 translate-middle z-n1 d-md-none h-100" src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
{/*                 <Container id="texto" className="py-3">
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={12} md={6} className=''>
                            <div id='tituloFrase'>
                                <h1 className="display-5 fw-bold text-light mb-3">
                                    ¡Bienvenido a Mi Clinica!
                                </h1>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className='text-center' id='botonFrase'>
                            <Link id='boton' className="btn btn-primary rollingVet-naranja rounded-pill btn-lg px-5 fw-bold" to="/*" role="button">
                                Inicie sesión para comenzar con la gestión
                            </Link>
                        </Col>
                    </Row>
                </Container> */}
            </section>
        </>);
};

export default Initial;