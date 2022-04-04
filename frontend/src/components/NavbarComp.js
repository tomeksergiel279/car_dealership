import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import Employees from './subpages/Employees';
import EmployeeForm from './forms/EmployeeForm';
import EmployeeView from './forms/EmployeeView';
import Clients from './subpages/Clients';
import ClientForm from './forms/ClientForm';
import ClientView from './forms/ClientView';
import Home from './subpages/Home';
import CarForm from './forms/CarForm';
import Contact from './subpages/Contact';
import Departments from './subpages/Departments';
import Booklet from './subpages/Booklet';
import BookletForm from './forms/BookletForm';
import { Cars } from './subpages/Cars';



class NavbarComp extends Component {
    render() {
        return (
            <div>
                <Navbar  sticky="top" bg="dark" expand="lg" variant="dark">
                <div className='container'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">STRONA GŁÓWNA</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link></Nav.Link>
                        
                        <Nav.Link className='d-flex' href="/cars">SAMOCHODY</Nav.Link>
                        <Nav.Link href="/clients">KLIENCI</Nav.Link> 
                        <Nav.Link href="/employees">PRACOWNICY</Nav.Link>  
                        <Nav.Link href="/departments">ODDZIAŁY</Nav.Link>
                        <Nav.Link></Nav.Link>
                        <Nav.Link href="/contact">KONTAKT</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </div>
                </Navbar>
                <Router>
                <div className="container">
                    <Switch> 
                            <Route path = "/employees" component = {Employees}></Route>
                            <Route path = "/add-employee/:id" component = {EmployeeForm}></Route>
                            <Route path = "/view-employee/:id" component = {EmployeeView}></Route>
                            <Route path = "/clients" component = {Clients}></Route>
                            <Route path = "/add-client/:id" component = {ClientForm}></Route>
                            <Route path = "/view-client/:id" component = {ClientView}></Route>
                            <Route path = "/booklet/:id" component = {Booklet}></Route>
                            <Route path = "/booklet/:id" component = {Booklet}></Route>
                            <Route path = "/update-booklet/:id" component = {BookletForm}></Route>
                            <Route path = "/cars" component = {Cars}></Route>
                            <Route path = "/add-car/:id" component = {CarForm}></Route>
                            <Route path = "/departments" component = {Departments}></Route>
                            <Route path = "/contact" component = {Contact}></Route>
                    </Switch>  
                </div>
                    <Switch>
                        <Route path = "/" exact component = {Home}></Route>
                        <Route path = "/home" component = {Home}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default NavbarComp;