import { useEffect, useState } from "react"
import CarService from "../services/CarService";
import { Button, Card, Table, Form, Nav} from 'react-bootstrap';
import '../Form.css';

export const CarList = () => {
    const [cars, setCars] = useState([]);
    const [mark, setMark] = useState("");
    const [available, setAvailable] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("0, 500000");

    useEffect(() => {
        CarService.getCars().then((res) => {
            setCars(res.data);
        });
    },[])

    const filtredCars = () => {
        let prices = price.split(",");

        return cars
        .filter(car => car.mark.toLowerCase().includes(mark.toLowerCase()))
        .filter(car => car.available.toLowerCase().includes(available.toLowerCase()))
        .filter(car => car.color.toLowerCase().includes(color.toLowerCase()))
        .filter(car => car.type.toLowerCase().includes(type.toLowerCase()))
        .filter(car => (car.price >= prices[0] && car.price <= prices[1]));
    }

    return (
        <div><br />
        <h2 className="text-center">Filtrowanie</h2>
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
            <Nav.Link  style={{width: '20%'}}>
                <Form.Select size="sm" value={available} onChange={(e) => {
                    setAvailable(e.target.value);
                }}>
                    <option value="">Wybierz dostępność</option>
                    <option value="tak">Tak</option>
                    <option value="nie">Nie</option>
                </Form.Select>
            </Nav.Link>
            <Nav.Link  style={{width: '20%'}}>
                <Form.Select size="sm" value={type} onChange={(e) => {
                    setType(e.target.value);
                }}>
                    <option value="">Wybierz rodzaj</option>
                    <option value="osobowe">Osobowe</option>
                    <option value="dostawcze">Dostawcze</option>                    </Form.Select>
                </Nav.Link>
                <Nav.Link  style={{width: '20%'}}>
                    <Form.Select size="sm" value={color} onChange={(e) => {
                        setColor(e.target.value);
                    }}>
                        <option value="">Wybierz kolor</option>
                        <option value="czarny">Czarny</option>
                        <option value="srebrny">Srebrny</option>
                        <option value="biały">Biały</option>
                        <option value="zielony">Zielony</option>
                        <option value="czerwony">Czerwony</option>
                        <option value="niebieski">Niebieski</option>
                    </Form.Select>
                </Nav.Link>
                <Nav.Link style={{width: '20%'}}>
                    <Form.Select size="sm" value={price} onChange={(e) => {
                        setPrice(e.target.value);  
                    }}> 
                        <option value='0, 500000'>Wybierz cenę</option>
                        <option value='0, 9999'>Do 10 000</option>
                        <option value='10000, 19999'>Od 10 000 do 19 999</option>
                        <option value='20000, 29999'>Od 20 000 do 29 999</option>
                        <option value='30000, 39999'>Od 30 000 do 39 999</option>
                        <option value='40000, 49999'>Od 40 000 do 49 999</option>
                        <option value='50000, 500000'>Od 50 000</option>
                    </Form.Select>
                </Nav.Link>
        </Nav>
        <Button style={{marginTop: "20px"}} size="lg" variant="dark" type="submit">Dodaj Samochód</Button>
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
                                        <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit">Usuń</Button> 
                                </Card.Body>
                            </Card>        
                    )
                }
        </div>
    )
}