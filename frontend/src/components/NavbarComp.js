import React, { Component } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import About from "./subpages/About";
import Home from "./subpages/Home";
import Contact from "./subpages/Contact";
import Login from "./Login";
import Cars from "./subpages/Cars";
import Employees from "./subpages/Employees";
import Clients from "./subpages/Clients";
import Departments from "./subpages/Departments";




export default class NavbarComp extends Component{
    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">Wypożyczalnia</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link></Nav.Link>
                                <Nav.Link as={Link} to={"/home"}>Strona główna</Nav.Link>
                                <Nav.Link as={Link} to={"/cars"}>Samochody</Nav.Link>
                                <Nav.Link as={Link} to={"/employees"}>Pracownicy</Nav.Link>
                                <Nav.Link as={Link} to={"/clients"}>Klienci</Nav.Link>
                                <Nav.Link as={Link} to={"/departments"}>Oddziały</Nav.Link>
                                <Nav.Link></Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>O nas</Nav.Link>
                                <Nav.Link as={Link} to={"/contact"}>Kontakt</Nav.Link>
                                <Nav.Link></Nav.Link>
                            </Nav>
                            <Button variant="outline-secondary" as={Link} to={"/login"}>Logowanie</Button>
                        </Navbar.Collapse>
                        
                    </Container>
                    </Navbar>
                </div>
                <div  className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add-client" element={<Login />} />
                </Routes>
                </div>
            </Router>  
        );
    }
}