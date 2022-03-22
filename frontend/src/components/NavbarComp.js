import React, { Component } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Login from "./Login";
import Cars from "./Cars";
import Employees from "./Employees";




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
                                <Nav.Link as={Link} to={"/cars"}>Samochody</Nav.Link>
                                <Nav.Link as={Link} to={"/employees"}>Pracownicy</Nav.Link>
                                <Nav.Link></Nav.Link>
                                <Nav.Link as={Link} to={"/home"}>Strona główna</Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>O nas</Nav.Link>
                                <Nav.Link as={Link} to={"/contact"}>Kontakt</Nav.Link>
                                <Nav.Link></Nav.Link>
                            </Nav>
                            <Button variant="outline-secondary" as={Link} to={"/login"}>Zaloguj się</Button>
                        </Navbar.Collapse>
                        
                    </Container>
                    </Navbar>
                </div>
                <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                </div>
            </Router>  
        );
    }
}