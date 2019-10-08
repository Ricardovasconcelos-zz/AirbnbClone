import React from 'react';
import './Header.css'
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import Logo from '../../assets/logomain.png'
export default function Header() {
  return (
    <Navbar  expand="lg" className="navbar">
    <img src={Logo} alt="logo" className="logomain" />
    <Form>
        <FormControl type="text" placeholder="Experimente 'Maceió'" size="lg"/>
      </Form>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav id="eachnav">
        <Nav.Link href="#anfritao" >Torne-se um anfitrião</Nav.Link>
        <Nav.Link href="#salvos">Salvos</Nav.Link>
        <Nav.Link href="#viagens">Viagens</Nav.Link>
        <Nav.Link href="#msg">Mensagens</Nav.Link>
        <Nav.Link href="#ajuda">Ajuda</Nav.Link>
        <Nav.Link href="#creditos">Créditos</Nav.Link>
      </Nav>
      <Link to="/new">
            <button className="new">
                Cadastre seu Imóvel
            </button>
        </Link>
    </Navbar.Collapse>
  </Navbar>
  );
}
