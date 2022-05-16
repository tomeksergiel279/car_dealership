import { useEffect, useState } from "react"
import CarService from "../services/CarService";
import { Button, Card, Table, Form, Nav, Row} from 'react-bootstrap';
import '../styles/Car.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure()

export const Cars = () => {
    const [user, setUser] = useState([]);
    const [cars, setCars] = useState([]);
    const [mark, setMark] = useState("");
    const [available, setAvailable] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("0, 500000");

    useEffect(() => {
        CarService.getCars().then((res) => {
            setCars(res.data);
            setUser(JSON.parse(localStorage.getItem('user')));
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

    const deleteCar = (id) => {
        CarService.deleteCar(id).then((res) => {
            setCars(cars.filter(car => {
                return car.id !== id;
            }))
            if(res.status === 204) { toast.success('Samochód usunięty') }
            else { toast.error("Nie udało się usunąć samochodu") }
        })
    }

    const addCar = () => {
        window.location.replace('http://localhost:3000/add-car/_add');
    }

    const openBooklet = (id) => {
        window.location.replace(`http://localhost:3000/booklet/${id}`);
    }

    const editCar = (id) => {
        window.location.replace(`http://localhost:3000/add-car/${id}`);
    }

    const reserveCar = (id) => {
        CarService.GetCarById(id).then(res => {
            let car = res.data;

            if(car.reservation === 'Tak' || car.available === 'Nie'){
                toast.error("Samochód jest już zarezerwowany lub nie jest dostępny");
            }
            else{
                car.reservation = 'Tak';
                CarService.reserveCar(car, id, user.email).then(res => {
                    if(res.status === 200){
                        toast.success("Samochód został zarezerwowany");
                    }else{
                        toast.error("Błąd");
                    }
                })          
            }
        })
    }

    const messageCar = (id) => {
        CarService.GetCarById(id).then(res => {
            let car = res.data;

            CarService.messageCar(car, id, user.email).then(res => {
                if(res.status === 200){
                    toast.success("Powiadomienie zostanie wysłane");
                }else{
                    toast.error("Błąd");
                }
            })          
            
        })
        toast.success("Powiadomienie zostanie wysłane");
    }

    return (
        <div><br />
        <h2 className='text-center display-5 mb-3'>Filtrowanie</h2>
        <Nav>
            <Nav.Link style={{width: '20%'}}>
                <Form.Select size="sm" value={mark} onChange={(e) => {
                    setMark(e.target.value);
                }}>
                    <option value="">Wybierz markę</option>
                    <option value="audi">Audi</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="volkswagen">Volkswagen</option>
                    <option value="bmw">BMW</option>
                    <option value="fiat">Fiat</option>
                    <option value="opel">Opel</option>
                    <option value="renault">Renault</option>
                    <option value="hyundai">Hyundai</option>
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
                    <option value="dostawcze">Dostawcze</option>                   
                </Form.Select>
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
                        <option value="brązowy">Brązowy</option>
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
        { user.userType === 'employee' &&<Button onClick={addCar} style={{marginTop: "20px"}} size="lg" variant="dark" type="submit">Dodaj Samochód</Button> }
        <Row>
        {
                
            filtredCars().map(
                car => 
                    <Card key = {car.id} border="secondary" className='card'>
                        <Card.Header><h3>{ car.mark } { car.model }</h3></Card.Header>
                        <Card.Img variant="top" src={car.img} height="200px"/>
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
                                            <td>Rezerwacja</td>
                                            <td>{car.reservation}</td>
                                        </tr>
                                        <tr>
                                            <td>Rodzaj</td>
                                            <td>{car.type}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <Button onClick = { () => openBooklet(car.serviceBooklet.id)} 
                                                    size="md" 
                                                    variant="primary" 
                                                    type="submit">
                                                    Książka serwisowa
                                                </Button> 
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                { user.userType === 'client' && car.reservation === 'Nie' && car.available === 'Tak' && <Button onClick = { () => reserveCar(car.id) } 
                                    size="md" 
                                    variant="secondary" 
                                    type="submit">
                                    Rezerwuj
                                </Button> }
                                { user.userType === 'client' && (car.reservation === 'Tak' || car.available === 'Nie') && <Button onClick = { () => messageCar(car.id) } 
                                    size="md" 
                                    variant="secondary" 
                                    type="submit">
                                    Wyślij powiadomienie o dostępności
                                </Button> }
                                { user.userType === 'employee' && <Button onClick = { () => editCar(car.id)} 
                                    size="md" 
                                    variant="secondary" 
                                    type="submit">
                                    Modyfikuj
                                </Button> }
                                { user.userType === 'employee' && <Button onClick = { () => deleteCar(car.id)} 
                                    style={{marginLeft: "10px"}} 
                                    size="md" 
                                    variant="danger" 
                                    type="submit">
                                    Usuń
                                </Button> }
                            </Card.Body>
                        </Card>        
                    )
                }
                </Row>
        </div>
    )
}