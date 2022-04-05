import React, { Component } from 'react'
import BookletService from '../services/BookletService';
import { Button, Card, Table } from 'react-bootstrap';
import emailjs from "emailjs-com";
import '../styles/FormStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


toast.configure()

class Booklet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            booklet: {}
        }

        this.editBooklet = this.editBooklet.bind(this);
    }

    sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_gmail', 'booklet', e.target, 'DtN43ylzFlL8ZsKlo')
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

    componentDidMount(){
        BookletService.getBookletById(this.state.id).then( res => {
            this.setState({booklet: res.data});
        })
    }

    editBooklet(id){
        this.props.history.push(`/update-booklet/${id}`);
    }

    cancel(){
        this.props.history.push('/cars');
    }

    render() {
        return (
            <div><br /><br />
            <Card border="secondary" className='cards'>
                <Card.Header><h3>Książka serwisowa</h3></Card.Header>
                <Card.Body>
                    <Table>
                    <tbody>
                            <tr>
                                <td>Data przeglądu</td>
                                <td>{ this.state.booklet.serviceInspection }</td>
                            </tr>
                            <tr>
                                <td>Ostatnia naprawa</td>
                                <td>{ this.state.booklet.lastRepair }</td>
                            </tr>
                    
                        </tbody> 
                    </Table>
                    <Button onClick = { () => this.editBooklet(this.state.booklet.id)} size="md" variant="secondary" type="submit">Modyfikuj</Button>
                    <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Powrót</Button><br /><br />
                    <form onSubmit={this.sendEmail} className='contact_form w-100'>
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
                        <Button size="md" variant="primary" type="submit">Wyślij powiadomienie o badaniu</Button> 
                    </form>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Booklet