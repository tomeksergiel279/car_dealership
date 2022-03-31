import { useEffect, useState } from "react"
import CarService from "../services/CarService";
import { Button, Card, Table, Form, Nav} from 'react-bootstrap';
import '../Form.css';

export const CarList = () => {
    const [cars, setCars] = useState([]);
    const [initialCars, setInitialCars] = useState([]);
    const [mark, setMark] = useState("");
    const [available, setAvailable] = useState("");
    const [isLoading, setLouder] = useState(true);


    useEffect(() => {
        CarService.getCars().then((res) => {
            setCars(res.data);
            setInitialCars(res.data);
            setLouder(false);
        });
    },[])

    const filtredCars = () => {
        return cars.filter(car => car.mark.toLowerCase().includes(mark.toLowerCase()));
    }

    const onSearchHandler = () => {
    //     setCars(initialCars
    //        // .filter(car => car.mark.toLowerCase() === mark.toLowerCase())
    //        // .filter(car => car.available.toLowerCase() === available.toLowerCase())
    //         )
    }

    if(isLoading){
        return <h1>Loading</h1>
    }
    return (
        <div><br />
        <Nav>
            <Nav.Link style={{width: '20%'}}>
                <Form.Select size="sm" value={mark} onChange={(e) => {
                    setMark(e.target.value);
                }}>
                    <option value="">Wybierz markę</option>
                    <option value="audi">Audi</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="volkswagen">Volkswagen</option>
                </Form.Select>
            </Nav.Link>
        </Nav>
                <Button style={{float: 'right'}} onClick = {onSearchHandler}  size="lg" variant="primary" type="submit">Filtruj</Button> 
                {

                    filtredCars().map(
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
                }
        </div>
    )
}