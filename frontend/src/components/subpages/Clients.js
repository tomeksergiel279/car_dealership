import React, { Component } from 'react';
import ClientService from '../services/ClientService';
import { Button } from 'react-bootstrap';

class Clients extends Component {
    constructor(props) {
        super(props)

        this.state = {
                clients: []
        }
        this.addClient = this.addClient.bind(this);
    }

    componentDidMount(){
        ClientService.getClients().then((res) => {
            this.setState({ clients: res.data});
        });
    }

    addClient(){
        this.props.history.push('/add-client');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Lista Klientów</h2>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Imię </th>
                                <th> Nazwisko </th>
                                <th> Email </th>
                                <th> Login </th>
                                <th> Hasło </th>
                                <th> Kod pocztowy </th>
                                <th> Address </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(
                                    client => 
                                    <tr key = {client.id}>
                                         <td> {client.firstName} </td>   
                                         <td> {client.lastName} </td>
                                         <td> {client.email} </td>
                                         <td> {client.login} </td>   
                                         <td> {client.password} </td>
                                         <td> {client.postalCode} </td>
                                         <td> {client.address} </td>
                                         <td>
                                            <Button size="sm" variant="secondary" type="submit">Modyfikuj</Button> 
                                            <Button style={{marginLeft: "10px"}} size="sm" variant="danger" type="submit">Usuń</Button> 
                                         </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <Button onClick={this.addClient} size="lg" variant="dark" type="submit">Dodaj Klienta</Button> 
                                        
            </div>
        )
    }
}

export default Clients;