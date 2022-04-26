import React, { useEffect, useState } from 'react'
import BookletService from '../services/BookletService';
import { Button, Card, Table } from 'react-bootstrap';
import emailjs from "emailjs-com";
import '../styles/FormStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

export const Booklet = (props) => {

    const id = props.match.params.id;
    const [user, setUser] = useState([]);
    const [booklet, setBooklet] = useState([]);

    useEffect(() => {
        BookletService.getBookletById(id).then((res) => {
            setBooklet(res.data);
            setUser(JSON.parse(localStorage.getItem('user')));
        });
    },[])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm('service_gmail', 'booklet', e.target, 'DtN43ylzFlL8ZsKlo')  
        .then((result) => {
            console.log(result.text);
            if(result.status === 200){
                toast.success('Wiadomość wysłana')
            }
            else{
                toast.danger('Wiadomość nie wysłana')
            }
        }, (error) => {
            console.log(error.text);
            toast.danger('Wiadomość nie wysłana')
        });
        e.target.reset()
    }


    const editBooklet = (id) => {
        window.location.replace(`http://localhost:3000/update-booklet/${id}`);
    }

    const cancel = () => {
        window.location.replace(`http://localhost:3000/cars`);
    }

        return (
            <div><br /><br />
                <Card border="secondary" className='cards'>
                    <Card.Header><h3>Książka serwisowa</h3></Card.Header>
                    <Card.Body>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Data przeglądu</td>
                                    <td>{ booklet.serviceInspection }</td>
                                </tr>
                                <tr>
                                    <td>Naprawy</td>
                                    <td>{ booklet.repair }</td>
                                </tr>
                                <tr>
                                    <td>Data naprawy</td>
                                    <td>{ booklet.repairDate }</td>
                                </tr>
                                <tr>
                                    <td>Producent części</td>
                                    <td>{ booklet.repairProducent }</td>
                                </tr>
                            </tbody> 
                        </Table>
                        { user.userType === 'employee' && <Button onClick = { () => editBooklet(booklet.id)} 
                            size="md" 
                            variant="secondary" 
                            type="submit">
                            Modyfikuj
                        </Button> }
                        <Button style={{marginLeft: "10px"}} 
                            size="md" 
                            variant="danger" 
                            type="submit" 
                            onClick={cancel}>
                            Powrót
                        </Button><br /><br />
                        { user.userType === 'employee' && <form onSubmit={sendEmail} className='contact_form w-100'>
                            <div className = "form-group">
                                <label> Imię </label>
                                <input name="client" className="form-control" />
                            </div>       
                            <div className = "form-group">
                                <label> Samochód </label>
                                <input name="car" className="form-control" />
                            </div>   
                            <div className = "form-group">
                                <label> Data przeglądu </label>
                                <input name="date" className="form-control" />
                            </div>  
                            <div className = "form-group">
                                <label> Email </label>
                                <input name="email" className="form-control" /><br />
                            </div>
                            <Button size="md" 
                                variant="primary" 
                                type="submit">
                                Wyślij powiadomienie o badaniu
                            </Button> 
                        </form> }
                    </Card.Body>
                </Card>
            </div>
        )
    
}