import QRCode from "react-qr-code";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {

    return (
        <>
            <Container style={{background:"#242c4f"}} className=' py-3 justify-content-center' fluid >
                <Row className="justify-content-around align-items-center">
                    <Col lg={6} md={6} sm={12} className="" style={{ maxWidth: 170, width: "100%" }}>
                        <QRCode
                            size={160}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={window.location.origin}
                            viewBox={`0 0 256 256`}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <p className="text-light text-start" id="textoFooter">&copy; Todos los derechos Reservados - Mi Clinica Corp.</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;