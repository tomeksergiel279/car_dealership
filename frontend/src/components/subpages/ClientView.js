import React, { Component } from 'react'
import ClientService from '../services/ClientService'
import { Button, Card, Table } from 'react-bootstrap'
import '../styles/Form.css';

class ClientView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            client: {}
        }
    }

    componentDidMount(){
        ClientService.GetClientById(this.state.id).then( res => {
            this.setState({client: res.data});
        })
    }

    cancel(){
        this.props.history.push('/clients');
    }

    render() {
        return (
            <div><br /><br />
            <Card border="secondary" className='cards'>
                <Card.Header><h3>{ this.state.client.firstName } { this.state.client.lastName } </h3></Card.Header>
                <Card.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{ this.state.client.email }</td>
                            </tr>
                            <tr>
                                <td>Login</td>
                                <td>{ this.state.client.login }</td>
                            </tr>
                            <tr>
                                <td>Hasło</td>
                                <td>{ this.state.client.password }</td>
                            </tr>
                            <tr>
                                <td>Kod pocztowy</td>
                                <td>{ this.state.client.postalCode }</td>
                            </tr>
                            <tr>
                                <td>Adres</td>
                                <td>{ this.state.client.address }</td>
                            </tr>
                            <tr>
                                <td>Numer telefonu</td>
                                <td>{ this.state.client.phoneNumber }</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Powrót</Button>
                </Card.Body>
            </Card>
            </div>
        )
    }
}

export default ClientView