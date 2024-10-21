import * as React from 'react';
import { Nav, Navbar,Modal,Row, Container, Image, Form,Button, NavDropdown } from "react-bootstrap"
import { useState } from 'react';
import Logo from "../../assets/ClinicaLogo2.png"
import { useForm } from 'react-hook-form';

const Menu = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const changeStateMenu = () => setOpenMenu(!openMenu)
    const [show, setShow] = useState(false);
    const handleChange = () => setShow(!show);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    return (
        <>
            <Navbar style={{background:"#242c4f"}} expand="md" expanded={openMenu} onClick={changeStateMenu} className="site-wrap">
                <Container fluid>
                    <Navbar.Brand href="#" className='d-flex text-white'>
                        <Image src={Logo} style={{ height: "110px" }} alt="Logo Web" className='mx-2 mt-3' roundedCircle />
                        <p className='ms-2 mt-5 fs-4 text-white'>Mi Clinica</p>
                    </Navbar.Brand>
                    <Navbar.Toggle className='text-white' aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll" className=' responsive-navbar-nav' >
                        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            <Button style={{backgroundColor:"#242c4f",borderColor:"#242c4f"}} onClick={() => { handleChange() }} className='text-decoration-none text-white me-4 fs-5' >Iniciar sesion</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal className='border' show={show} onHide={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title ><h3 >Inicio de Sesion</h3></Modal.Title>
                </Modal.Header>
                <Container>
                    <Form onSubmit={handleSubmit({})}>
                        <Row>
                            <Form.Group>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Correo electronico..."
                                    defaultValue="mauricio@admin.com"
                                    {...register('email', {
                                        required: 'El email es un dato obligatorio',
                                        pattern: {
                                            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=? ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a -z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                            message: 'El email debe tener el siguiente formato mail@dominio.com'
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese Contraseña"
                                    defaultValue="Mauricio123"
                                    {...register('contraseña', {
                                        required: 'La contraseña es obligatoria',
                                        pattern: {
                                            value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                                            message: 'La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos.'
                                        }
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.contraseña?.message}
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Form.Group className='text-end my-2 '>
                            <Button className='mx-1' variant='danger' onClick={handleChange}>Cancelar</Button>
                            <Button className='mx-1' variant='primary' type='submit'>Ingresar</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal>
        </>
    );
};

export default Menu;