import * as React from 'react';
import { Nav, Navbar, Container, Image, Form, NavDropdown, Button } from "react-bootstrap"
import { useState } from 'react';
import Logo from "../../assets/ClinicaLogo.png"

const Menu = ({CambioIdioma,idioma}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const changeStateMenu=()=>setOpenMenu(!openMenu)

    return (
        <>
            <Navbar expand="md" expanded={openMenu} onClick={changeStateMenu} className="bg-dark site-wrap" variant='primary' fixed='top'>
                <Container fluid>
                    <Navbar.Brand href="#" className='d-flex text-white'>
                        <Image src={Logo} style={{ height: "50px" }} alt="Logo Web" className='mx-2' roundedCircle />
                        <p className='ms-2 mt-3 text-white'>Mi Clinica</p>
                    </Navbar.Brand>
                    <Navbar.Toggle className='text-white' aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="navbarScroll" className=' responsive-navbar-nav' >
                        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link onClick={()=>{changeStateMenu}} className='' >Iniciar sesion</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Menu;