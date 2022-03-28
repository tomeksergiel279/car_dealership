import React, { Component } from 'react';
import CarService from '../services/CarService';
import { Button, Card, Table } from 'react-bootstrap';

import '../Form.css';

class Cars extends Component {
    constructor(props) {
        super(props)

        this.state = {
                cars: []
        }
        this.openBooklet = this.openBooklet.bind(this);
        this.addCar = this.addCar.bind(this);
        this.editCar = this.editCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }

    componentDidMount(){
        CarService.getCars().then((res) => {
            this.setState({ cars: res.data});
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

    render() {
        return (
            <div><br />
                    <Button onClick={this.addCar} size="lg" variant="dark" type="submit">Dodaj Samochód</Button> 
                    {
                        this.state.cars.map(
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
                                                    <td colSpan={2}><Button onClick = { () => this.openBooklet(car.serviceBooklet.id)} size="md" variant="primary" type="submit">Książka serwisowa</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                            <Button onClick = { () => this.editCar(car.id)} size="md" variant="secondary" type="submit">Modyfikuj</Button> 
                                            <Button style={{marginLeft: "10px"}} onClick = { () => this.deleteCar(car.id)}  size="md" variant="danger" type="submit">Usuń</Button> 
                                    </Card.Body>
                                </Card>        
                        )
                    }
            </div>
        )
    }
}

export default Cars;