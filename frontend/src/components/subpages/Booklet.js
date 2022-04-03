import React, { Component } from 'react'
import BookletService from '../services/BookletService';
import { Button, Card, Table } from 'react-bootstrap';
import emailjs from "emailjs-com";
import '../Form.css';

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

    emailjs.sendForm('service_gmail', 'email_rental', e.target, 'DtN43ylzFlL8ZsKlo')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
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
                    <form onSubmit={this.sendEmail}>
                        <label>Dane klienta:</label><br/>
                        <input name="client" /><br />
                        <label>Data:</label><br/>
                        <input name="date" /><br />
                        <label>Nazwa pojazdu:</label><br/>
                        <input name="car" /><br />
                        <label>Email:</label><br/>
                        <input name="email" /><br /><br />
                        <Button size="md" variant="primary" type="submit">Wyslij przypomnienie o badaniu technicznym</Button>
                    </form>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default Booklet