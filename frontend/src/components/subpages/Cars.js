import React, { Component } from 'react';
import CarService from '../services/CarService';
import { Button, Card, Table, Form, Nav} from 'react-bootstrap';

import '../Form.css';

class Cars extends Component {
    constructor(props) {
        super(props)

        this.state = {
                cars: [],
                searchCars: [],
                mark: "",
                available: "",
                color: "",
                type: "",
                price: ""
        }
        this.openBooklet = this.openBooklet.bind(this);
        this.addCar = this.addCar.bind(this);
        this.editCar = this.editCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount(){
        CarService.getCars().then((res) => {
            this.setState({ cars: res.data, searchCars: res.data});
        });
    }

    openBooklet(id){
        this.props.history.push(`booklet/${id}`);
    }

    addCar(){
        this.props.history.push('/add-car/_add');
    }

    editCar(id){
        this.props.history.push(`add-car/${id}`);
    }

    deleteCar(id){
        CarService.deleteCar(id).then( res => {
            this.setState({cars: this.state.cars.filter(car => car.id !== id)});
        });
    }

    search(){
        this.setState({ searchCars: this.state.cars});
        console.log(this.state.cars, this.state.searchCars);

        this.setState({searchCars: this.state.searchCars.filter
            (car => (car.available.toLowerCase().indexOf(this.state.available) > -1 
            && car.mark.toLowerCase().indexOf(this.state.mark) > -1) 
            && car.type.toLowerCase().indexOf(this.state.type) > -1
            && car.color.toLowerCase().indexOf(this.state.color) > -1)
        })
    }


    render() {
        return (
            <div><br />
            <Nav>
                <Nav.Link style={{width: '20%'}}>
                    <Form.Select size="sm" value={this.state.mark} onChange={(e) => this.setState({mark: e.target.value})}>
                        <option value="">Wybierz markę</option>
                        <option value="audi">Audi</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="volkswagen">Volkswagen</option>
                    </Form.Select>
                </Nav.Link>
                <Nav.Link  style={{width: '20%'}}>
                    <Form.Select size="sm" value={this.state.available} onChange={(e) => this.setState({available: e.target.value})}>
                        <option value="">Wybierz dostępność</option>
                        <option value="tak">Tak</option>
                        <option value="nie">Nie</option>
                    </Form.Select>
                </Nav.Link>
                <Nav.Link  style={{width: '20%'}}>
                    <Form.Select size="sm" value={this.state.type} onChange={(e) => this.setState({type: e.target.value})}>
                        <option>Wybierz rodzaj</option>
                        <option value="osobowe">Osobowe</option>
                        <option value="dostawcze">Dostawcze</option>
                    </Form.Select>
                </Nav.Link>
                <Nav.Link  style={{width: '20%'}}>
                    <Form.Select size="sm" value={this.state.color} onChange={(e) => this.setState({color: e.target.value})}>
                        <option>Wybierz kolor</option>
                        <option value="czarny">Czarny</option>
                        <option value="szary">Szary</option>
                        <option value="biały">Biały</option>
                        <option value="zielony">Zielony</option>
                        <option value="czerwony">Czerwony</option>
                        <option value="niebieski">Niebieski</option>
                    </Form.Select>
                </Nav.Link>
                <Nav.Link style={{width: '20%'}}>
                    <Form.Select size="sm" value={this.state.price} onChange={(e) => this.setState({price: e.target.value})}>
                        <option>Wybierz cenę</option>
                        <option value="10000">10 000</option>
                        <option value="20000">20 000</option>
                    </Form.Select>
                </Nav.Link>
            </Nav>
                    <Button  onClick={this.addCar} size="lg" variant="dark" type="submit">Dodaj Samochód</Button>
                    <Button style={{float: 'right'}} onClick = { () => this.search()}  size="lg" variant="primary" type="submit">Filtruj</Button> 
                    {
                        this.state.searchCars && this.state.searchCars.length > 0?
                        this.state.searchCars.map(
                            car => 
                                <Card key = {car.id} border="secondary" className='cards'>
                                     <Card.Header><h3>{ car.mark } { car.model }</h3></Card.Header>
                                     <Card.Img variant="top" src={car.img} />
                                     <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>VIN</td>
                                                    <td>{car.vin}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kolor</td>
                                                    <td>{car.color}</td>
                                                </tr>
                                                <tr>
                                                    <td>Rok produkcji</td>
                                                    <td>{car.productionYear}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cena</td>
                                                    <td>{car.price}</td>
                                                </tr>
                                                <tr>
                                                    <td>Dostępność</td>
                                                    <td>{car.available}</td>
                                                </tr>
                                                <tr>
                                                    <td>Rodzaj</td>
                                                    <td>{car.type}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}><Button onClick = { () => this.openBooklet(car.serviceBooklet.id)} size="md" variant="primary" type="submit">Książka serwisowa</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                            <Button onClick = { () => this.editCar(car.id)} size="md" variant="secondary" type="submit">Modyfikuj</Button> 
                                            <Button style={{marginLeft: "10px"}} onClick = { () => this.deleteCar(car.id)}  size="md" variant="danger" type="submit">Usuń</Button> 
                                    </Card.Body>
                                </Card>        
                        )
                        : <h1 style={{marginLeft: "45%"}}>Brak wyników</h1>
                    }
            </div>
        )
    }
}

export default Cars;