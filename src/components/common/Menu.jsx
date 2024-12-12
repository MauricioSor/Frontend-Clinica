import * as React from 'react';
import { Nav, Navbar, Modal, Row, Container, Image, Form, Button, NavDropdown } from "react-bootstrap"
import { useState } from 'react';
import Logo from "../../assets/ClinicaLogo2.png"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { newLogin } from '../../API/Login';
import Swal from 'sweetalert2';

const Menu = ({ userLog, LoginUser }) => {

    const [openMenu, setOpenMenu] = useState(false)
    const changeStateMenu = () => setOpenMenu(!openMenu)
    const [show, setShow] = useState(false);
    const handleChange = () => setShow(!show);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate("")
    
    const admin = {
        dni: "12345678",
        cuil: "20-12345678-9",
        apellido: "Rodriguez",
        nombre: "Pedro",
        fechaNacimiento: "1980-01-01",
        direccion: "Sarmiento 560",
        localidad: "Yerba Buena",
        provincia: "Tucumán",
        pais: "Argentina",
        email: "juan.perez@example.com",
        telefono: "123456789",
        matricula: "12345",
        especialidad: "Cardiología",
        usuario: "pedroR",
        password: "password123",
        tipoUsuario: "medico"
    }

    const login = (user) => {
        newLogin(user).then((resp)=>{
            if(resp.status==200){
                Swal.fire("Bienvenido  " + admin.nombre, "", "success")
                localStorage.setItem("usuario",JSON.stringify(admin))
                localStorage.setItem("token",JSON.stringify(resp.data.token))
                navigate("/Board")
                LoginUser(JSON.stringify(admin))
                handleChange();
            }else{
                Swal.fire("Error al iniciar sesión", "", "error")
            }
        })
        
    }
    const LogOut = () => {
        localStorage.clear()
        LoginUser(null)
        Swal.fire("Cerraste sesión", "", "success")
        navigate("/")
    }
    return (
        <>
            <Navbar style={{ background: "#242c4f" }} expand="md" expanded={openMenu} onClick={changeStateMenu} className="site-wrap">
                <Container fluid>
                    <Navbar.Brand href="#" className='d-flex text-white'>
                        <Button onClick={() => navigate("/")} className='text-decoration-none' style={{ backgroundColor: "#242c4f", borderColor: "#242c4f" }}>
                            <Image src={Logo} style={{ height: "100px" }} alt="Logo Web" className='mx-2 mt-3' roundedCircle />
                        </Button>
                        <p className='ms-2 mt-5 fs-4 text-white'>Mi Clinica</p>
                    </Navbar.Brand>
                    <Navbar.Toggle className='text-white' aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll" className='responsive-navbar-nav' >
                        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            {
                                userLog ? (
                                    <>
                                        <Button style={{ backgroundColor: "#242c4f", borderColor: "#242c4f" }} className='text-decoration-none text-white me-4 fs-5' >{JSON.parse(userLog).nombre +" "+JSON.parse(userLog).apellido}</Button>
                                        <Button style={{ backgroundColor: "#242c4f", borderColor: "#242c4f" }} onClick={() => navigate("/Board")} className='text-decoration-none text-white me-4 fs-5' >Board</Button>
                                        <Button style={{ backgroundColor: "#242c4f", borderColor: "#242c4f" }} onClick={() => LogOut()} className='text-decoration-none text-white me-4 fs-5' >Cerrar sesión</Button>
                                    </>
                                ) : (
                                    <Button style={{ backgroundColor: "#242c4f", borderColor: "#242c4f" }} onClick={() => handleChange()} className='text-decoration-none text-white me-4 fs-5' >Iniciar sesion</Button>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal className='border' show={show} onHide={handleChange}>
                <Modal.Header closeButton>
                    <Modal.Title ><h3 >Inicio de Sesion</h3></Modal.Title>
                </Modal.Header>
                <Container>
                    <Form onSubmit={handleSubmit(login)}>
                        <Row>
                            <Form.Group>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Correo electronico..."
                                    defaultValue="pedroR"
                                    {...register('usuario', {
                                        required: 'El usuario es un dato obligatorio',
                                    })}
                                />
                                <Form.Text className="text-danger">
                                    {errors.usuario?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese Contraseña"
                                    defaultValue="password123"
                                    {...register('contraseña', {
                                        required: 'La contraseña es obligatoria',
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